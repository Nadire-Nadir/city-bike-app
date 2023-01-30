import React, { useState, useEffect } from 'react';
import NavBar from '../components/navBar';

const SingleStationPage = (props: any) => {
    // const jData = localStorage.getItem('countJourneyData');
    // console.log("jsd", jData);
    // const localCountData = jData ? JSON.parse(jData) : undefined;
    
    const [countData, setCountData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const item = localStorage.getItem('item');
    const itemData = item && JSON.parse(item) 

    useEffect(() => {
        fetchCountData()
    }, []);

    const fetchCountData = () => {
   
    }

    console.log("data", itemData);
    return (
        <div>
            <NavBar />
            {loading ?
                "loading" :
                <div>
                    <div>
                        <p>Station Name: </p>
                        <span>{itemData.stationNameFi}</span>
                    </div>
                    <div>
                        <p>Station Address: </p>
                        <span>{itemData.addressFi}</span>
                    </div>
                    <div>
                        <p>Total number of journeys starting from this station</p>
                        {/* <span>{countData.departureJourneyNum}</span> */}
                    </div>
                    <div>
                        <p>Total number of journeys ending at the station</p>
                        {/* <span>{countData.returnJourneyNum}</span> */}
                    </div>
                </div>
            }
        </div>
    )
}



export default SingleStationPage;