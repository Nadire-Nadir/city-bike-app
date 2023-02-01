import axios from 'axios';
import { useState, useEffect } from 'react';
import { axiosConfig, JOURNEY_HEADER } from '../utils';
import { JourneyType } from '../types';
import DataGrid from '../components/dataGrid';
import NavBar from '../components/navBar';
import '../styles/dataTable.css';
import '../styles/navBar.css';

const JourneyPage = () => {
    const [journeyData, setJourneyData] = useState<JourneyType[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(undefined);
        await axios.get('/api/journey', axiosConfig)
            .then((response) => {
                setJourneyData(response.data);
                setLoading(false);
            }).catch(e => {
                setError(e.response.data.message);
                setLoading(false);
            })
    };

    if (loading) {
        return <div className="loader data-loader"></div>
    };

    if (error) {
        return <div>{error}</div>
    };

    return (
        <>
            <NavBar />
            <div className='page-container'>
                <h1 className='page-title'>Journeys List</h1>

                {journeyData &&
                    <DataGrid
                        headers={JOURNEY_HEADER}
                        rows={journeyData}
                        onRowSelect={(item: JourneyType) => item}
                        isLoading={false}
                        showPagination={true}
                        initialPageSize={25}
                        keyPrefix={'departureStationName'}
                    />
                }
            </div>
        </>
    );
};

export default JourneyPage;