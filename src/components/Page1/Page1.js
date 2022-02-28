import './Page1.css';
import React, { useEffect } from 'react';
import Form from '../Form/Form';

const Page1 = ({ createItem, dataItems, currentUser, logout, adminValue }) => {
    const [visibleItem, setVisibleItem] = React.useState(5); //значение отображаемых строк таблицы
    const [filterValue, setFilterValue] = React.useState(''); //значение по которому фильтруем данные
    const [inputVisible, setInputVisible] = React.useState(true);

    const showMorItems = () => {
        setVisibleItem(visibleItem + 3);
    };

    const handleExitProfile = () => {
        logout()
    }

    useEffect(() => {
    }, [adminValue])


    return (
        <section className='page1'>
            <section className='page1__header'>
                <p className='page1__profile'>{currentUser.name}</p>
                <button onClick={handleExitProfile} className='page1__button'>выйти</button>
            </section>
            <h1 className='page1__title'>Список задач</h1>
            <Form createItem={createItem} />
            <article className='container page1__container'>
                <div className='page1__filter'>
                    <input
                        className='page1__input'
                        onChange={(e) => { setFilterValue(e.target.value) }}
                    />
                    <p className='page1__about'>фильтрация по name, mail, status</p>
                </div>
                <table className='table table-bordered page1__table'>
                    <thead>
                        <tr>
                            <th className=''>name</th>
                            <th className=''>mail</th>
                            <th className=''>text</th>
                            <th className=''>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataItems.length > 0 ? (
                                dataItems.slice(0, visibleItem).filter((value) => {
                                    if (filterValue === '') {
                                        return value
                                    } else if (
                                        value.name.toLowerCase().includes(filterValue.toLowerCase()) ||
                                        value.mail.toLowerCase().includes(filterValue.toLowerCase()) ||
                                        value.status.toLowerCase().includes(filterValue.toLowerCase())
                                    ) {
                                        return value
                                    }
                                }).map((item, index) => (
                                    <tr key={index}>
                                        <td className=''>{item.name}</td>
                                        <td className=''>{item.mail}</td>
                                        <td className=''>{item.text}</td>
                                        <td className=''>{item.status}</td>
                                    </tr>
                                ))
                            ) : null
                        }
                    </tbody>
                </table>
                <button
                    className='page1__button'
                    onClick={showMorItems}>
                    Еще
                </button>
            </article>
        </section>
    );
}

export default Page1;