export const reservationData = [
    {
        id: 'sdfsssvsv',
        date: '2024-10-27T00:00',
        docks: [
            {
                id: 1,
                name: 'Dock 1',
                dockReservations: [
                    { id: 'ab', start: '2024-10-27T09:00', end: '2024-10-27T10:30' }, // 1.5 hours
                    { id: 'ak', start: '2024-10-27T12:00', end: '2024-10-27T14:30' }, // 2.5 hours
                    { id: 'a6', start: '2024-10-27T16:00', end: '2024-10-27T17:00' }  // 1 hour
                ]
            },
            {
                id: 2,
                name: 'Dock 2',
                dockReservations: [
                    { id: 'ba', start: '2024-10-27T08:00', end: '2024-10-27T09:30' }, // 1.5 hours
                    { id: 'b', start: '2024-10-27T11:00', end: '2024-10-27T13:30' }, // 2.5 hours
                    { id: 'bc', start: '2024-10-27T15:00', end: '2024-10-27T16:00' }  // 1 hour
                ]
            },
            {
                id: 3,
                name: 'Dock 3',
                dockReservations: [
                    { id: 'aasc', start: '2024-10-27T07:30', end: '2024-10-27T08:30' }, // 1 hour
                    { id: 'aghc', start: '2024-10-27T09:30', end: '2024-10-27T12:00' }, // 2.5 hours
                    { id: 'akjc', start: '2024-10-27T13:00', end: '2024-10-27T14:30' }  // 1.5 hours
                ]
            },
            {
                id: 4,
                name: 'Dock 4',
                dockReservations: [
                    { id: 'aertc', start: '2024-10-27T08:00', end: '2024-10-27T09:00' }, // 1 hour
                    { id: 'alklc', start: '2024-10-27T10:00', end: '2024-10-27T12:30' }, // 2.5 hours
                    { id: 'acbcbc', start: '2024-10-27T14:00', end: '2024-10-27T15:30' }  // 1.5 hours
                ]
            }
        ]
    },
    {
        id: 'sdfsssvsv',
        date: '2024-10-28T00:00',
        docks: [
            {
                id: 1,
                name: 'Dock 1',
                dockReservations: [
                    { id: 'ba', start: '2024-10-28T08:00', end: '2024-10-28T09:30' }, // 1.5 hours
                    { id: 'b', start: '2024-10-28T11:00', end: '2024-10-28T13:30' }, // 2.5 hours
                    { id: 'bc', start: '2024-10-28T15:00', end: '2024-10-28T16:00' }  // 1 hour
                ]
            },
            {
                id: 2,
                name: 'Dock 2',
                dockReservations: [
                    { id: 'ab', start: '2024-10-28T09:00', end: '2024-10-28T10:30' }, // 1.5 hours
                    { id: 'ak', start: '2024-10-28T12:00', end: '2024-10-28T14:30' }, // 2.5 hours
                    { id: 'a6', start: '2024-10-28T16:00', end: '2024-10-28T17:00' }  // 1 hour
                ]
            },
            {
                id: 3,
                name: 'Dock 3',
                dockReservations: [
                    { id: 'aertc', start: '2024-10-28T08:00', end: '2024-10-28T09:00' }, // 1 hour
                    { id: 'alklc', start: '2024-10-28T10:00', end: '2024-10-28T12:30' }, // 2.5 hours
                    { id: 'acbcbc', start: '2024-10-28T14:00', end: '2024-10-28T15:30' }  // 1.5 hours
                ]
            },
            {
                id: 4,
                name: 'Dock 4',
                dockReservations: [
                    { id: 'aasc', start: '2024-10-28T07:30', end: '2024-10-28T08:30' }, // 1 hour
                    { id: 'aghc', start: '2024-10-28T09:30', end: '2024-10-28T12:00' }, // 2.5 hours
                    { id: 'akjc', start: '2024-10-28T13:00', end: '2024-10-28T14:30' }  // 1.5 hours
                ]
            }
        ]
    },

]


