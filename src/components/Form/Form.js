import './Form.css';
import React, { useEffect } from 'react';

function Form({ createItem }) {
    const [values, setValues] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value });
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        createItem(values);
    }

    useEffect(() => {
        if (values.name && values.mail && values.text && values.status) {
            setIsValid(true)
        }
    }, [values])

    return (
        <form onSubmit={handleSubmitForm}>
            <input
                className='form__input form__input_name'
                placeholder='name'
                name='name'
                required
                onChange={handleChange}>
            </input>
            <input
                className='form__input form__input_mail'
                placeholder='mail'
                name='mail'
                required
                onChange={handleChange}>
            </input>
            <input
                className='form__input'
                placeholder='text'
                name='text'
                required
                onChange={handleChange}>
            </input>
            <select
                className='form__input_status'
                name='status'
                defaultValue={'ok'}
                required
                onChange={handleChange}>
                <option value='ok'>ok</option>
                <option>false</option>
            </select>
            <button disabled={!isValid} className={isValid ? 'form__button' : 'form__button_hide'}>Add</button>
        </form>
    );
}

export default Form;