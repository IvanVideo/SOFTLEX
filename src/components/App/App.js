import './App.css';
import { Routes, Route } from 'react-router-dom';
import LogIn from '../LogIn/LogIn';
import Page1 from '../Page1/Page1';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/page1' element={<Page1 />} />
      </Routes>
    </div>
  );
}

export default App;
