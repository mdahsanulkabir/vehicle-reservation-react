/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import useAxiosIntercept from '../../hooks/useAxiosIntercept';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';


// {
//     "containerSize": 40,  resticted within [8, 12, 20, 23, 30, 40]
//     "stationForMaterial": "66fd246c704eb147562c84e7",
//     "loadedWithPallete": false,
//     "requiredTime" : 150
// }


const DurationEditDialogue = ({ mode = 'Edit', durations, editDialogueOpen, setEditDialogueOpen, editDuration, setDurations }) => {
    const axiosPrivate = useAxiosIntercept();
    const [materialsAsStations, setMaterialsAsStations] = useState([])

    const [stationForMaterial, setStationForMaterial] = useState("") // need to initiate with real stationformaterial
    const [containerSize, setContainerSize] = useState(40)
    const [loadedWithPallete, setLoadedWithPallete] = useState(false)
    const [requiredTime, setRequiredTime] = useState(0)

    const [ editedDuration, setEditedDuration ] = useState ({})

    useEffect(() => {
        if (editDuration) {
            setStationForMaterial(editDuration.stationForMaterial?._id || "");
            setContainerSize(editDuration.containerSize || 40);
            setLoadedWithPallete(editDuration.loadedWithPallete || false);
            setRequiredTime(editDuration.requiredTime || 0);
        }
    }, [editDuration]);

    useEffect(() => {
        const loadMaterialTypes = async () => {

            try {
                const response = await axiosPrivate.get(`${import.meta.env.VITE_BACKEND_SERVER}/materialStation`,
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true
                    }
                )
                const data = await response.data;
                setMaterialsAsStations(data)
            } catch (error) {
                console.log("loadmaterials error: ", error)
            }
        }

        loadMaterialTypes();
    }, [axiosPrivate])

    


    useEffect( () => {
        const controller = new AbortController();
        if (editedDuration.requiredTime !== 0){
            console.log("to be edited duration:", editedDuration)
            const editInDB = async () => {
                try {
                    const response = await axiosPrivate.patch(`${import.meta.env.VITE_BACKEND_SERVER}/editLoadUnloadTime?id=${editDuration._id}`,
                        JSON.stringify(editedDuration),
                        {
                            headers: { "Content-Type": "application/json" },
                            withCredentials: true
                        }
                    )
                    const updatedDuration = await response.data;
                    console.log("updated duration from DB:", updatedDuration)
                    const existingDurations = durations?.filter(duration => duration._id !== editDuration._id)
                    setDurations([...existingDurations, updatedDuration])
                    requiredTime(0)
                } catch (error) {
                    console.log("loadmaterials error: ", error)
                }
            }
            editInDB()
        }
        return () => {
            controller.abort(); // Cancel the API call
        };
    },[axiosPrivate, editedDuration])

    const processData = async () => {
        setEditedDuration({
            containerSize,
            stationForMaterial,
            loadedWithPallete,
            requiredTime
        })
        setEditDialogueOpen(false)
    }

const handleClose = () => {
    setEditDialogueOpen(false)
}


return (
    <Dialog onClose={handleClose} open={editDialogueOpen} sx={{ padding: '24px' }}>
        <DialogTitle className='testing'
            sx={{ padding: '12px 66px', color: '#d3e2f1', backgroundColor: '#1976d2' }}
        >{`${mode} Duration`}</DialogTitle>

        <div className='p-8'>
            <div className='flex flex-col'>
                <FormControl >
                    <InputLabel id="select-material-label">Select Material</InputLabel>
                    <Select
                        labelId="select-material-label"
                        label='Select Material'
                        id="select-material"
                        value={stationForMaterial}
                        onChange={e => setStationForMaterial(e.target.value)}
                        size='small'
                    >
                        <MenuItem key={"defaultBlank"} value={""}></MenuItem>
                        {
                            materialsAsStations?.map(item => {
                                const materialDisplayName = item.materialType
                                return <MenuItem key={item._id} value={item._id}>{materialDisplayName}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <br />
                <FormControl >
                    <InputLabel id="select-container-size-label">Select Container Size</InputLabel>
                    <Select
                        labelId="select-container-size-station-label"
                        label='Select Container Size'
                        id="select-container-size"
                        value={containerSize}
                        onChange={e => setContainerSize(e.target.value)}
                        size='small'
                    >
                        {
                            [8, 12, 20, 23, 30, 40].map((item, index) => {
                                return <MenuItem key={index} value={item}>{item}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <br />
                <FormControl >
                    <InputLabel id="select-loaded-pallete-label">Loaded with pallete</InputLabel>
                    <Select
                        labelId="select-loaded-pallete-label"
                        label='Loaded with pallete'
                        id="select-loaded-pallete"
                        value={loadedWithPallete}
                        onChange={e => setLoadedWithPallete(e.target.value)}
                        size='small'
                    >

                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>

                    </Select>
                </FormControl>
                <br />
                <TextField
                    label="Required Time (minute)"
                    variant="outlined"
                    type="number"
                    size="small"
                    value={requiredTime}
                    onChange={e => setRequiredTime(parseInt(e.target.value))}
                />
            </div>
            <div className='flex justify-evenly pt-8'>
                <Button variant="contained" onClick={() => handleClose()}>Cancel</Button>
                <Button variant="contained" onClick={() => processData()}>Edit</Button>
            </div>
        </div>
    </Dialog>
);
};

export default DurationEditDialogue;