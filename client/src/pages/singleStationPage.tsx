import NavBar from '../components/navBar';
import SingleStationDetails from '../components/singleStationDetails';
import '../styles/navBar.css';
import '../styles/singleStationPage.css';


const SingleStationPage = () => {
    return (
        <>
            <NavBar />
            <div className='page-container'>
                <h2 className='page-title'>
                    Station Details
                </h2>
                <SingleStationDetails />
            </div>
        </>
    );
};

export default SingleStationPage;