import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from 'react'; 
import Grid from '@mui/material/Grid2';
import useAxiosIntercept from "../hooks/useAxiosIntercept";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateEditMaterialDialogue from "../components/stationAndMaterials/CreateEditMaterialDialogue";
import Loading from "../components/Loading";

const CreateMaterial = () => {
    const axiosPrivate = useAxiosIntercept();
    const [ materialTypes, setMaterialTypes ] = useState([])
    const [ dialogueOpen, setDialogueOpen ] = useState(false)
    const [ newMaterialStation, setNewMaterialStation ] = useState({})
    const [ loading, setLoading ] = useState(true)


    useEffect (() => {
        const loadMaterialTypes = async () => {

            try {
                const response = await axiosPrivate.get(`${import.meta.env.VITE_BACKEND_SERVER}/materialStation`,
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true
                    }
                )
                const materialAsStations = await response.data;
                console.log("material as stations :", materialAsStations)
                setMaterialTypes(materialAsStations)
                setLoading(false)
            } catch (error) {
                console.log("loadmaterials error: ", error)
            }

        }

        loadMaterialTypes();
    }, [axiosPrivate])

    const handleOpenCreateEditMaterialDialogue = () => {
        setDialogueOpen(true)
    }


    return (
        <div id="create-material" className="flex flex-col max-h-full">
            <div className="flex justify-between">
                <p>List of Materials</p>
                <Button variant="contained" onClick={() => handleOpenCreateEditMaterialDialogue()}>Create Material</Button>
            </div>

            {
                !loading ? (
                    <>
                    {/* material table - column: Sl, material type, station type, action*/}
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid size={2} sx={{textAlign: 'center'}}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold'}}>SL</Typography>
                        </Grid>
                        <Grid size={3} sx={{textAlign: 'center'}}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold'}}>ID</Typography>
                        </Grid>
                        <Grid size={3} sx={{textAlign: 'center'}}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold'}}>Material Type</Typography>
                        </Grid>
                        <Grid size={2} sx={{textAlign: 'center'}}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold'}}>Station Type</Typography>
                        </Grid>
                        <Grid size={2} sx={{textAlign: 'center'}}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold'}}>Action</Typography>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='flex-1 overflow-y-auto'>    
                        {
                            materialTypes?.map((item, id) =>
                                <React.Fragment key={item._id}>
                                    <Grid size={2} sx={{textAlign: 'center'}}>
                                        <p>{id+1}</p>
                                    </Grid>
                                    <Grid size={3}>
                                        <p>{item._id}</p>
                                    </Grid>
                                    <Grid size={3}>
                                        <p>{item.materialType}</p>
                                    </Grid>
                                    <Grid size={2} sx={{textAlign: 'center'}}>
                                        <p>{item.stationType}</p>
                                    </Grid>
                                    <Grid size={2} sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                                        <EditIcon />
                                        <DeleteIcon />
                                    </Grid>
                                </React.Fragment>
                            )
                        }
                    </Grid>
                    <CreateEditMaterialDialogue 
                        setDialogueOpen={setDialogueOpen}
                        dialogueOpen={dialogueOpen}
                        newMaterialStation={newMaterialStation}
                        setNewMaterialStation={setNewMaterialStation}
                        setMaterialTypes={setMaterialTypes}
                    />
                    </>
                ) : <Loading loadingText={'Loading existing material and station list...'}/>
            }

        </div>
    );
};

export default CreateMaterial;