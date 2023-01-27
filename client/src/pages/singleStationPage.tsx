import React, { useState, useEffect } from 'react';

const SingleStationPage = (props: any) => {
   
    const item = localStorage.getItem('item');
    const itemH = item && JSON.parse(item) 
    console.log("props", item && JSON.parse(item))

    const [countData, setCountData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = () => {
        // if (itemH) {
        //     setLoading(true);
        //     fetch('https://helsinki-city-bike-281t.onrender.com/api/journey/departure', {
        //         method: 'POST',
        //         headers: {
        //             'Authorization': 'Bearer ' + localStorage.getItem('token')
        //         },
        //         body: JSON.stringify({ departureStationId: itemH.stationId })
                
        //     }).then(res => res.json()).then((result) => {
        //         setCountData(result.data);
        //         setLoading(false);
        //     }).catch(e => {
        //         console.log(e);
        //         setLoading(false);
        //     })
        // }
    }
    console.log("coint", countData);
    return (
        <div>nav bar</div>
    )
}



export default SingleStationPage;