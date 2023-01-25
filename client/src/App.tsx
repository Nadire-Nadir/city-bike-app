import { Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar';
import JourneyPage from './pages/journeyPage';
import LoginPage from './pages/loginPage';
import NotFoundPage from './pages/notFoundPage';
import StationPage from './pages/stationPage';

const App = () => {

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/journeys' element={<JourneyPage />} />
        <Route path='/stations' element={<StationPage />} />
        <Route path='/' element={<LoginPage />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;