import './App.css';
import Login from './component/Login';
import { Routes, Route } from 'react-router-dom';
import {app, database} from "./firebaseConfig"
import Home from './component/Home';
import Editor from './component/Editor';

function App() {
  return (
    <div className="App">
        <h1>Google Docs</h1>

        <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/home' element={<Home database={database}/>}/>
        <Route path='/editor/:id' element={<Editor database={database}/>}/>
        <Route />
        </Routes>
    </div>
  );
}

export default App;
