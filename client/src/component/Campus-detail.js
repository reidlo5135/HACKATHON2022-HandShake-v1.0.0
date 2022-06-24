import React,{useEffect} from 'react';
import '../App.css';
import Main from "./Main";
import "../css/food.css"

import {motion} from "framer-motion"
import AOS from "aos";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Campusdetail(){
    console.log('sex');

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
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
        >
            
            <div className='food-figure1'></div>
            <div className='food-figure2'></div>
            <motion.div 
                initial={{ scale:0 }}
                animate={{ scale:1 ,rotateZ: 360}}
                transition={{ duration: 1,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,}} 
                className="food-tit">
                오늘의 메뉴
            </motion.div>
            <div className='food-figure3'></div>
            <div className='food-figure4'></div>

            <div className='f-contents'>
                <div className='f-left-contents'>
                <Slider {...settings}>
                <div className='day'>월요일</div>
                <div class="container">
                    <table>
                        <thead>
                            <tr>
                                <th>Corner1</th>
                                <th>Corner2</th>
                                <th>Corner3</th>
                                <th>Corner4</th>
                                <th>Corner5</th>
                                <th>Corner6</th>
                                <th>PLUS+</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Cell 1</td>
                                <td>Cell 2</td>
                                <td>Cell 3</td>
                                <td>Cell 4</td>
                                <td>Cell 5</td>
                                <td>Cell 6</td>
                                <td>Cell 7</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </Slider>
                </div>

                <div className='f-right-contents'>
                    <div className="campus-cam">
                        
                    </div>
                </div> 
            </div>     
            
            </motion.div>
        </>
    );
}