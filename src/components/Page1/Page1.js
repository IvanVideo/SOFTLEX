import './Page1.css';
import React, { useEffect } from 'react';
import data from '../data';

function Page1() {
    const [visibleItem, setVisibleItem] = React.useState(3);

    const showMorItems = () => {
        setVisibleItem(visibleItem + 3);
      };

    return (
        <section className='page1'>
            <h1 className='page1__title'>Список задач</h1>
            <section className='page1__container'>
                <table className='table page1__table'>
                    <thead>
                        {
                            data.length > 0
                                ? <tr>{Object.keys(data[0]).map((item, index) =>
                                    <th className='table__head' key={index}>{item}</th>)}</tr>
                                : null
                        }
                    </thead>
                    <tbody>
                        {
                            data.length > 0
                                ? (
                                    data.slice(0, visibleItem).map((row, index) => <tr className='table__row' key={index}>
                                        {
                                            Object.values(row).map((column, index) =>
                                                <td className='table__cell' key={index}>{Object.values(column)}</td>)
                                        }
                                    </tr>))
                                : null
                        }
                    </tbody>
                </table>
                <button className='page1__button' onClick={showMorItems}>Еще</button>
            </section>
        </section>
    );
}

export default Page1;