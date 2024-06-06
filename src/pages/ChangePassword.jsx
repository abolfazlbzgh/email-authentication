import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import Frame from '../components/Frame';
import Input from '../components/Input';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function ChangePassword() {
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [isClickOnSubmit, setIsClickOnSubmit] = useState(false);
    const [isDisableOnSubmit, setIsDisableOnSubmit] = useState(false);
    const [isShowMessageErrorToken, setIsShowMessageErrorToken] = useState(false);
    const [isShowMessageErrorPassword, setIsShowMessageErrorPassword] = useState(false);
    const [messageTextError, setMessageTextError] = useState('');
    const location = useLocation();

    // Parse the search query string from location.search
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

    const navigate = useNavigate();

    const handle = async () => {
        console.log('email = ', email);
        try {
            setIsClickOnSubmit(true)
            setIsShowMessageErrorToken(false)
            setIsShowMessageErrorPassword(false)
            if (!token.length) {
                setMessageTextError('Please enter valid token')
                setIsShowMessageErrorToken(true)
                return
            }
            if (password.length < 8) {
                setMessageTextError('The minimum password length is 8 characters')
                setIsShowMessageErrorPassword(true)
                return
            }
            setIsDisableOnSubmit(true)
            await axios.post('auth/changePassword', { email, password, token });
            alert('Password changed successfully. Please login again');
            navigate(`/login`)
        } catch (error) {
            setIsDisableOnSubmit(false)
            alert(error.response.data);
            console.log(error);
        }
    };

    return (
        <Frame src="../../forgot_password.svg" title="Change Password" isSmallImg={true} isShowBrand={false}>

            <div className='flex flex-col justify-center items-center mt-8 gap-3 w-full'>
                <Input
                    label='Token'
                    type="text"
                    value={token}
                    onChange={setToken}
                    placeholder=''
                    isClickOnSubmit={isClickOnSubmit}
                    isShowMessageError={isShowMessageErrorToken}
                    messageTextError={messageTextError}
                />
                <Input
                    label='New Password'
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder=''
                    isClickOnSubmit={isClickOnSubmit}
                    isShowMessageError={isShowMessageErrorPassword}
                    messageTextError={messageTextError}
                />

                <Button
                    title={'Confirm'}
                    onClick={handle}
                    disabled={isDisableOnSubmit}
                />
            </div>
        </Frame>
    );
}
