import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import Frame from '../components/Frame';
import Input from '../components/Input';
import Button from '../components/Button';
import * as validator from 'email-validator';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isDisableOnSubmit, setIsDisableOnSubmit] = useState(false);
  const [isClickOnSubmit, setIsClickOnSubmit] = useState(false);
  const [isShowMessageErrorPassword, setIsShowMessageErrorPassword] = useState(false);
  const [isShowMessageErrorEmail, setIsShowMessageErrorEmail] = useState(false);
  const [isShowMessageErrorName, setIsShowMessageErrorName] = useState(false);
  const [messageTextError, setMessageTextError] = useState('');

  const navigate = useNavigate();
  const handleLogin = async () => {

    try {
      setIsClickOnSubmit(true)
      setIsShowMessageErrorEmail(false)
      setIsShowMessageErrorPassword(false)
      setIsShowMessageErrorName(false)
      if (name.length < 3) {
        setMessageTextError('Please enter your name correctly')
        setIsShowMessageErrorName(true)
        return
      }
      if (!validator.validate(email)) {
        setMessageTextError('Please enter valid email')
        setIsShowMessageErrorEmail(true)
        return
      }
      if (password.length < 8) {
        setMessageTextError('The minimum password length is 8 characters')
        setIsShowMessageErrorPassword(true)
        return
      }
      setIsDisableOnSubmit(true)
      const response = await axios.post('auth/signup', {name, email, password });
      setIsDisableOnSubmit(false)
      navigate(`/verify/?email=${email}`)
      localStorage.setItem('token', response.data.token);
    } catch (error) {

      console.log(error);
      alert('' + error.response.data);
      setIsDisableOnSubmit(false)
    }
  };


  return (
    <Frame src="./signup.svg" title="Register" isShowBrand={false}>


      <div className='flex flex-col justify-center items-center mt-8 gap-3 w-full'>
        <Input
          label='Name'
          type="text"
          value={name}
          onChange={setName}
          placeholder='Jim'
          isClickOnSubmit={isClickOnSubmit}
          isShowMessageError={isShowMessageErrorName}
          messageTextError={messageTextError}
        />
        <Input
          label='Email'
          type="email"
          value={email}
          onChange={setEmail}
          placeholder='example@gmail.com'
          isClickOnSubmit={isClickOnSubmit}
          isShowMessageError={isShowMessageErrorEmail}
          messageTextError={messageTextError}
        />
        <Input
          label='Password'
          type="password"
          value={password}
          onChange={setPassword}
          placeholder='password'
          isClickOnSubmit={isClickOnSubmit}
          isShowMessageError={isShowMessageErrorPassword}
          messageTextError={messageTextError}
        />

        <Button
        title='Register' 
         onClick={handleLogin}
         disabled={isDisableOnSubmit}
        />
      </div>
    </Frame>

  );
};

export default SignUp;