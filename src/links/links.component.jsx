import React from 'react'
import './links.styles.scss'

export default props => {

    const hugeUrl = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
    const tinyUrl = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`

    return (
        <div className='container btn-style'>
            <h2>Нажмите на кнопку для дальнейшего перехода</h2>
            <button onClick={() => props.onSelect(tinyUrl)} className="btn btn-outline-primary btn-s">Выбор маленького списка</button>
            <button onClick={() => props.onSelect(hugeUrl)} className="btn btn-outline-info btn-s">Выбор большого списка</button>
        </div>
    )
}