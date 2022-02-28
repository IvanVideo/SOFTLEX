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
          navigate('/page1');
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

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  useEffect(() => {
    // console.log(currentUser)
    // if(currentUser.name === 'admin')
  }, [currentUser]);

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
    return mainApi.register({ name: data.login, password: data.password })
      .then((res) => {
        login(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Логин пользователя
  const login = (data) => {
    return mainApi.authorize({ name: data.login, password: data.password })
      .then((res) => {
        localStorage.setItem("token", res.token);
        setLoggedIn(true);
        tokenCheck();
        navigate('/page1');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Выход пользователя
  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={<LogIn login={login} />} />
        <Route path='/register' element={<Register registerUser={registerUser} />} />
        <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
          <Route path='/page1' element={<Page1 createItem={createItem} dataItems={data} currentUser={currentUser} logout={logout} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
