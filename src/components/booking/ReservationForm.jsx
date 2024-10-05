/* eslint-disable react/prop-types */
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from "@mui/material";


const ReservationForm = ({ showSelectedDateTime, material, setMaterial, containerSize, setContainerSize, loadedWithPallete, setLoadedWithPallete }) => {

    const handleMaterialChange = (e) => {
        setMaterial(e.target.value);
    };

    const handleContainerSizeChange = (e) => {
        setContainerSize(e.target.value);
    };

    const handleLoadedWithPalleteChange = (e) => {
        setLoadedWithPallete(e.target.checked);
    };
    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="select-material-label">Select material type</InputLabel>
                <Select
                    labelId="select-material-label"
                    id="select-material"
                    value={material}
                    label="Material"
                    onChange={e => handleMaterialChange(e)}
                >
                    <MenuItem value={"66fd242f704eb147562c84e2"}>Metal Sheet</MenuItem>
                    <MenuItem value={"66fd2461704eb147562c84e5"}>Ref Parts</MenuItem>
                    <MenuItem value={"66fd26e5cfb1ce3bb614391c"}>TV parts</MenuItem>
                    <MenuItem value={"66fd2744cfb1ce3bb6143926"}>Body Stand</MenuItem>
                </Select>
            </FormControl>
            <br />
            <br />
            <FormControl fullWidth>
                <InputLabel id="select-containerSize-label">Select Container Size</InputLabel>
                <Select
                    labelId="select-containerSize-label"
                    id="select-containerSize"
                    value={containerSize}
                    label="Container Size"
                    onChange={e => handleContainerSizeChange(e)}
                >
                    <MenuItem value={40}>40 ft</MenuItem>
                    <MenuItem value={23}>23 ft</MenuItem>
                    <MenuItem value={20}>20 ft</MenuItem>
                    <MenuItem value={12}>12 ft</MenuItem>
                    <MenuItem value={8}>8 ft</MenuItem>
                </Select>
            </FormControl>
            <br />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={loadedWithPallete}
                        onChange={handleLoadedWithPalleteChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                }
                label="Loaded wtih pallete"
            />
            <br />
            {
                showSelectedDateTime && (
                    <>
                        <h1>You are booking on <span className="font-bold">{showSelectedDateTime.toString()}</span></h1>
                        <p className="font-bold">For the below object</p>
                        <p>Material : <span>{material}</span></p>
                        <p>Container Size : <span>{`${containerSize} ft`}</span></p>
                        <p>Loaded with pallete : <span>{loadedWithPallete ? 'Yes' : 'No'}</span></p>
                        <p>Expected time to unload : <span>{loadedWithPallete ? 'Yes' : 'Undefined'}</span></p>
                        <p className="font-bold">With below identification</p>
                        <p>Booker Name : <span>Your name</span></p>
                        <p>Driver Name : <span>Driver name</span></p>
                        <p>Driver Contact Number : <span>01234 567 890</span></p>
                        <p>Vehicle Registration Number : <span>xx-xxxx</span></p>
                    </>

                )
            }
        </>
    );
};

export default ReservationForm;