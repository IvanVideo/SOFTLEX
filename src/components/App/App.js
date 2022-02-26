import './App.css';
import { Routes, Route } from 'react-router-dom';
import LogIn from '../LogIn/LogIn';
import Page1 from '../Page1/Page1';
import React, { useEffect } from 'react';
import mainApi from '../../utils/api';

function App() {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    mainApi.getCards()
      .then((cards) => {
        setData(cards.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const createItem = (card) => {
    mainApi.createCard(card)
      .then((item) => {
        setData([item.data, ...data]);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/page1' element={<Page1 createItem={createItem} dataItems={data} />} />
      </Routes>
    </div>
  );
}

export default App;
