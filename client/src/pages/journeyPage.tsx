import axios from 'axios';
import { useState, useEffect } from 'react';
import { axiosConfig, JOURNEY_HEADER } from '../utils';
import DataTable from '../components/dataTable';
import NavBar from '../components/navBar';
import '../styles/dataTable.css';

const JourneyPage = () => {
    const [journeyData, setJourneyData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = () => {
        setLoading(true);
        setError(undefined);
        axios.get('/api/journey', axiosConfig).then((response) => {
            setJourneyData(response.data.data);
            setLoading(false);
        }).catch(e => {
            setError(e.response.data.message);
            setLoading(false);
        })
    };

    return (
        <div>
            <NavBar />
            {loading ?
                <div> "loading"</div>
                :
                (
                    error
                        ?
                        <div>{error}</div>
                        :
                        <DataTable
                            headers={JOURNEY_HEADER}
                            rows={journeyData}
                            onRowSelect={(item: any) => console.log(item)}
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

export default JourneyPage;