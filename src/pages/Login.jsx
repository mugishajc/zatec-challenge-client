import React, { useState, useEffect } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_API_URL } from '../utils/constants';

function Login() {
  const [user, setUser] = useState({});
  const navigate = useNavigate()

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => console.log('Login Failed:', error)
  });
  useEffect(() => {
    if (localStorage.getItem("profile")) {
      navigate("/")
    }
  }, [])
  useEffect(
    () => {
      if (user?.access_token) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            // send to the backend
            axios.post(BACKEND_API_URL + "/users", res.data)
              .then((res) => {
                let { name, email, picture } = res.data.data;
                localStorage.setItem("profile", JSON.stringify({ name, email, picture }));
                navigate("/")
              })
          })
          .catch((err) => console.log(err));
      }
    },
    [user]
  );

  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <button onClick={() => login()} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign in with Google 🚀</button>

    </div >

  )
}

export default Login