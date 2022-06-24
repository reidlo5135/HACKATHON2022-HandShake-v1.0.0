import React,{useEffect} from 'react';
import '../App.css';
import "../css/select.css"
import { Link } from "react-router-dom";
import Campus from "../img/campus.png"
import Food from "../img/food.png"
import Calender from "../img/calender.png"
import {motion} from "framer-motion"
import AOS from "aos";

export default function Select(){

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
                    SELECT
                </div>

                <div className="select">
                    <div className="left-content">
                        <div className='one'>
                            <span>A</span>
                            <Link to="/campus">
                                <div className="campus btn-selcet">
                                    <img src={Campus} alt="캠퍼스 아이콘" />
                                </div>
                            </Link>
                        </div>

                        <div className='two'>
                            <span>B</span>
                            <Link to="/food">
                                <div className="food btn-selcet">
                                    <img src={Food} alt="오늘의 메뉴 아이콘"/>
                                </div>
                            </Link>
                        </div>

                        <div className='three'>
                            <span>C</span>
                            <div className="calender btn-selcet">
                                <img src={Calender} alt="학사 일정 아이콘"/>
                            </div>
                        </div>

                        <div className='three'>
                            <span>D</span>
                            <div className="facility btn-selcet">
                                <img src={Food} alt="오늘의 메뉴 아이콘"/>
                            </div>
                        </div>
                    </div>

                    <div className="right-content">
                        <div className="cam">

                        </div>
                    </div>
                </div>
                <div className="square">
                    <motion.div className="square1"
                                initial={{ scale:0 }}
                                animate={{ scale:1 ,rotateZ: 200}}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1,
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20, }}
                    />
                    <motion.div className="square2"
                                initial={{ scale:0 }}
                                animate={{ scale:1 ,rotateZ: 150}}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1,
                                    type: "spring",
                                    stiffness: 290,
                                    damping: 20, }}/>
                    <motion.div className="square3"
                                initial={{ scale:0 }}
                                animate={{ scale:1,rotateZ: 160}}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1,
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 10, }}/>
                </div>
                <div className="tuto-desc">
                    <span>캠 화면을 통해 수어를 인식합니다</span><br/>
                    <span>수어로 선택해 주세요!</span>
                </div>
            </motion.div>
        </>
    );
}