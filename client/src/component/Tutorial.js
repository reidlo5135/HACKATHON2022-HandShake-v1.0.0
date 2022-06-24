import React from 'react';
import '../App.css';
import {Route, Switch} from 'react-router-dom';
import Main from "./Main";
import Select from "./Select";
import "../css/tutorial.css"
import { Link } from "react-router-dom";
import {motion} from "framer-motion"

export default function Tutorial(){
    return (
        <>
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
        >
        <motion.div 
            initial={{ scale:0 }}
            animate={{ scale:1 ,rotateZ: 360}}
            transition={{ duration: 1,
                type: "spring",
                stiffness: 260,
                damping: 20,}} 
            className="tuto-title">
            TUTORIAL
        </motion.div>
        <div className="tutorial-cam">
            
        </div>
        
        <div className="square">
            <div className="square1"></div>
            <div className="square2"></div>
            <div className="square3"></div>
        </div>

        <div className="tuto-desc">
            <span>캠 화면을 통해 수어를 인식합니다</span><br/>
            <span>수어로 질문해 주세요!</span>
        </div>

        <Link to="/select">
            <div className="skip">
                <button className="btn-skip">
                    넘어가기
                </button>
            </div>
        </Link>
        </motion.div>
        </>
    );
}