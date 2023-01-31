import axios from 'axios';
import { useState, useEffect } from 'react';
import { get } from "local-storage";
import NavBar from '../components/navBar';
import Map from '../components/googleMap';
import { avgDataType, countDataType, stationType } from '../types';
import { axiosConfig } from '../utils';
import '../styles/navBar.css';


const SingleStationPage = (props: any) => {
    const [countData, setCountData] = useState<countDataType>();
    const [avgData, setAvgData] = useState<avgDataType>();
    const [countError, setCountError] = useState<string>();
    const [avgError, setAvgError] = useState<string>();

    const stationData = get<stationType>('stationItem');

    useEffect(() => {
        fetchCountData();
        fetchAvgData();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps


    const postData = {
        id: stationData.stationId
    };

    const fetchCountData = async () => {
        setCountError(undefined);
        await axios.post('/api/journey/count', postData, axiosConfig)
            .then((response) => {
                setCountData(response.data);
            }).catch(e => {
                setCountError(e.response.data.message);
            });
    };


    const fetchAvgData = async () => {
        setAvgError(undefined);
        await axios.post('/api/journey/avg', postData, axiosConfig)
            .then((response) => {
                setAvgData(response.data);
            }).catch(e => {
                setAvgError(e.response.message);
            });
    };

    const avgJourneyFrom = avgData &&
        ((avgData.avgJourneyFrom._avg.coveredDistanceInMeter) / 1000).toFixed(3);

    const avgJourneyTo = avgData &&
        ((avgData.avgJourneyTo._avg.coveredDistanceInMeter) / 1000).toFixed(3)


    const center = {
        lat: stationData.yCoordinate,
        lng: stationData.xCoordinate,
    }

    return (
        <>
            <NavBar />
            <div className='page-container'>
                <h2 className='page-title'>Station Details</h2>

                <div>
                    {stationData &&
                        <div>
                            <p>Station Name:
                                <span>{stationData.stationNameFi}</span>
                            </p>
                            <p>Station Address:
                                <span>{stationData.addressFi}, {stationData.cityFi}</span>
                            </p>
                        </div>
                    }
                </div>
                <div>
                    {countData &&
                        <div>
                            <p>Total number of journeys starting from this station:
                                <span>{countData.departureJourneyNum}</span>
                            </p>

                            <p>Total number of journeys ending at the station:
                                <span>{countData.returnJourneyNum}</span>
                            </p>
                        </div>
                    }
                    {
                        countError && <p>{countError}</p>
                    }
                </div>
                <div>
                    {avgData &&
                        <div>
                            <p>The average distance of a journey starting from this station:
                                <span>
                                    {avgJourneyFrom} {"km"}
                                </span>
                            </p>

                            <p>The average distance of a journey ending at this station:
                                <span>
                                    {avgJourneyTo} {"km"}
                                </span>
                            </p>
                        </div>
                    }
                    {
                        avgError && <p>{avgError}</p>
                    }
                </div>
                <Map center={center} />               
            </div>
        </>
    );
};


export default SingleStationPage;