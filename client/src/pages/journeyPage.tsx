import NavBar from '../components/navBar';
import JourneyList from '../components/journeyList';
import '../styles/dataTable.css';
import '../styles/navBar.css';


const JourneyPage = () => {
    return (
        <>
            <NavBar />
            <div className='page-container'>
                <h1 className='page-title'>
                    Journeys List
                </h1>

                <JourneyList />
            </div>
        </>
    );
};

export default JourneyPage;