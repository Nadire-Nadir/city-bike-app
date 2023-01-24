import './App.css';
import { Admin, Resource } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'
import authProvider from './authProvider';

const dataProvider = jsonServerProvider('http://localhost:8000')

const App = () => {

  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <div className='App'>
        "Hello world"
        </div>
    </Admin>
  );
};

export default App;