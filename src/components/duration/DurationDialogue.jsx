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


const DurationDialogue = ({ mode = 'Create', dialogueOpen, setDialogueOpen, newDuration, setNewDuration, setDurations }) => {
    const axiosPrivate = useAxiosIntercept();

    const [materialsAsStations, setMaterialsAsStations] = useState([])



    const [stationForMaterial, setStationForMaterial] = useState("") // need to initiate with real stationformaterial
    const [containerSize, setContainerSize] = useState(40)
    const [loadedWithPallete, setLoadedWithPallete] = useState(false)
    const [requiredTime, setRequiredTime] = useState(0)



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
                console.log("material as stations :", data)
                setMaterialsAsStations(data)
            } catch (error) {
                console.log("loadmaterials error: ", error)
            }
        }

        loadMaterialTypes();
    }, [axiosPrivate])

    useEffect(() => {
        const controller = new AbortController();
        if (requiredTime !== 0) {
            const saveNewMaterialStation = async () => {
                console.log("new duration: in useEffect", newDuration)
                try {
                    const response = await axiosPrivate.post(`${import.meta.env.VITE_BACKEND_SERVER}/loadUnloadTime`,
                        JSON.stringify(newDuration),
                        {
                            headers: { "Content-Type": "application/json" },
                            withCredentials: true
                        }
                    )
                    const savedDuration = await response.data;
                    console.log("saved duration from DB:", savedDuration)
                    setDurations(prev => {
                        return [...prev, {
                            ...savedDuration
                        }]
                    })
                    requiredTime(0)
                } catch (error) {
                    console.log("loadmaterials error: ", error)
                }
            }
            saveNewMaterialStation()
        }
        return () => {
            controller.abort(); // Cancel the API call
        };
    }, [axiosPrivate, newDuration, requiredTime, setDurations])

    const handleClose = () => {
        setDialogueOpen(false)
    }

    const processData = async () => {
        setNewDuration({
            containerSize,
            stationForMaterial,
            loadedWithPallete,
            requiredTime
        })
        setDialogueOpen(false)
    }

    return (
        <Dialog onClose={handleClose} open={dialogueOpen} sx={{ padding: '24px' }}>
            <DialogTitle className='testing'
                sx={{ padding: '12px 66px', color: '#d3e2f1', backgroundColor: '#1976d2' }}
            >{`${mode} Duration`}</DialogTitle>

            <div className='p-8'>
                <div className='flex flex-col'>
                    <FormControl >
                        <InputLabel id="select-material-label">Select Material</InputLabel>
                        <Select
                            labelId="select-material-label"
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
                <div className='flex justify-center pt-8'>
                    <Button variant="contained" onClick={() => processData()}>Save</Button>
                </div>
            </div>
        </Dialog>
    );
};

export default DurationDialogue;