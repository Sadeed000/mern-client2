import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import axios from 'axios';
import { useAuth } from './contextNew/auth';

function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)
  const [ auth , setAuth] = useAuth()
// console.log(auth)
// console.log(auth)
// console.log(auth)

  const fetchUserDetails = async()=>{
  //   const response = await axios({
  //     url: 'http://localhost:8080/api/user-details', // replace with your API endpoint
  //     method: 'GET', // or 'POST', 'PUT', etc.
  //     withCredentials: true, // Include credentials
  //   }
  // );

    // const dataApi = response?.data;

    // if(dataApi.success){
    //   dispatch(setUserDetails(dataApi.data))
    // }
}

  const fetchUserAddToCart = async()=>{
    const response = await axios.get(`http://localhost:8080/api/countAddToCartProduct`, {

    withCredentials: true,
  });
    // console.log(response)
    const dataApi =  response

    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
     fetchUserAddToCart()

  },[])
  return (
    <>
      <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart
      }}>
        <ToastContainer 
          position='top-center'
        />
        
        <Header/>
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet/>
        </main>
        <Footer/>
      </Context.Provider>
    </>
  );
}

export default App;
