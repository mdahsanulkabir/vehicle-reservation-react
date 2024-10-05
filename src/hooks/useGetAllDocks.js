// this file will provide array of all docks

import { useEffect, useState } from "react";
import useAxiosIntercept from "./useAxiosIntercept";


export const useGetAllDocks = () => {
    const axiosPrivate = useAxiosIntercept();
    const [allDocks, setAllDocks] = useState([])
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axiosPrivate.get(`${import.meta.env.VITE_BACKEND_SERVER}/dock`,
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true
                    }
                );
                setAllDocks(response.data)
            } catch (error) {
                console.log("Error on getting all docks data array", error)
            }
        }
        loadData();
    }, [axiosPrivate])

    return allDocks;
};

