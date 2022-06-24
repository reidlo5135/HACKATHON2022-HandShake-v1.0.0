import React, {useState, useEffect} from 'react';
import '../App.css';
import "../css/campus.css"
import {motion} from "framer-motion"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export default function Campus(){
    const [gateName, setGateName] = useState([]);

    const getGateName = async ()=> {
        try {
            const response = await fetch('/api/campus/gates', {method: 'post'});
            const body = await response.json();
            console.log('campus.js response : ', response);
            console.log('campus.js body : ', body);
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
                        <div className='campus-slide'>
                            <Slider {...settings}>

                                {gateName.map(user => {
                                    return (
                                        <Link to={{
                                            pathname: '/gate/details',
                                            state: user.name
                                        }} key={user.id}>
                                            <div>
                                                {user.name}
                                            </div>
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
