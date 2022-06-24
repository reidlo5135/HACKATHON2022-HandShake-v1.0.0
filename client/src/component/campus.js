import React, {useState, useEffect} from 'react';
import '../App.css';
import "../css/campus.css"
import {motion} from "framer-motion"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import gateNames from '../data/campusConfig';
import Ds from "../img/Ds.png";
import Sa from "../img/Sa.png";
import Sh from "../img/Sh.png";
import Ug from "../img/Ug.png";
import Ig from "../img/Ig.png";
import Jd from "../img/Jd.png";
import Jb from "../img/Jb.png";
import Js from "../img/Js.png";
import Tg from "../img/Tg.png";
import Hl from "../img/Hl.png";
import Hg from "../img/Hg.png";
import Hlogo from "../img/handshake.png";

export default function Campus(){

    const [gateName, setGateName] = useState([]);

    const getGateName = async ()=> {
        try {
            const response = await fetch('/api/campus/gates', {method: 'post'});
            const body = await response.json();
            console.log('campus.js getGateName response : ', response);
            console.log('campus.js getGateName body : ', body);
            setGateName(body);
            console.log('gateName : ', gateName);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getGateName();
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
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeOut", duration: 1 }}
            >
                <div className='f-logo'>
                    <img src={Hlogo} alt="handshake 로고" className='h-logo'/>
                </div>

                <div className='contents'>
                    <div className='left-contents'>
                        <div className='campus-slide'>
                            <Slider {...settings}>
                                {gateName.map(user =>{
                                    return (
                                        <Link to={{
                                            pathname: '/gate/details',
                                            state: user.name
                                        }} key={user.id} className="campus-link">
                                            {user.name !== "다산관" ? <></> : <div className={'campus-img'}><p>다산관</p><img src={Ds} alt="다산관" /></div>}
                                            {user.name !== "수암관" ? <></> : <div className={'campus-img'}><div>수암관</div><img src={Sa} alt="수암관"/></div>}
                                            {user.name !== "생활관" ? <></> : <div className={'campus-img'}><div>생활관</div><img src={Sh} alt="생활관"/></div>}
                                            {user.name !== "율곡관" ? <></> : <div className={'campus-img'}><div>율곡관</div><img src={Ug} alt="율곡관"/></div>}
                                            {user.name !== "임곡관" ? <></> : <div className={'campus-img'}><div>임곡관</div><img src={Ig} alt="임곡관"/></div>}
                                            {user.name !== "자동차관" ? <></> : <div className={'campus-img'}><div>자동차관</div><img src={Jd} alt="자동차관"/></div>}
                                            {user.name !== "전산관" ? <></> : <div className={'campus-img'}><div>전산관</div><img src={Js} alt="전산관"/></div>}
                                            {user.name !== "정보통신관" ? <></> : <div className={'campus-img'}><div>정보통신관</div><img src={Jb} alt="정보통신관"/></div>}
                                            {user.name !== "퇴계관" ? <></> : <div className={'campus-img'}><div>퇴계관</div><img src={Tg} alt="퇴계관"/></div>}
                                            {user.name !== "한림관" ? <></> : <div className={'campus-img'}><div>한림관</div><img src={Hl} alt="한림관"/></div>}
                                            {user.name !== "홍지관" ? <></> : <div className={'campus-img'}><div>홍지관</div><img src={Hg} alt="홍지관"/></div>}
                                        </Link>
                                    )
                                })

                                }
                            </Slider>
                        </div>
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
