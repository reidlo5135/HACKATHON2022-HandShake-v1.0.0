import React from 'react';
import '../App.css';
import {Route, Switch} from 'react-router-dom';
import Tutorial from "./Tutorial.js";
import Select from "./Select";
import "../css/main.css"
import { Link } from "react-router-dom";
import LOGO from "../img/DL-LOGO.png"
import Sign from "../img/signlanguage.png"

export default function Main(){
    return (
        <>
        <div className="dl-logo">
        <img src={LOGO} alt="대림대학교 로고" style={{width:"230px",height: "130px"}}/>
        </div>
        <div className="content">
            <div className="left-cont">
                <div className="main-tit">
                    DL-SIGNAL
                </div>
                <div className="main-desc">
                    <span>수어로 만나는</span><br/>
                    <span>대림대학교</span>
                </div>
                <div className="button">
                    <Link to="/tutorial">
                        <button className="btn-start">
                            시작하기
                        </button>
                    </Link>
                </div>
            </div>

            <div className="right-cont">
                <img src={Sign} alt="수화 일러스트" style={{width: "600px",height: "600px"}}/>
            </div>
        </div>
        </>
    );
}