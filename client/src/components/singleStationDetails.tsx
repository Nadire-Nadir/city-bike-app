import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { get } from "local-storage";
import Map from '../components/googleMap';
import SingleStationData from './singleStationData';
import { StationType } from '../types';


const SingleStationDetails = () => {
    const [stationData, setStationData] = useState<StationType | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const { id } = useParams();

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
        <div>
            {stationData &&
                <div>
                    <div className='details-container'>
                        <div className='details-content'>
                            <div>
                                <p>
                                    <span className='details-title'>Station Name:</span>
                                    <span>{stationData.stationNameFi}</span>
                                </p>
                                <p>
                                    <span className='details-title'>Station Address: </span>
                                    <span>{stationData.addressFi}, {stationData.cityFi}</span>
                                </p>
                            </div>
                            <SingleStationData stationId={stationData.stationId} />
                        </div>
                    </div>
                    <Map lat={stationData.yCoordinate} lng={stationData.xCoordinate} />
                </div>
            }

            {loading && <div className="loader data-loader"></div>}

            {error && <div>{error} </div>}
        </div>
    );
};

export default SingleStationDetails;