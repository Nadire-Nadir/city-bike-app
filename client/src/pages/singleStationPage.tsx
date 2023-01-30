import axios from 'axios';
import { useState, useEffect } from 'react';
import NavBar from '../components/navBar';
import { axiosConfig } from '../utils';
import '../styles/navBar.css';

export interface stateType { avgFrom: string | null; avgTo: string | null }

const SingleStationPage = () => {
    const [countData, setCountData] = useState<any>();
    const [avgData, setAvgData] = useState<any>({ avgFrom: '', avgTo: '' });
    const [countError, setCountError] = useState<string>();
    const [avgError, setAvgError] = useState<string>();

    const item = localStorage.getItem('stationItem');
    const itemData = JSON.parse(item || '[]');

    
    useEffect(() => {
        fetchCountData();
        fetchAvgData();
    }, []);


    const postData = {
        departureStationId: itemData.stationId,
        returnStationId: itemData.stationId
    };


    const fetchCountData = async () => {
        setCountError(undefined);
        await axios.post('/api/journey/count', postData, axiosConfig).then((response) => {
            setCountData(response.data.data);
        }).catch(e => {
            setCountError(e.response.data.message);
        });
    };


    const fetchAvgData = async () => {
        setAvgError(undefined);
        await axios.post('/api/journey/avg', postData, axiosConfig).then((response) => {
            setAvgData({
                avgFrom: response.data.data.avgJourneyFrom._avg.coveredDistanceInMeter,
                avgTo: response.data.data.avgJourneyTo._avg.coveredDistanceInMeter
            });
        }).catch(e => {
            setAvgError(e.response.data.message);
        });
    };


    return (
        <div>
            <NavBar />
            <div>
                {itemData &&
                    <div>
                        <p>Station Name:
                            <span>{itemData.stationNameFi}</span>
                        </p>
                        <p>Station Address:
                            <span>{itemData.addressFi}, {itemData.cityFi}</span>
                        </p>
                    </div>
                }
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
                                    {avgData.avgFrom ? (avgData.avgFrom) / 1000 : "0"} {"km"}
                                </span>
                            </p>

                            <p>The average distance of a journey ending at this station:
                                <span>
                                    {avgData.avgTo ? (avgData.avgTo) / 1000 : "0"} {"km"}
                                </span>
                            </p>

                        </div>
                    }
                    {
                        avgError && <p>{avgError}</p>
                    }
                </div>
            </div>
        </div>
    );
};


export default SingleStationPage;