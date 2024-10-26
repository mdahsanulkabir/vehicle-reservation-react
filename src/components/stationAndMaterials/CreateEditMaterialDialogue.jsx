/* eslint-disable react/prop-types */
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Autocomplete, Button, FormControl, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import useAxiosIntercept from '../../hooks/useAxiosIntercept';


const CreateEditMaterialDialogue = ({ mode = 'Create', setDialogueOpen, dialogueOpen, newMaterialStation, setNewMaterialStation, setMaterialTypes }) => {
    const [matType, setMatType] = useState('')
    const [stationName, setStationName] = useState('')
    const axiosPrivate = useAxiosIntercept();

    const stationOptions = ["A", "B", "C", "D", "E", "F"];

    useEffect(() => {
        const controller = new AbortController(); // Used for cancelling the request
        if (stationName != '') {
            const saveNewMaterialStation = async () => {
                console.log("new material station: in useEffect", newMaterialStation)
                try {
                    const response = await axiosPrivate.post(`${import.meta.env.VITE_BACKEND_SERVER}/materialStation`,
                        JSON.stringify(newMaterialStation),
                        {
                            headers: { "Content-Type": "application/json" },
                            withCredentials: true
                        }
                    )
                    const savedMaterialStation = await response.data;
                    console.log("saved material as stations from DB:", savedMaterialStation)
                    setMaterialTypes(prev => {
                        return [...prev, {
                            ...savedMaterialStation
                        }]
                    })
                    setStationName('')
                } catch (error) {
                    console.log("loadmaterials error: ", error)
                }
            }
            saveNewMaterialStation()
        }
        return () => {
            controller.abort(); // Cancel the API call
        };
    }, [axiosPrivate, newMaterialStation])

    const handleClose = () => {
        setDialogueOpen(false)
    }

    const processData = async () => {
        setNewMaterialStation({
            materialType: matType,
            stationType: stationName
        })
        setDialogueOpen(false)
    }

    return (
        <Dialog onClose={handleClose} open={dialogueOpen} sx={{ padding: '24px' }}>
            <DialogTitle className='testing'
                sx={{ padding: '12px 66px', color: '#d3e2f1', backgroundColor: '#1976d2' }}
            >{`${mode} Material With Station`}</DialogTitle>

            <div className='p-8'>
                <div className='flex flex-col'>
                    <TextField
                        label="Material Type"
                        variant="outlined"
                        type="text"
                        size="small"
                        value={matType}
                        onChange={e => setMatType(e.target.value)}
                    />
                    <br />
                    <FormControl >
                    <Autocomplete
                        options={stationOptions}
                        value={stationName}
                        onChange={(event, newValue) => setStationName(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Station" variant="outlined" size="small" />
                        )}
                    />
                    </FormControl>
                </div>
                <div className='flex justify-center pt-8'>
                    <Button variant="contained" onClick={() => processData()}>Save</Button>
                </div>
            </div>

        </Dialog>
    )
}

export default CreateEditMaterialDialogue;