import './App.css';
import { useNavigate, Routes, Route } from 'react-router-dom';
import LogIn from '../LogIn/LogIn';
import Page1 from '../Page1/Page1';
import Register from '../Register/Register';
import React, { useEffect } from 'react';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/api';

function App() {
  const [data, setData] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState([]);
  const navigate = useNavigate();

  const tokenCheck = React.useCallback(() => {
    const jwt = localStorage.getItem("token");
    if (jwt && jwt !== null) {
      mainApi.checkToken(jwt)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  });

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

  //Регистрация пользователя
  const registerUser = (data) => {
    return mainApi.register(data)
      .then((res) => {
        login(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Логин пользователя
  const login = (data) => {
    return mainApi.authorize({ name: data.Login, password: data.Password })
      .then((res) => {
        console.log(res.token, 'УРА!')
        localStorage.setItem("token", res.token);
        setLoggedIn(true);
        tokenCheck();
        navigate('/page1');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/register' element={<Register registerUser={registerUser} />} />
        <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
          <Route path='/page1' element={<Page1 createItem={createItem} dataItems={data} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
