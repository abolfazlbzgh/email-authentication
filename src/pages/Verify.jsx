import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import Input from '../components/Input';
import Frame from '../components/Frame';
import { useLocation ,useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Verify = () => {
  const location = useLocation();

  // Parse the search query string from location.search
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  const [code, setCode] = useState('');
  const [isClickOnSubmit, setIsClickOnSubmit] = useState(false);
  const [isDisableOnSubmit, setIsDisableOnSubmit] = useState(false);
  const [isShowMessageErrorCode, setIsShowMessageErrorCode] = useState(false);
  const [messageTextError, setMessageTextError] = useState('');

  const navigate = useNavigate();
  const handleVerify = async () => {
    console.log('email = ' , email);
    try {
      setIsClickOnSubmit(true)
      setIsShowMessageErrorCode(false)
      if (!code.length) {
        setMessageTextError('Please enter valid code')
        setIsShowMessageErrorCode(true)
        return
      }
      setIsDisableOnSubmit(true)
      const response = await axios.post('auth/verify', { email, code });
      localStorage.setItem('token', response.data.token);
      navigate('/')
      // alert('Email verified successfully');
    } catch (error) {
      setIsDisableOnSubmit(false)
      alert(error.response.data);
      console.log(error);
    }
  };

  return (
    <Frame src="../verify.svg" title="Verify" isSmallImg={true} isShowBrand={true}>

      <div className='flex flex-col justify-center items-center mt-8 gap-3 w-full'>
        <Input
          label='Enter verification code'
          type="text"
          value={code}
          onChange={setCode}
          placeholder='123456'
          isClickOnSubmit={isClickOnSubmit}
          isShowMessageError={isShowMessageErrorCode}
          messageTextError={messageTextError}
        />

        <Button
          title={'Verify'}
          onClick={handleVerify}
          disabled={isDisableOnSubmit}
        />
      </div>
    </Frame>
  );
};

export default Verify;