import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Frame from '../components/Frame';
import Input from '../components/Input';
import * as validator from 'email-validator';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isClickOnSubmit, setIsClickOnSubmit] = useState(false);
  const [isShowMessageErrorPassword, setIsShowMessageErrorPassword] = useState(false);
  const [isShowMessageErrorEmail, setIsShowMessageErrorEmail] = useState(false);
  const [messageTextError, setMessageTextError] = useState('');
  const [isDisableOnSubmit, setIsDisableOnSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for saved email and password
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedRememberMe) {
      setEmail(savedEmail || '');
      setPassword(savedPassword || '');
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
      }
      setIsClickOnSubmit(true)
      setIsShowMessageErrorEmail(false)
      setIsShowMessageErrorPassword(false)
      if (!validator.validate(email)) {
        setMessageTextError('Please enter valid email')
        setIsShowMessageErrorEmail(true)
        return
      }
      if (!password.length) {
        setMessageTextError('Please enter password')
        setIsShowMessageErrorPassword(true)
        return
      }
      setIsDisableOnSubmit(true)
      
      const response = await axios.post('auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/')
    } catch (error) {
      setIsDisableOnSubmit(false)
      alert('' + error.response.data);
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log('Google login success:', response);
    // Implement your logic to handle Google login success
  };

  const handleGoogleLoginFailure = (error) => {
    console.log('Google login failure:', error);
    // Handle failure cases
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Frame src="./login.svg" title="Welcome" isShowBrand={true}>

        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
          render={({ onClick, disabled }) => (
            <div onClick={onClick} disabled={disabled}>
            </div>
          )}
        />

        <div className='flex justify-center items-center mb-4'>
          <div className='w-full h-[1px] rounded-full bg-gray-300'></div>
          <h4 className='mx-9'>OR</h4>
          <div className='w-full h-[1px] rounded-full bg-gray-300'></div>
        </div>

        <div className='flex flex-col justify-center items-center gap-3 w-full'>
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
          <div className="flex justify-between w-full items-start">
            <div className='flex items-center'>
              <div className="flex items-center  h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  name="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 accent-primary  bg-gray-50 border-gray-300 rounded focus:ring-primary  transition-all"
                />
              </div>
              <div className="ms-3 text-sm">
                <label htmlFor="remember" className="font-medium text-sm text-gray-900">
                  Remember me
                </label>
              </div>
            </div>
            <Link to="/requestChangePassword" className="ms-auto text-sm font-medium text-primary hover:underline">Forget Password?</Link>
          </div>

          <Button
            title={'Log In'}
            disabled={isDisableOnSubmit}
            onClick={handleLogin}
          />

          <div className='flex items-center '>
            <span className='text-black text-sm font-medium mr-2'>Don’t have an account?</span> <Link to="/signup" class="ms-auto text-sm font-medium  text-primary hover:underline">Register</Link>
          </div>
        </div>
      </Frame>

    </GoogleOAuthProvider>
  );
};

export default Login;