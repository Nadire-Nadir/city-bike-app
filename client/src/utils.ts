export const SidebarData = [
    {
        title: 'Journeys',
        path: '/journey',
        cName: 'nav-text'
    },
    {
        title: 'Stations',
        path: '/station',
        cName: 'nav-text'
    }
];

export const JOURNEY_HEADER = [
    { accessor: 'departureStationName', Header: 'Departure Station' },
    { accessor: 'returnStationName', Header: 'Return Station' },
    { accessor: 'coveredDistanceInMeter', Header: 'Distance (km)' },
    { accessor: 'durationInSecond', Header: 'Duration (min)' },
];


export const STATION_HEADER = [
    { accessor: 'stationNameFi', Header: 'Station Name' },
    { accessor: 'addressFi', Header: 'Station Address' },
    { accessor: 'operator', Header: 'Operator' },
    { accessor: 'capacities', Header: 'Capacities' },
]