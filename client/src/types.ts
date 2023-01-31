export interface stationType {
    stationId: string,
    stationNameFi: string,
    stationNameSe: string,
    stationNameEn: string,
    addressFi: string,
    addressEn: string,
    cityFi: string,
    citySe: string,
    operator: string,
    capacities: number,
    xCoordinate: number,
    yCoordinate: number,
};

export interface journeyType {
    journeyId: string,
    departureTime: string,
    departureStationId: string,
    departureStationName: string,
    returnTime: string,
    returnStationId: string,
    returnStationName: string,
    coveredDistanceInMeter: number,
    durationInSecond: number,
};

export interface countDataType {
    departureJourneyNum: string,
    returnJourneyNum: string
};

export interface avgDataType {
    avgJourneyFrom: {
        _avg: {
            coveredDistanceInMeter: number
        }
    },
    avgJourneyTo: {
        _avg: {
            coveredDistanceInMeter: number
        }
    }
};

export interface MarkerType {
    lat: number,
    lng: number,
};
