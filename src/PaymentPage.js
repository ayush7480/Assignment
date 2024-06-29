import React, { useEffect, useRef } from 'react';
import './PaymentPage.css';

const PaymentPage = () => {
  const paypalRef = useRef(null);

  useEffect(() => {
    if (window.paypal && paypalRef.current) {
    
      while (paypalRef.current.firstChild) {
        paypalRef.current.removeChild(paypalRef.current.firstChild);
      }
      // Initialize the PayPal button
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '10.00', 
              },
            }],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Transaction completed by ${details.payer.name.given_name}`);
          });
        },
        onError: (err) => {
          console.error('PayPal Checkout onError', err);
        },
      }).render(paypalRef.current);
    }
  }, []);

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h1>Pay with PayPal</h1>
        <p>Complete your purchase by clicking the PayPal button below.</p>
        <div className="paypal-button" ref={paypalRef}></div>
      </div>
      <div className="bubble bubble1"></div>
      <div className="bubble bubble2"></div>
      <div className="bubble bubble3"></div>
      <div className="bubble bubble4"></div>
    </div>
  );
};

export default PaymentPage;
