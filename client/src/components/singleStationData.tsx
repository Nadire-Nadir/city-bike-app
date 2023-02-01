import { useState, useEffect } from 'react';
import axios from 'axios';
import { AvgDataType, CountDataType, SingleStatePropsType } from '../types';
import { axiosConfig } from '../utils';

const SingleStationData: React.FC<SingleStatePropsType> = ({ stationId }) => {
    const [countData, setCountData] = useState<CountDataType>();
    const [avgData, setAvgData] = useState<AvgDataType>();
    const [countError, setCountError] = useState<string>();
    const [avgError, setAvgError] = useState<string>();

    useEffect(() => {
        fetchCountData();
        fetchAvgData();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps


    const postData = {
        id: stationId
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


    return (
        <>
            {countData && avgData ?
                <>
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
                </>
                :
                <div className="loader data-loader"></div>
            }
        </>
    );
};

export default SingleStationData;