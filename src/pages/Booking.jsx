/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Timeline } from "../components/booking/Timeline";
import { useGetAllDocks } from "../hooks/useGetAllDocks";
import { getReservationsForLocalDate } from "../components/booking/getExistingReservationsOfSelectedDate";
import SelectDate from "../components/booking/SelectDate";
import ReservationForm from "../components/booking/ReservationForm";
import { useGetAllBooking } from "../hooks/useGetAllBooking";
import Summary from "../components/booking/Summary";
import BookingConfirmation from "../components/booking/BookingConfirmation";

const Booking = () => {

    const allDocks = useGetAllDocks();
    const [bookingDate, setBookingDate] = useState('')
    const [bookingTime, setBookingTime] = useState('')
    const allBookingCreatedEver = useGetAllBooking(bookingDate, bookingTime);
    const [allReservationsOfTheSelectedDate, setAllReservationsOfTheSelectedDate] = useState([])
    const [showNoAvailableDock, setShowNoAvailableDock] = useState(false)
    const [material, setMaterial] = useState('')
    const [containerSize, setContainerSize] = useState(40)
    const [loadedWithPallete, setLoadedWithPallete] = useState(false)
    const [showBookingForm, setShowBookingForm] = useState(false)
    const [summary, setSummary] = useState(false)
    const [newReserv, setNewReserv] = useState({})
    const [bookingConfirmed, setBookingConfirmed] = useState(false)
    const [goForBooking, setGoForBooking] = useState(false)
    

    useEffect(() => {
        setAllReservationsOfTheSelectedDate(getReservationsForLocalDate(allBookingCreatedEver, bookingDate))
    }, [allBookingCreatedEver, bookingDate, bookingTime])

    

    return (
        <>
            <SelectDate
                bookingDate={bookingDate}
                setBookingDate={setBookingDate}
                bookingTime={bookingTime}
                setBookingTime={setBookingTime}
                setShowNoAvailableDock={setShowNoAvailableDock}
                setShowBookingForm={setShowBookingForm}
                setSummary={setSummary}
                goForBooking={goForBooking}
                setGoForBooking={setGoForBooking}
            />
            {
                showBookingForm &&
                <ReservationForm
                    bookingDate={bookingDate}
                    bookingTime={bookingTime}
                    material={material}
                    setMaterial={setMaterial}
                    containerSize={containerSize}
                    setContainerSize={setContainerSize}
                    loadedWithPallete={loadedWithPallete}
                    setLoadedWithPallete={setLoadedWithPallete}
                    setShowBookingForm={setShowBookingForm}
                    summary={summary}
                    setSummary={setSummary}
                    setShowNoAvailableDock={setShowNoAvailableDock}
                    allReservationsOfTheSelectedDate={allReservationsOfTheSelectedDate}
                    allDocks={allDocks}
                    setNewReserv={setNewReserv}
                />
            }
            {
                summary && <Summary
                    allReservationsOfTheSelectedDate={allReservationsOfTheSelectedDate}
                    setAllReservationsOfTheSelectedDate={setAllReservationsOfTheSelectedDate}
                    newReserv={newReserv}
                    bookingDate={bookingDate}
                    bookingTime={bookingTime}
                    material={material}
                    containerSize={containerSize}
                    loadedWithPallete={loadedWithPallete}
                    showNoAvailableDock={showNoAvailableDock}
                    setSummary={setSummary}
                    setShowBookingForm={setShowBookingForm}
                    setBookingConfirmed={setBookingConfirmed}
                />
            }
            {
                bookingConfirmed && <BookingConfirmation
                    setBookingConfirmed={setBookingConfirmed}
                    setGoForBooking={setGoForBooking}
                    setSummary={setSummary}
                />
            }
            {
                bookingDate && <Timeline allReservationsOfTheSelectedDate={allReservationsOfTheSelectedDate} docks={allDocks} bookingDate={bookingDate} />
            }
        </>
    );
};

export default Booking;