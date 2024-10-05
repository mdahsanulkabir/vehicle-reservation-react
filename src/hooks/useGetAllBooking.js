// this hook is used to get all the booking ever created

import { useEffect, useState } from "react";
import useAxiosIntercept from "./useAxiosIntercept";



export const useGetAllBooking = () => {
    const axiosPrivate = useAxiosIntercept();
    const [allBookingCreatedEver, setAllBookingCreatedEver] = useState([])
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axiosPrivate.get(`${import.meta.env.VITE_BACKEND_SERVER}/booking`,
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true
                    }
                );

                setAllBookingCreatedEver(response.data)
                // console.log({
                //     dbData: response.data.map(item => ({
                //         ...item,
                //         bookingDate: new Date(item.bookingDate).toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),
                //         startTime: new Date(item.startTime).toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),
                //         endTime: new Date(item.endTime).toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })
                //     }))
                // })
            } catch (error) {
                console.error('Error getting all booking created ever.:', error);
            }
        }
        loadData();
    }, [axiosPrivate])
    return allBookingCreatedEver;
};