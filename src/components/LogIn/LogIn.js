import './LogIn.css';

function LogIn() {
  return (
    <section>
      <h1 className='logIn__title'>Тестовая работа</h1>
      <p className='logIn__subtitle'>Рамазанов Иван</p>
      <article>
        <form className='form logIn__form'>
          <label>Login</label>
          <input className='form__input'></input>
          <label>Password</label>
          <input></input>
        </form>
      </article>
    </section>
  );
}

export default LogIn;