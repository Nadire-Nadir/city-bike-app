import NavBar from '../components/navBar';
import StationList from '../components/stationList';
import '../styles/dataTable.css';
import '../styles/navBar.css';


const StationPage = () => {
    return (
        <>
            <NavBar />
            <div className='page-container'>
                <h2 className='page-title'>Stations List</h2>
                <StationList />
            </div>
        </>
    );
};

export default StationPage;