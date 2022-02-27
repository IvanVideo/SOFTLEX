import './Page1.css';
import React, { useEffect } from 'react';
import Form from '../Form/Form';

function Page1({ createItem, dataItems }) {
    const [visibleItem, setVisibleItem] = React.useState(3);

    const showMorItems = () => {
        setVisibleItem(visibleItem + 3);
    };

    return (
        <section className='page1'>
            <h1 className='page1__title'>Список задач</h1>
            <Form createItem={createItem} />
            <section className='page1__container'>
                {
                    dataItems === undefined ? null :
                        (
                            <table className='table page1__table'>
                                <thead>
                                    {
                                        dataItems.length > 0
                                            ? <tr>{Object.keys(dataItems[0]).map((item, index) =>
                                                <th className='table__head' key={index}>{item}</th>)}</tr>
                                            : null
                                    }
                                </thead>
                                <tbody>
                                    {
                                        dataItems.length > 0
                                            ? (
                                                dataItems.slice(0, visibleItem).map((row, index) => <tr className='table__row' key={index}>
                                                    {
                                                        Object.values(row).map((column, index) =>
                                                            <td className='table__cell' key={index}>{Object.values(column)}</td>)
                                                    }
                                                </tr>))
                                            : null
                                    }
                                </tbody>
                            </table>
                        )
                }
                <button className='page1__button' onClick={showMorItems}>Еще</button>
            </section>
        </section>
    );
}

export default Page1;