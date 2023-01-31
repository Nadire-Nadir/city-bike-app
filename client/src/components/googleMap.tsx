import GoogleMapReact from 'google-map-react';
import { Marker } from './mapMarker';


const SimpleMap = (props: any) => {
    const { center } = props;
    const defaultProps = {
        center: { lat: 60.205490, lng: 24.655899 },
        zoom: 11
    };

    return (
        <div style={{ height: '600px', width: '95vw', margin: "0 auto" }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
            >
                <Marker
                    lat={center.lat}
                    lng={center.lng}
                />
            </GoogleMapReact>
        </div>
    );
}

export default SimpleMap;