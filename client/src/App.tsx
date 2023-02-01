import { Routes, Route } from 'react-router-dom';
import SingleStationPage from './pages/singleStationPage';
import JourneyPage from './pages/journeyPage';
import LoginPage from './pages/loginPage';
import NotFoundPage from './pages/notFoundPage';
import StationPage from './pages/stationPage';
import SignupPage from './pages/signupPage';
import './styles/App.css';

const App = () => {

  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/journey' element={<JourneyPage />} />
        <Route path='/station' element={<StationPage />} />
        <Route path='station/:id' element={<SingleStationPage />} />
        <Route path='/' element={<LoginPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;