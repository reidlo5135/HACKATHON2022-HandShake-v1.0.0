import React,{useEffect} from 'react';
import '../App.css';
import Main from "./Main";
import "../css/food.css"

import {motion} from "framer-motion"
import AOS from "aos";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation } from 'react-router';

export default function Campusdetail(){
  const location = useLocation();
  console.log("location : ",location);
  
    useEffect(() => {
        AOS.init();
      }, []);

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      
    return (
        <>
        
        </>
    );
}