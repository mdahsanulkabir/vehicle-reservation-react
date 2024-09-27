const docks = [
    {
      id: 1,
      name: "Dock A",
      reservations: [
        { start: "2024-09-27T09:00", end: "2024-09-27T10:00" },
        { start: "2024-09-27T13:00", end: "2024-09-27T15:00" },
      ],
    },
    {
      id: 2,
      name: "Dock B",
      reservations: [
        { start: "2024-09-27T11:00", end: "2024-09-27T12:00" },
      ],
    },
    // Add more docks as needed
  ];
  

const Timeline = () => {
  const renderSlots = (reservations) => {
    const slots = [];
    const startOfDay = new Date('2024-09-27T00:00');
    const endOfDay = new Date('2024-09-27T23:59');
    
    // Create time slots for a full day
    for (let hour = startOfDay.getHours(); hour <= endOfDay.getHours(); hour++) {
      const timeSlot = new Date(startOfDay);
      timeSlot.setHours(hour);
      const isReserved = reservations.some(reservation => {
        const resStart = new Date(reservation.start);
        const resEnd = new Date(reservation.end);
        return timeSlot >= resStart && timeSlot < resEnd;
      });
      slots.push(
        <div 
          key={hour} 
          className={`time-slot ${isReserved ? 'reserved' : 'available'}`} 
          style={{ height: '60px' }}
        >
          {timeSlot.getHours()}:00
        </div>
      );
    }
    return slots;
  };

  return (
    <div className="timeline">
      {docks.map(dock => (
        <div key={dock.id} className="dock">
          <h3>{dock.name}</h3>
          <div className="dock-slots">
            {renderSlots(dock.reservations)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
