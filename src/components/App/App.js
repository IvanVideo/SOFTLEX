import './App.css';
import { Routes, Route } from 'react-router-dom';
import LogIn from '../LogIn/LogIn';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LogIn />} />
      </Routes>
    </div>
  );
}

export default App;
