import React from 'react'
import Navbar from '../components/Navbar'
import '../styles/Home.css'
import Footer from '../components/Footer';
import Carrusel from '../components/Carrusel';

function  Home() {
  return (
    
   <div>
     <Navbar/>
     <Carrusel/>
    <Footer/>
     
   </div>
  )
}

export default Home