export const reservationDBDATA = [
    {
        _id: "66fd2f0689742860523dc9b3",
        user: {
            _id: "66f4f50bb27149e918b9b91c",
            name: "Md. Ahsanul Kabir",
            userId: "92910583",
            email: "ahsanul.kabir@singerbd.com",
            roleId: "66f4ef9a9cb10111ad517507",
            createdAt: "2024-09-26T05:45:47.285Z",
            updatedAt: "2024-10-03T14:11:38.690Z",
            __v: 0
        },
        bookingDate: "2024-10-26T18:00:00.000Z",
        dockId: {
            _id: "66fcf7716a9d37df8dd63647",
            dockNumber: 1,
            stationType: "A",
            createdAt: "2024-10-02T07:34:09.869Z",
            updatedAt: "2024-10-02T07:34:09.869Z",
            __v: 0
        },
        loadUnloadTime: {
            _id: "66fd2691cfb1ce3bb6143916",
            containerSize: 40,
            stationForMaterial: {
                _id: "66fd2461704eb147562c84e5",
                materialType: "REF Parts",
                stationType: "A",
                createdAt: "2024-10-02T10:45:53.523Z",
                updatedAt: "2024-10-02T10:45:53.523Z",
                __v: 0
            },
            loadedWithPallete: false,
            requiredTime: 120,
            createdAt: "2024-10-02T10:55:13.486Z",
            updatedAt: "2024-10-02T10:55:13.486Z",
            __v: 0
        },
        startTime: "2024-10-27T02:00:00.000Z",
        endTime: "2024-10-27T04:00:00.000Z",
        status: "pending",
        createdAt: "2024-10-02T11:31:18.990Z",
        updatedAt: "2024-10-02T11:31:18.990Z",
        __v: 0
    },
    {
        _id: "66fd3d65b3ff4a5922a0956f",
        user: {
            _id: "66f4f50bb27149e918b9b91c",
            name: "Md. Ahsanul Kabir",
            userId: "92910583",
            email: "ahsanul.kabir@singerbd.com",
            roleId: "66f4ef9a9cb10111ad517507",
            createdAt: "2024-09-26T05:45:47.285Z",
            updatedAt: "2024-10-03T14:11:38.690Z",
            __v: 0
        },
        bookingDate: "2024-10-26T18:00:00.000Z",
        dockId: {
            _id: "66fcf77a6a9d37df8dd6364a",
            dockNumber: 2,
            stationType: "A",
            createdAt: "2024-10-02T07:34:18.186Z",
            updatedAt: "2024-10-02T07:34:18.186Z",
            __v: 0
        },
        loadUnloadTime: {
            _id: "66fd37edb3ff4a5922a09567",
            containerSize: 30,
            stationForMaterial: {
                _id: "66fd2461704eb147562c84e5",
                materialType: "REF Parts",
                stationType: "A",
                createdAt: "2024-10-02T10:45:53.523Z",
                updatedAt: "2024-10-02T10:45:53.523Z",
                __v: 0
            },
            loadedWithPallete: true,
            requiredTime: 90,
            createdAt: "2024-10-02T12:09:17.452Z",
            updatedAt: "2024-10-02T12:09:17.452Z",
            __v: 0
        },
        startTime: "2024-10-27T02:00:00.000Z",
        endTime: "2024-10-27T03:30:00.000Z",
        status: "pending",
        createdAt: "2024-10-02T12:32:37.269Z",
        updatedAt: "2024-10-02T12:32:37.269Z",
        __v: 0
    },
    {
        _id: "66fd3ee1b3ff4a5922a09575",
        user: {
            _id: "66f4f50bb27149e918b9b91c",
            name: "Md. Ahsanul Kabir",
            userId: "92910583",
            email: "ahsanul.kabir@singerbd.com",
            roleId: "66f4ef9a9cb10111ad517507",
            createdAt: "2024-09-26T05:45:47.285Z",
            updatedAt: "2024-10-03T14:11:38.690Z",
            __v: 0
        },
        bookingDate: "2024-10-26T18:00:00.000Z",
        dockId: {
            _id: "66fcf77a6a9d37df8dd6364a",
            dockNumber: 2,
            stationType: "A",
            createdAt: "2024-10-02T07:34:18.186Z",
            updatedAt: "2024-10-02T07:34:18.186Z",
            __v: 0
        },
        loadUnloadTime: {
            _id: "66fd3e7bb3ff4a5922a09571",
            containerSize: 40,
            stationForMaterial: {
                _id: "66fd246c704eb147562c84e7",
                materialType: "SKD Parts",
                stationType: "B",
                createdAt: "2024-10-02T10:46:04.527Z",
                updatedAt: "2024-10-02T10:46:04.527Z",
                __v: 0
            },
            loadedWithPallete: false,
            requiredTime: 150,
            createdAt: "2024-10-02T12:37:15.762Z",
            updatedAt: "2024-10-02T12:37:15.762Z",
            __v: 0
        },
        startTime: "2024-10-27T05:00:00.000Z",
        endTime: "2024-10-27T07:30:00.000Z",
        status: "pending",
        createdAt: "2024-10-02T12:38:57.098Z",
        updatedAt: "2024-10-02T12:38:57.098Z",
        __v: 0
    },
    {
        _id: "66fd3f61b3ff4a5922a09577",
        user: {
            _id: "66f4f50bb27149e918b9b91c",
            name: "Md. Ahsanul Kabir",
            userId: "92910583",
            email: "ahsanul.kabir@singerbd.com",
            roleId: "66f4ef9a9cb10111ad517507",
            createdAt: "2024-09-26T05:45:47.285Z",
            updatedAt: "2024-10-03T14:11:38.690Z",
            __v: 0
        },
        bookingDate: "2024-10-26T18:00:00.000Z",
        dockId: {
            _id: "66fcf77a6a9d37df8dd6364a",
            dockNumber: 2,
            stationType: "A",
            createdAt: "2024-10-02T07:34:18.186Z",
            updatedAt: "2024-10-02T07:34:18.186Z",
            __v: 0
        },
        loadUnloadTime: {
            _id: "66fd26a3cfb1ce3bb614391a",
            containerSize: 20,
            stationForMaterial: {
                _id: "66fd2461704eb147562c84e5",
                materialType: "REF Parts",
                stationType: "A",
                createdAt: "2024-10-02T10:45:53.523Z",
                updatedAt: "2024-10-02T10:45:53.523Z",
                __v: 0
            },
            loadedWithPallete: false,
            requiredTime: 60,
            createdAt: "2024-10-02T10:55:31.733Z",
            updatedAt: "2024-10-02T10:55:31.733Z",
            __v: 0
        },
        startTime: "2024-10-27T09:00:00.000Z",
        endTime: "2024-10-27T10:00:00.000Z",
        status: "pending",
        createdAt: "2024-10-02T12:41:05.545Z",
        updatedAt: "2024-10-02T12:41:05.545Z",
        __v: 0
    },
    {
        _id: "66fd400fb3ff4a5922a09579",
        user: {
            _id: "66f4f50bb27149e918b9b91c",
            name: "Md. Ahsanul Kabir",
            userId: "92910583",
            email: "ahsanul.kabir@singerbd.com",
            roleId: "66f4ef9a9cb10111ad517507",
            createdAt: "2024-09-26T05:45:47.285Z",
            updatedAt: "2024-10-03T14:11:38.690Z",
            __v: 0
        },
        bookingDate: "2024-10-26T18:00:00.000Z",
        dockId: {
            _id: "66fcf77e6a9d37df8dd6364c",
            dockNumber: 3,
            stationType: "A",
            createdAt: "2024-10-02T07:34:22.471Z",
            updatedAt: "2024-10-02T07:34:22.471Z",
            __v: 0
        },
        loadUnloadTime: {
            _id: "66fd269ecfb1ce3bb6143918",
            containerSize: 23,
            stationForMaterial: {
                _id: "66fd2461704eb147562c84e5",
                materialType: "REF Parts",
                stationType: "A",
                createdAt: "2024-10-02T10:45:53.523Z",
                updatedAt: "2024-10-02T10:45:53.523Z",
                __v: 0
            },
            loadedWithPallete: false,
            requiredTime: 60,
            createdAt: "2024-10-02T10:55:26.929Z",
            updatedAt: "2024-10-02T10:55:26.929Z",
            __v: 0
        },
        startTime: "2024-10-27T01:30:00.000Z",
        endTime: "2024-10-27T02:30:00.000Z",
        status: "pending",
        createdAt: "2024-10-02T12:43:59.774Z",
        updatedAt: "2024-10-02T12:43:59.774Z",
        __v: 0
    },
    {
        _id: "66fd4069b3ff4a5922a0957d",
        user: {
            _id: "66f4f50bb27149e918b9b91c",
            name: "Md. Ahsanul Kabir",
            userId: "92910583",
            email: "ahsanul.kabir@singerbd.com",
            roleId: "66f4ef9a9cb10111ad517507",
            createdAt: "2024-09-26T05:45:47.285Z",
            updatedAt: "2024-10-03T14:11:38.690Z",
            __v: 0
        },
        bookingDate: "2024-10-26T18:00:00.000Z",
        dockId: {
            _id: "66fcf77e6a9d37df8dd6364c",
            dockNumber: 3,
            stationType: "A",
            createdAt: "2024-10-02T07:34:22.471Z",
            updatedAt: "2024-10-02T07:34:22.471Z",
            __v: 0
        },
        loadUnloadTime: {
            _id: "66fd2691cfb1ce3bb6143916",
            containerSize: 40,
            stationForMaterial: {
                _id: "66fd2461704eb147562c84e5",
                materialType: "REF Parts",
                stationType: "A",
                createdAt: "2024-10-02T10:45:53.523Z",
                updatedAt: "2024-10-02T10:45:53.523Z",
                __v: 0
            },
            loadedWithPallete: false,
            requiredTime: 120,
            createdAt: "2024-10-02T10:55:13.486Z",
            updatedAt: "2024-10-02T10:55:13.486Z",
            __v: 0
        },
        startTime: "2024-10-27T03:30:00.000Z",
        endTime: "2024-10-27T05:30:00.000Z",
        status: "pending",
        createdAt: "2024-10-02T12:45:29.867Z",
        updatedAt: "2024-10-02T12:45:29.867Z",
        __v: 0
    },
    {
        _id: "66fd40a2b3ff4a5922a0957f",
        user: {
            _id: "66f4f50bb27149e918b9b91c",
            name: "Md. Ahsanul Kabir",
            userId: "92910583",
            email: "ahsanul.kabir@singerbd.com",
            roleId: "66f4ef9a9cb10111ad517507",
            createdAt: "2024-09-26T05:45:47.285Z",
            updatedAt: "2024-10-03T14:11:38.690Z",
            __v: 0
        },
        bookingDate: "2024-10-26T18:00:00.000Z",
        dockId: {
            _id: "66fcf77e6a9d37df8dd6364c",
            dockNumber: 3,
            stationType: "A",
            createdAt: "2024-10-02T07:34:22.471Z",
            updatedAt: "2024-10-02T07:34:22.471Z",
            __v: 0
        },
        loadUnloadTime: {
            _id: "66fd3845b3ff4a5922a09569",
            containerSize: 20,
            stationForMaterial: {
                _id: "66fd246c704eb147562c84e7",
                materialType: "SKD Parts",
                stationType: "B",
                createdAt: "2024-10-02T10:46:04.527Z",
                updatedAt: "2024-10-02T10:46:04.527Z",
                __v: 0
            },
            loadedWithPallete: false,
            requiredTime: 90,
            createdAt: "2024-10-02T12:10:45.262Z",
            updatedAt: "2024-10-02T12:10:45.262Z",
            __v: 0
        },
        startTime: "2024-10-27T07:00:00.000Z",
        endTime: "2024-10-27T08:30:00.000Z",
        status: "pending",
        createdAt: "2024-10-02T12:46:26.096Z",
        updatedAt: "2024-10-02T12:46:26.096Z",
        __v: 0
    },
    {
        _id: "66fd40e3b3ff4a5922a09581",
        user: {
            _id: "66f4f50bb27149e918b9b91c",
            name: "Md. Ahsanul Kabir",
            userId: "92910583",
            email: "ahsanul.kabir@singerbd.com",
            roleId: "66f4ef9a9cb10111ad517507",
            createdAt: "2024-09-26T05:45:47.285Z",
            updatedAt: "2024-10-03T14:11:38.690Z",
            __v: 0
        },
        bookingDate: "2024-10-26T18:00:00.000Z",
        dockId: {
            _id: "66fcf7826a9d37df8dd6364e",
            dockNumber: 4,
            stationType: "A",
            createdAt: "2024-10-02T07:34:26.341Z",
            updatedAt: "2024-10-02T07:34:26.341Z",
            __v: 0
        },
        loadUnloadTime: {
            _id: "66fd3845b3ff4a5922a09569",
            containerSize: 20,
            stationForMaterial: {
                _id: "66fd246c704eb147562c84e7",
                materialType: "SKD Parts",
                stationType: "B",
                createdAt: "2024-10-02T10:46:04.527Z",
                updatedAt: "2024-10-02T10:46:04.527Z",
                __v: 0
            },
            loadedWithPallete: false,
            requiredTime: 90,
            createdAt: "2024-10-02T12:10:45.262Z",
            updatedAt: "2024-10-02T12:10:45.262Z",
            __v: 0
        },
        startTime: "2024-10-27T02:00:00.000Z",
        endTime: "2024-10-27T04:00:00.000Z",
        status: "pending",
        createdAt: "2024-10-02T12:47:31.132Z",
        updatedAt: "2024-10-02T12:47:31.132Z",
        __v: 0
    },
    {
        _id: "66fd410eb3ff4a5922a09583",
        user: {
            _id: "66f4f50bb27149e918b9b91c",
            name: "Md. Ahsanul Kabir",
            userId: "92910583",
            email: "ahsanul.kabir@singerbd.com",
            roleId: "66f4ef9a9cb10111ad517507",
            createdAt: "2024-09-26T05:45:47.285Z",
            updatedAt: "2024-10-03T14:11:38.690Z",
            __v: 0
        },
        bookingDate: "2024-10-26T18:00:00.000Z",
        dockId: {
            _id: "66fcf7826a9d37df8dd6364e",
            dockNumber: 4,
            stationType: "A",
            createdAt: "2024-10-02T07:34:26.341Z",
            updatedAt: "2024-10-02T07:34:26.341Z",
            __v: 0
        },
        loadUnloadTime: {
            _id: "66fd269ecfb1ce3bb6143918",
            containerSize: 23,
            stationForMaterial: {
                _id: "66fd2461704eb147562c84e5",
                materialType: "REF Parts",
                stationType: "A",
                createdAt: "2024-10-02T10:45:53.523Z",
                updatedAt: "2024-10-02T10:45:53.523Z",
                __v: 0
            },
            loadedWithPallete: false,
            requiredTime: 60,
            createdAt: "2024-10-02T10:55:26.929Z",
            updatedAt: "2024-10-02T10:55:26.929Z",
            __v: 0
        },
        startTime: "2024-10-27T06:00:00.000Z",
        endTime: "2024-10-27T07:00:00.000Z",
        status: "pending",
        createdAt: "2024-10-02T12:48:14.873Z",
        updatedAt: "2024-10-02T12:48:14.873Z",
        __v: 0
    }
]