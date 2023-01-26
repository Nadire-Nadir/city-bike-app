import React, { useState, useEffect } from 'react';
import DataTable from '../components/dataTable';
import '../styles/dataTable.css';

export const JOURNEY_HEADER = [
    { accessor: 'departureStationName', Header: 'Departure Station' },
    { accessor: 'returnStationName', Header: 'Return Station' },
    { accessor: 'coveredDistanceInMeter', Header: 'Distance (km)' },
    { accessor: 'durationInSecond', Header: 'Duration (min)' },
]

const JourneyPage = () => {
    const [journeyData, setJourneyData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = () => {
        // const myHeaders = new Headers();
        // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        
        setLoading(true);
        fetch('https://helsinki-city-bike-281t.onrender.com/api/journey', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => res.json()).then((result) => {
            setJourneyData(result.data);
            setLoading(false);
        }).catch(e => {
            console.log(e);
            setLoading(false);
        })           
    }

    return (
        <div>
            {loading ? "loading" :
                <DataTable
                    headers={JOURNEY_HEADER}
                    rows={journeyData}
                    onRowSelect={(item: any) => console.log(item)}
                    isLoading={false}
                    showPagination={true}
                    initialPageSize={25}
                    keyPrefix={'departureStationName'}
                />}
        </div>
    )
}

export default JourneyPage;