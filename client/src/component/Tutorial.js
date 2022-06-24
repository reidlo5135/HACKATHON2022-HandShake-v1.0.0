import React from 'react';
import '../App.css';
import {Route, Switch} from 'react-router-dom';
import Main from "./Main";
import Select from "./Select";
import "../css/tutorial.css"
import { Link } from "react-router-dom";

export default function Tutorial(){
    return (
        <>
        <div className="tuto-title">
            TUTORIAL
        </div>
        <div className="sign-cam">
            
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
        </>
    );
}