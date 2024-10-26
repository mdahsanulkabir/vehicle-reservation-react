/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import useAxiosIntercept from '../../hooks/useAxiosIntercept';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Autocomplete } from '@mui/material';


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
    }, [axiosPrivate, newDuration])

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
            <DialogTitle className='testing text-center'
                sx={{ padding: '12px 66px', color: '#d3e2f1', backgroundColor: '#1976d2' }}
            >{`${mode} Duration`}</DialogTitle>

            <div className='p-8'>
                <div className='flex flex-col'>
                    <FormControl >
                        <Autocomplete
                            disablePortal={false}
                            options={materialsAsStations}
                            sx={{ width: 300 }}
                            getOptionLabel={(option) => option.materialType || ''}
                            value={materialsAsStations.find(item => item._id === stationForMaterial) || null}
                            onChange={(event, newValue) => setStationForMaterial(newValue ? newValue._id : '')}
                            renderInput={(params) => (
                                <TextField {...params} label="Select Material" size="small" className='text-[10px]' />
                            )}
                            renderOption={(props, option) => (
                                <li {...props} key={option._id} className='hover:bg-sky-500 my-1 px-4'>
                                    {option.materialType}
                                </li>
                            )}
                        />
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
                <div className='flex justify-center pt-8'>
                    <Button variant="contained" onClick={() => processData()}>Save</Button>
                </div>
            </div>
        </Dialog>
    );
};

export default DurationDialogue;