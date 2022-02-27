import './Register.css';
import { useNavigate, Link } from 'react-router-dom';
import React, { useEffect } from 'react';

function Register({ registerUser }) {
  const [values, setValues] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setIsValid(target.closest("form").checkValidity());
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    registerUser(values)
  }

  return (
    <section className='logIn'>
      <div className='logIn__conteiner'>
        <h1 className='logIn__title'>Тестовая работа</h1>
        <p className='logIn__subtitle'>Рамазанов Иван</p>
        <form className='form logIn__form' onSubmit={handleSubmitForm}>
          <div className='form__box'>
            <label className='form__lable'>Login</label>
            <input
              className='form__input'
              name="Login"
              minLength={2}
              onChange={handleChange}
              required />
          </div>
          <div className='form__box'>
            <label className='form__lable'>Password</label>
            <input
              className='form__input'
              name="Password"
              minLength={3}
              onChange={handleChange}
              required />
          </div>
          <button className='form__button'>Войти</button>
          <Link className='form__link' to='/'>Войти</Link>
        </form>
      </div>
    </section>
  );
}

export default Register;