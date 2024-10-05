

export const getSingleLoadUnloadTime = async (stationForMaterial, containerSize, loadedWithPallete, axiosPrivate) => {

    console.log({
        stationForMaterial,   // it is an id   of the collection where -> REF Parts	A	66fd2461704eb147562c84e5
        containerSize, // 40
        loadedWithPallete  // true
    })

    try {
        const response = await axiosPrivate.get(`${import.meta.env.VITE_BACKEND_SERVER}/getSingleLoadUnloadTime`, {
            params: {
                stationForMaterial,
                containerSize,
                loadedWithPallete
            },
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });


        const singleLoadUnloadTime = await response.data

        console.log("singleLoadunload serer response", singleLoadUnloadTime)
        return singleLoadUnloadTime;
    } catch (error) {
        console.log("error on getting single load unload time, ", error)
        return null;
    }

};