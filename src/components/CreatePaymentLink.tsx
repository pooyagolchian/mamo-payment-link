import React, { useState } from 'react';
import axios from 'axios';

const CreatePaymentLink = () => {
    const [link, setLink] = useState('');

    const createLink = async () => {
        let data = JSON.stringify({
            "title": "Chocolate Box - Small",
            "description": "12pcs Chocolate Box",
            first_name: "Pooya",
            last_name: "Golchian",
            "email": "pooya.golchian@gmail.com",
            "capacity": 1,
            "active": true,
            "return_url": "https://myawesomewebsite.com/paymentSuccess",
            "failure_return_url": "https://failureurl.com/paymentFailure",
            "processing_fee_percentage": 3,
            "amount": 119.99,
            "amount_currency": "AED",
            "link_type": "inline",
            "enable_tabby": false,
            "enable_message": false,
            "enable_tips": false,
            "save_card": "off",
            "enable_customer_details": false,
            "enable_quantity": false,
            "enable_qr_code": false,
            "send_customer_receipt": false,
            "hold_and_charge_later": false
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8010/proxy/manage_api/v1/links',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_MAMO_CREATE_PAYMENT_LINK_API_KEY}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            const response = await axios.request(config);
            setLink(response?.data);
        } catch (error) {
            console.error('Error creating payment link:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <button
                onClick={createLink}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Create Payment Link
            </button>

            {
                link && (
                    <pre className="bg-gray-100 p-4 rounded mt-4">
                        {JSON.stringify(link, null, 2)}
                    </pre>
                )
            }
            <div id='mamo-checkout' data-src={link}></div>
            <script src='https://assets.mamopay.com/public/checkout-inline.min.js'></script>
        </div>
    );
};

export default CreatePaymentLink;
