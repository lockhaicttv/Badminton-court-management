import React from 'react';
import PaypalExpressBtn from "react-paypal-express-checkout";
import ReactDOM from "react-dom"
import { PayPalButton } from "react-paypal-button-v2";

const Paypal = (props) => {
    console.log(props)
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: props.toPay * 0.000043,
                    },
                    // payee: {
                    //     email_address: props.email_id,
                    // }
                },
            ],
        });
    }

    const onApprove = (data, actions) => {
        return actions.order.capture();
    }

    const onSuccess = (details, data) => {
        props.transactionSuccess(details, data)
    }

    const onError = (err) => {
        alert('Hệ thống bị gián đoạn, vui lòng thử lại sau')
    }

    return (
        <PayPalButton
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
            onSuccess={(details, data) => onSuccess(details, data)}
            onError={(err)=>onError(err)}
            options={{
                clientId: "Af7YWTVavfdFFvIpgh439WAPoA7mEd798O9nkRzYcm91qCYCZeu9W5K509xgsi7oZOT9INyk432OwbFM"
            }}
            style={{
                size: 'large',
                color: 'blue',
                shape: 'rect',
                label: 'checkout'
            }}
        />
    );

}

export default Paypal;