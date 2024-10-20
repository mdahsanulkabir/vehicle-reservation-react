import React, { useEffect, useState } from "react";
import useAxiosIntercept from "../hooks/useAxiosIntercept";
import { Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DurationDialogue from "../components/duration/DurationDialogue";
import Loading from "../components/Loading";
import DurationEditDialogue from "../components/duration/DurationEditDialogue";

const LoadingTime = () => {
    const axiosPrivate = useAxiosIntercept();
    const [durations, setDurations] = useState([])

    const [dialogueOpen, setDialogueOpen] = useState(false)
    const [newDuration, setNewDuration] = useState({})
    const [loading, setLoading] = useState(true)

    const [editDialogueOpen, setEditDialogueOpen] = useState(false)
    const [editDuration, setEditDuration] = useState({})


    useEffect(() => {
        const loadMaterialTypes = async () => {

            try {
                const response = await axiosPrivate.get(`${import.meta.env.VITE_BACKEND_SERVER}/loadUnloadTimes`,
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true
                    }
                )
                const durationsFromDB = await response.data;
                console.log("Drations from DB :", durationsFromDB)
                setDurations(durationsFromDB)
                setLoading(false)
            } catch (error) {
                console.log("Load Drations from DB error: ", error)
            }

        }

        loadMaterialTypes();
    }, [axiosPrivate])

    const handleOpenAssignDurationDialogue = () => {
        setDialogueOpen(true)
    }

    const handleDelete = async (id) => {

        try {
            const response = await axiosPrivate.delete(`${import.meta.env.VITE_BACKEND_SERVER}/deleteSingleLoadUnloadTime?id=${id}`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            )
            const deletedEntry = await response.data;
            console.log("Deleted duration :", deletedEntry)
            setDurations(prev => prev.filter(duration => duration._id !== id))
        } catch (error) {
            console.log("Load Drations delete error: ", error)
        }

    }

    const handleEditDuration = (id) => {
        const durationToBeEdited = durations.find(duration => duration._id === id)
        console.log({durationToBeEdited})
        setEditDuration(durationToBeEdited)
        setEditDialogueOpen(true)
    }

    return (
        <div id="create-loading-time" className="flex flex-col max-h-full">
            <div className="flex justify-end">
                <Button variant="contained" onClick={() => handleOpenAssignDurationDialogue()}>Assign New Duration</Button>
            </div>
            <div className="bg-black my-4">
                <Typography variant="h5" className="text-center my-4 text-white">List of Durations</Typography>
            </div>

            {
                !loading ? (
                    <>
                        {/* material table - column: Sl, material type, station type, loaded with pallete, required time, action*/}
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid size={1} sx={{ textAlign: 'center' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>SL</Typography>
                            </Grid>
                            <Grid size={3} sx={{ textAlign: 'center' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>ID</Typography>
                            </Grid>
                            <Grid size={3} sx={{ textAlign: 'center' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>Material Type</Typography>
                            </Grid>
                            <Grid size={1} sx={{ textAlign: 'center' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>Station Type</Typography>
                            </Grid>
                            <Grid size={1} sx={{ textAlign: 'center' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>{`Container Size (ft)`}</Typography>
                            </Grid>
                            <Grid size={1} sx={{ textAlign: 'center' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>With Pallete</Typography>
                            </Grid>
                            <Grid size={1} sx={{ textAlign: 'center' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>{`Duration (minute)`}</Typography>
                            </Grid>
                            <Grid size={1} sx={{ textAlign: 'center' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>Action</Typography>
                            </Grid>
                        </Grid>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='flex-1 overflow-y-auto'>
                            {
                                durations?.map((item, id) =>
                                    <React.Fragment key={item._id}>
                                        <Grid size={1} sx={{ textAlign: 'center' }}>
                                            <p>{id + 1}</p>
                                        </Grid>
                                        <Grid size={3} sx={{ textAlign: 'center' }}>
                                            <p>{item._id}</p>
                                        </Grid>
                                        <Grid size={3} sx={{ textAlign: 'center' }}>
                                            <p>{item.stationForMaterial.materialType}</p>
                                        </Grid>
                                        <Grid size={1} sx={{ textAlign: 'center' }}>
                                            <p>{item.stationForMaterial.stationType}</p>
                                        </Grid>
                                        <Grid size={1} sx={{ textAlign: 'center' }}>
                                            <p>{item.containerSize}</p>
                                        </Grid>
                                        <Grid size={1} sx={{ textAlign: 'center' }}>
                                            <p>{item.loadedWithPallete ? 'Yes' : 'No'
                                            }</p>
                                        </Grid>
                                        <Grid size={1} sx={{ textAlign: 'center' }}>
                                            <p>{item.requiredTime}</p>
                                        </Grid>
                                        <Grid size={1} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                            <EditIcon className="cursor-pointer" onClick={() => handleEditDuration(item._id)}/>
                                            <DeleteIcon className="cursor-pointer" onClick={() => handleDelete(item._id)} />
                                        </Grid>
                                    </React.Fragment>
                                )
                            }
                        </Grid>

                    </>
                ) : <Loading loadingText={'Loading existing duration list...'} />
            }


            <DurationDialogue
                setDialogueOpen={setDialogueOpen}
                dialogueOpen={dialogueOpen}
                newDuration={newDuration}
                setNewDuration={setNewDuration}
                setDurations={setDurations}
            />
            <DurationEditDialogue
                durations={durations}
                setEditDialogueOpen={setEditDialogueOpen}
                editDialogueOpen={editDialogueOpen}
                editDuration={editDuration}
                setDurations={setDurations}
            />
        </div>
    );
};

export default LoadingTime;