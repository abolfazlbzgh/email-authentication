import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import Button from '../components/Button';
import Frame from '../components/Frame';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token || token.length < 20) {
      navigate("/login");
      return
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('auth/me', {
          headers: { Authorization: `Bearer ${token}` }, // Include token in header
        });
        console.log(response.data.user);
        setData(response.data.user);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 


  const handle = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }
  return (
    <Frame src="./home.svg" title="Home" isSmallImg={true} isShowBrand={true}>

      <div className='flex justify-center items-center w-full'>
        <div>

          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && (
            <div className='flex flex-col justify-center items-center'>
              <div className={`w-full justify-center  items-center `} >
                <img src={'./profile.png'} alt="img" className={`mx-auto object-cover h-44`} />
              </div>
              <h1 className='text-3xl font-bold'>Hi {data.name}</h1>
              <h1 className='text-xl font-normal mb-5'>{data.email}</h1>
              <Button
                title={'Sign out'}
                onClick={handle}
              />
            </div>
          )}
        </div>

      </div>
    </Frame>
  )
}
