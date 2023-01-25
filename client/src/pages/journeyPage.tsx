
import DataTable from '../components/dataTable';
import '../styles/dataTable.css';

export const JOURNEY_HEADER = [
    { accessor: 'departureStationName', Header: 'Departure Station' },
    { accessor: 'returnStationName', Header: 'Return Station' },
    { accessor: 'coveredDistanceInMeter', Header: 'Distance (km)' },
    { accessor: 'durationInSecond', Header: 'Duration (min)' },
]

const JourneyPage = () => {
    return (
        <div>
            <DataTable
                headers={JOURNEY_HEADER}
                rows={[]}
                onRowSelect={(item: any) => console.log(item)}
                isLoading={ false}
                showPagination={ true}
                initialPageSize={5 }
                keyPrefix={'departureStationName'}
            />
        </div>
    )
}

export default JourneyPage;