import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { set } from "local-storage";
import { axiosConfig, STATION_HEADER } from '../utils';
import DataTable from '../components/dataTable';
import NavBar from '../components/navBar';
import '../styles/dataTable.css';
import '../styles/navBar.css';
import { stationType } from '../types';


const StationPage = () => {
    const [stationData, setStationData] = useState<stationType>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const navigate = useNavigate();

    useEffect(() => {
        fetchData()
    }, []);

    const navigatePage = (item: stationType) => {
        let path = window.location.pathname + `/${item.stationId}`
        navigate(path);
        set<stationType>('stationItem', item);
    };

    const fetchData = () => {
        setLoading(true);
        axios.get('/api/station', axiosConfig).then((response) => {
            setStationData(response.data);
            setLoading(false);
        }).catch(e => {
            setError(e.response.data.message);
            setLoading(false);
        });
    };

    return (
        <div>
            <NavBar />
            {loading
                ?
                "loading"
                :
                (
                    error ?
                        <div>{error}</div>
                        :
                        <DataTable
                            headers={STATION_HEADER}
                            rows={stationData}
                            onRowSelect={(item: stationType) => navigatePage(item)}
                            isLoading={false}
                            showPagination={true}
                            initialPageSize={25}
                            keyPrefix={'departureStationName'}
                        />
                )
            }
        </div>
    );
};

export default StationPage;