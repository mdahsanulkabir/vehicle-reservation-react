import { useEffect, useState } from "react";
import useAxiosIntercept from "./useAxiosIntercept";


export const useGetStationsOfMaterials = () => {
    const axiosPrivate = useAxiosIntercept();
    const [stationsOfMaterials, setStationsOfMaterials] = useState([])
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axiosPrivate.get(`${import.meta.env.VITE_BACKEND_SERVER}/materialStation`,
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true
                    }
                );
                const data = await response.data;
                setStationsOfMaterials(data)
            } catch (error) {
                console.log("Error on getting all docks data array", error)
            }
        }
        loadData();
    }, [axiosPrivate])

    return stationsOfMaterials;
};
