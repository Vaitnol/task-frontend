import React from 'react'

export default props => (
    <table className='table table-sm'>
        <thead class="thead-dark">
            <tr>
                <th>
                    Id <button onClick={props.onSort.bind(null, 'id')}>Сорт</button>
                </th>
                <th>
                    First name <button onClick={props.onSort.bind(null, 'firstName')}>Сорт</button>
                </th>
                <th>
                    Last name <button onClick={props.onSort.bind(null, 'lastName')}>Сорт</button>
                </th>
                <th>
                    Email <button onClick={props.onSort.bind(null, 'email')}>Сорт</button>
                </th>
                <th>
                    Phone <button onClick={props.onSort.bind(null, 'phone')}>Сорт</button>
                </th>
            </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
                <tr key={item.id + item.phone} onClick={props.onRowSelect.bind(null, item)}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                </tr>
            ))}
        </tbody>
    </table>
)