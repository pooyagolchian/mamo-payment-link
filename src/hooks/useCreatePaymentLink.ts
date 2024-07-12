import { useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface PaymentLinkData {
    title: string;
    description: string;
    first_name: string;
    last_name: string;
    email: string;
    capacity: number;
    active: boolean;
    return_url: string;
    failure_return_url: string;
    processing_fee_percentage: number;
    amount: number;
    amount_currency: string;
    link_type: string;
    enable_tabby: boolean;
    enable_message: boolean;
    enable_tips: boolean;
    save_card: string;
    enable_customer_details: boolean;
    enable_quantity: boolean;
    enable_qr_code: boolean;
    send_customer_receipt: boolean;
    hold_and_charge_later: boolean;
}

const useCreatePaymentLink = () => {
    const [link, setLink] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const createLink = async () => {
        setLoading(true);
        const data: PaymentLinkData = {
            title: "Chocolate Box - Small",
            description: "12pcs Chocolate Box",
            first_name: "Pooya",
            last_name: "Golchian",
            email: "pooya.golchian@gmail.com",
            capacity: 1,
            active: true,
            return_url: "https://myawesomewebsite.com/paymentSuccess",
            failure_return_url: "https://failureurl.com/paymentFailure",
            processing_fee_percentage: 3,
            amount: 119.99,
            amount_currency: "AED",
            link_type: "inline",
            enable_tabby: false,
            enable_message: false,
            enable_tips: false,
            save_card: "off",
            enable_customer_details: false,
            enable_quantity: false,
            enable_qr_code: false,
            send_customer_receipt: false,
            hold_and_charge_later: false
        };

        const config: AxiosRequestConfig = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8010/proxy/manage_api/v1/links',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_MAMO_CREATE_PAYMENT_LINK_API_KEY}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        };

        try {
            const response: AxiosResponse<any> = await axios.request(config);
            setLink(response?.data);
        } catch (error) {
            console.error('Error creating payment link:', error);
        } finally {
            setLoading(false);
        }
    };

    return { link, createLink, loading };
};

export default useCreatePaymentLink;
