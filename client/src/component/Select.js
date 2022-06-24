import React from 'react';
import '../App.css';
import Main from "./Main";
import "../css/select.css"
import { Link } from "react-router-dom";
import Campus from "../img/campus.png"
import Food from "../img/food.png"
import Calender from "../img/calender.png"
import One from "../img/one 1.png"
import Two from "../img/two.png"
import Three from "../img/three.png"
import Four from "../img/four.png"

export default function Select(){
    return (
        <>
            <div class="select-tit">
                SELECT
            </div>

            <div class="select">
                <div class="left-content">
                    <div className='one'>
                        <img src={One} alt="1번" style={{width: "40px",height: "50px"}}/>
                        <div class="campus btn-selcet">
                            <img src={Campus} alt="캠퍼스 아이콘" /> 
                        </div>
                    </div>

                    <div className='two'>
                        <img src={Two} alt="2번" style={{width: "40px",height: "50px"}}/>
                        <div class="food btn-selcet">
                            <img src={Food} alt="오늘의 메뉴 아이콘"/>  
                        </div>
                    </div>

                    <div className='three'>
                        <img src={Three} alt="3번" style={{width: "40px",height: "50px"}}/>
                        <div class="calender btn-selcet">
                            <img src={Calender} alt="학사 일정 아이콘"/> 
                        </div>
                    </div>

                    <div className='three'>
                        <img src={Four} alt="4번" style={{width: "40px",height: "50px"}}/>
                        <div class="facility btn-selcet">
                            <img src={Food} alt="오늘의 메뉴 아이콘"/> 
                        </div>
                        </div>
                    </div>
                
                <div class="square">
                    <div class="square1"></div>
                    <div class="square2"></div>
                    <div class="square3"></div>
                </div>

                <div class="right-content">
                    <div class="cam">

                    </div>
                </div>  
            </div>
            <div class="tuto-desc">
                <span>캠 화면을 통해 수어를 인식합니다</span><br/>
                <span>수어로 선택해 주세요!</span>
            </div>
        </>
    );
}