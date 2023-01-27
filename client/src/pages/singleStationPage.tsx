import React, { useState, useEffect } from 'react';

const SingleStationPage = (props: any) => {
    const [countData, setCountData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const item = localStorage.getItem('item');
    const itemData = item && JSON.parse(item) 

    useEffect(() => {
        fetchCountData()
    }, []);

    const fetchCountData = () => {
        if (itemData) {
            // var formData = new FormData();
            // formData.append('departureStationId', JSON.stringify({departureStationId: '4'}));
            // formData.append('returnStationId', JSON.stringify({returnStationId: '4'}));
            setLoading(true);
            fetch('https://helsinki-city-bike-281t.onrender.com/api/journey/count', {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    departureStationId: itemData.stationId,
                    returnStationId: itemData.stationId
                })
                
            }).then(res => res.json()).then((result) => {
                setCountData(result.data);
                setLoading(false);
            }).catch(e => {
                console.log(e);
                setLoading(false);
            });
        }
    }

    console.log("data", itemData);
    return (
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
                <span>{countData.departureJourneyNum}</span>
            </div>
            <div>
                <p>Total number of journeys ending at the station</p>
                <span>{countData.returnJourneyNum}</span>
            </div>
        </div>
    )
}



export default SingleStationPage;