import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import DataTable from '../components/dataTable';
import '../styles/dataTable.css';

export const STATION_HEADER = [
    { accessor: 'stationNameFi', Header: 'Station Name' },
    { accessor: 'addressFi', Header: 'Station Address' },
    { accessor: 'operator', Header: 'Operator' },
    { accessor: 'capacities', Header: 'Capacities' },
]

const StationPage = () => {
    const [stationData, setStationData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchData()
    }, []);

    let navigate = useNavigate(); 
    const navigatePage = (item: any) => {
        let path = window.location.pathname + `/${item.stationId}`    
        navigate(path);
        localStorage.setItem('item', JSON.stringify(item));
        
    }

    const fetchData = () => {
        setLoading(true);
        fetch('/api/station', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => res.json()).then((result) => {
            setStationData(result.data);
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
                    headers={STATION_HEADER}
                    rows={stationData}
                    onRowSelect={(item: any) => navigatePage(item)}
                    isLoading={false}
                    showPagination={true}
                    initialPageSize={25}
                    keyPrefix={'departureStationName'}
                />}
        </div>
    )
}

export default StationPage;