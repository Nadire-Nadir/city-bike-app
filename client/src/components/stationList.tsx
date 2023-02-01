import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { axiosConfig, STATION_HEADER } from '../utils';
import { StationType } from '../types';
import DataGrid from '../components/dataGrid';


const StationList = () => {
    const [stationData, setStationData] = useState<StationType>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const navigate = useNavigate();

    useEffect(() => {
        fetchData()
    }, []);

    const navigatePage = (item: StationType) => {
        let path = window.location.pathname + `/${item.stationId}`
        navigate(path);
    };

    const fetchData = () => {
        setLoading(true);
        axios.get('/api/station', axiosConfig)
            .then((response) => {
                setStationData(response.data);
                setLoading(false);
            }).catch(e => {
                setError(e.response.data.message);
                setLoading(false);
            });
    };

    if (loading) {
        return <div className="loader data-loader"></div>
    };

    if (error) {
        return <div>{error}</div>
    }

    return (
        <>
            {stationData &&
                <DataGrid
                    headers={STATION_HEADER}
                    rows={stationData}
                    onRowSelect={(item: StationType) => navigatePage(item)}
                    isLoading={false}
                    showPagination={true}
                    initialPageSize={25}
                    keyPrefix={'departureStationName'}
                />
            }
        </>
    );
};

export default StationList;