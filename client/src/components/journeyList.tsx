import axios from 'axios';
import { useState, useEffect } from 'react';
import { get } from "local-storage";
import { JOURNEY_HEADER } from '../utils';
import { JourneyType } from '../types';
import DataGrid from '../components/dataGrid';

const JourneyList = () => {
    const [journeyData, setJourneyData] = useState<JourneyType[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    useEffect(() => {   
        fetchData()
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    const axiosConfig = {
        headers: {
            'Authorization': 'Bearer ' + get('token')
        }
    };

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
        </>
    );
};

export default JourneyList;