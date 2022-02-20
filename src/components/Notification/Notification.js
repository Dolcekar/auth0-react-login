import React from 'react'
import './Notification.css';
import { Link } from 'react-router-dom';



export const Notification = ({ show, close, text }) => {

  if (!show) {
    console.log('show', show);
    return null
  }
  else {
    console.log('show', show, text);
  }

  const showNotificationText = () => {
    switch (text) {
      case 'ADD_TO_CART':
        return (
          <>
            Item added to {<Link to='/cart'><span style={{ textDecoration: 'underline', color: '#fff' }}>Cart</span></Link>}.
          </>
        )
      // break;

      case 'REMOVE_FROM_CART':
        return (
          <>
            Item removed from {<Link style={{ textDecoration: 'underline', color: '#fff' }} to='/cart'>Cart</Link>}.
          </>
        )

      case 'ITEM_QTY_INCREASED':
        return (
          <>
            Item Quantity increased.
          </>
        )

      case 'ITEM_QTY_DECREASED':
        return (
          <>
            Item Quantity decreased.
          </>
        )

      case 'ORDER_CANCELED':
        return (
          <>
            Order canceled..
          </>
        )

      case 'ORDER_ACCEPTED':
        return (
          <>
            Order accepted..
          </>
        )
      default:
        return (
          <>{text}</>
        )
    }


  }


  return (
    <>
      {show ? (<div onClick={close} className="notification-backdrop" />) : null}

      <div className="notification"
        style={{
          opacity: show ? '1' : '0',
          transform: show ? 'translateY(0vh)' : 'translateY(-100vh)'
        }}
      >
        <div className="notification-content">
          <i className="fa fa-check-circle fa-2x" style={{ color: '#1BD4A5', marginBottom: '9.6px' }}></i>
          <p>{showNotificationText()}</p>
          <div onClick={close} className="close-button" style={{ marginBottom: '0.7rem' }}>X</div>
        </div>
      </div>

    </>
  )
}