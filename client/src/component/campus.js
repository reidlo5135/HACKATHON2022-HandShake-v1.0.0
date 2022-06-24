import React from 'react';
import '../App.css';
import {Route, Switch} from 'react-router-dom';
import Main from "./Main";
import Select from "./Select";
import "../css/campus.css"
import { Link } from "react-router-dom";
import {motion} from "framer-motion"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Campus(){
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return (
        <>
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
        >
        
        <div className='campus-title'>
        <div className='campus-figure1'></div>
        <div className='campus-figure2'></div>
        <motion.div 
            initial={{ scale:0 }}
            animate={{ scale:1 ,rotateZ: 360}}
            transition={{ duration: 1,
                type: "spring",
                stiffness: 260,
                damping: 20,}} 
            className="campus-tit">
            캠퍼스맵
        </motion.div>
        <div className='campus-figure3'></div>
        <div className='campus-figure4'></div>
        </div>
        <div className='contents'>
            <div className='left-contents'>
                <Slider {...settings}>
                    <div>
                        <h3>홍지관</h3>
                    </div>
                    <div>
                        <h3>한림관</h3>
                    </div>
                    <div>
                        <h3>정보통신관</h3>
                    </div>
                    <div>
                        <h3>수암관</h3>
                    </div>
                    <div>
                        <h3>다산관</h3>
                    </div>
                    <div>
                        <h3>전산관</h3>
                    </div>
                    <div>
                        <h3>임곡관</h3>
                    </div>
                    <div>
                        <h3>율곡관</h3>
                    </div>
                    <div>
                        <h3>퇴계관</h3>
                    </div>
                </Slider>
            </div>
        <div className='right-contents'>
            <div className="campus-cam">
                
            </div>
        </div>
        </div>

        <div className="tuto-desc">
            <span>캠 화면을 통해 수어를 인식합니다</span><br/>
            <span>원하시는 위치로 넘겨보세요!</span>
        </div>
        </motion.div>
        </>
    );
}
