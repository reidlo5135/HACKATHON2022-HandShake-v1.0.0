import React,{useEffect} from 'react';
import '../App.css';
import Main from "./Main";
import "../css/food.css"
import { Link } from "react-router-dom";
import {motion} from "framer-motion"
import AOS from "aos";

export default function Food(){

    useEffect(() => {
        AOS.init();
      }, []);
      
    return (
        <>
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
        >
            <div className="select-tit">
                오늘의 메뉴
            </div>

            
            </motion.div>
        </>
    );
}