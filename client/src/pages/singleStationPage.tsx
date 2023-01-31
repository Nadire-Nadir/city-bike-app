import axios from 'axios';
import { useState, useEffect } from 'react';
import { get } from "local-storage";
import NavBar from '../components/navBar';
import Map from '../components/googleMap';
import { avgDataType, countDataType, stationType } from '../types';
import { axiosConfig } from '../utils';
import '../styles/navBar.css';
import '../styles/singleStationPage.css';


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
        ((avgData.avgJourneyTo._avg.coveredDistanceInMeter) / 1000).toFixed(3);

    const center = {
        lat: stationData.yCoordinate,
        lng: stationData.xCoordinate,
    };

    return (
        <>
            <NavBar />
            <div className='page-container'>
                <h2 className='page-title'>Station Details</h2>
                {stationData && countData && avgData ?
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

                            <div>
                                <p>
                                    <span className='details-title'>
                                        Total number of journeys starting from this station:
                                    </span>
                                    <span>
                                        {countError ? 'Not found' : countData.departureJourneyNum}
                                    </span>
                                </p>
                                <p>
                                    <span className='details-title'>
                                        Total number of journeys ending at the station:
                                    </span>
                                    <span>{countError ? 'Not found' : countData.returnJourneyNum}</span>
                                </p>
                            </div>

                            <div>
                                <p>
                                    <span className='details-title'>
                                        The average distance of a journey starting from this station:
                                    </span>
                                    <span>
                                        {avgError ? 'Not found' : avgJourneyFrom} {"km"}
                                    </span>
                                </p>
                                <p>
                                    <span className='details-title'>
                                        The average distance of a journey ending at this station:
                                    </span>
                                    <span>
                                        {avgError ? 'Not found' : avgJourneyTo} {"km"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="loader data-loader"></div>
                }
                <Map center={center} />
            </div>
        </>
    );
};

export default SingleStationPage;