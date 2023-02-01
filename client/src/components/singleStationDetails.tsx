import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Map from '../components/googleMap';
import SingleStationData from './singleStationData';
import { StationType } from '../types';
import { axiosConfig } from '../utils';


const SingleStationDetails = () => {
    const [stationData, setStationData] = useState<StationType | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const { id } = useParams();

    useEffect(() => {
        fetchData()
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps


    const fetchData = async () => {
        setLoading(true);
        setError(undefined);
        await axios.get(`/api/station/${id}`, axiosConfig)
            .then((response) => {
                setStationData(response.data);
                setLoading(false);
            }).catch(e => {
                setError(e.response.data.message);
                setLoading(false);
            })
    };


    return (
        <>
            <div className='details-container'>
                <div className='details-content'>
                    {stationData &&
                        <div>
                            <p>
                                <span className='details-title'>Station Name:</span>
                                <span>{stationData.stationNameFi}</span>
                            </p>
                            <p>
                                <span className='details-title'>Station Address: </span>
                                <span>{stationData.addressFi}, {stationData.cityFi}</span>
                            </p>

                            <SingleStationData stationId={stationData.stationId} />

                            <Map lat={stationData.yCoordinate} lng={stationData.xCoordinate} />
                        </div>
                    }

                    {loading && <div className="loader data-loader"></div>}

                    {error && <div>{error} </div>}                  
                </div>
            </div>
        </>
    );
};

export default SingleStationDetails;