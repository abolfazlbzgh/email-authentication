import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import Frame from '../components/Frame';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import * as validator from 'email-validator';
export default function RequestChangePassword() {
    const [email, setEmail] = useState('');
    const [isClickOnSubmit, setIsClickOnSubmit] = useState(false);
    const [isDisableOnSubmit, setIsDisableOnSubmit] = useState(false);
    const [isShowMessageErrorEmail, setIsShowMessageErrorEmail] = useState(false);
    const [messageTextError, setMessageTextError] = useState('');

    const navigate = useNavigate();
    const handle = async () => {
        console.log('email = ', email);
        try {
            setIsClickOnSubmit(true)
            setIsShowMessageErrorEmail(false)
            if (!validator.validate(email)) {
                setMessageTextError('Please enter valid email')
                setIsShowMessageErrorEmail(true)
                return
            }
            setIsDisableOnSubmit(true)
            await axios.post('auth/requestPasswordChange', { email });
            navigate(`/RequestChangePassword/ChangePassword/?email=${email}`)
        } catch (error) {
            setIsDisableOnSubmit(false)
            alert(error.response.data);
            console.log(error);
        }
    };

    return (
        <Frame src="./forgot_password.svg" title="Request Change Password" isSmallImg={true} isShowBrand={false}>

            <div className='flex flex-col justify-center items-center mt-8 gap-3 w-full'>
                <Input
                    label='Enter your email'
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder='example@gmail.com'
                    isClickOnSubmit={isClickOnSubmit}
                    isShowMessageError={isShowMessageErrorEmail}
                    messageTextError={messageTextError}
                />

                <Button
                    title={'Request Change Password'}
                    onClick={handle}
                    disabled={isDisableOnSubmit}
                />
            </div>
        </Frame>
    );
}
