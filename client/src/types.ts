import { Dispatch, SetStateAction } from "react"

export interface StationType {
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

export interface JourneyType {
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

export interface CountDataType {
    departureJourneyNum: string,
    returnJourneyNum: string
};

export interface AvgDataType {
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

export interface CoordinateType {
    lat: number,
    lng: number,
};

export interface RegisterFormProps {
    onSubmit: any,
    signup?: boolean,
    setUsername: Dispatch<SetStateAction<string | undefined>>,
    setPassword: Dispatch<SetStateAction<string | undefined>>,
    loading: boolean,
    error: string | undefined
};

export interface HeadersType {
    accessor: string,
    Header: string,
    width?: number | undefined
};

export interface DataGridPropsType {
    rows: any,
    headers: HeadersType[],
    onRowSelect: any,
    isLoading: boolean,
    showPagination: boolean,
    initialPageSize: number,
    keyPrefix: string
};

export interface SingleStatePropsType {
    stationId: string
}