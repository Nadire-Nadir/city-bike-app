import { Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar';
import SideBar from './components/sideBar';
import SingleStationPage from './pages/singleStationPage';
import JourneyPage from './pages/journeyPage';
import LoginPage from './pages/loginPage';
import NotFoundPage from './pages/notFoundPage';
import StationPage from './pages/stationPage';

const App = () => {

  return (
    <div>
      <NavBar />
      <SideBar />
      <Routes>
        <Route path='/journey' element={<JourneyPage />} />
        <Route path='/station' element={<StationPage />} />
        <Route path='station/:id' element={ <SingleStationPage />} />
        <Route path='/' element={<LoginPage />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;