import React,{useEffect} from 'react';
import '../App.css';
import "../css/calendar.css"
import {motion} from "framer-motion"
import AOS from "aos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation } from 'react-router';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Calendar(){
    var numbers = []
    for(var i = 1; i < 31; i++) {
		numbers.push(i);
}

  const location = useLocation();
  console.log("location : ",location);
  
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
            
            <div className='calendar-figure1'></div>
            <div className='calendar-figure2'></div>
            <motion.div 
                initial={{ scale:0 }}
                animate={{ scale:1 ,rotateZ: 360}}
                transition={{ duration: 1,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,}} 
                className="calendar-tit">
                오늘의 메뉴
            </motion.div>
            <div className='calendar-figure3'></div>
            <div className='calendar-figure4'></div>

            <div className='C-contents'>
                <div className='C-left-contents'>
                <Slider {...settings}>
                <div className='month'>1월</div>
                <div class="c-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Sun</th>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>28</td>
                                <td>29</td>
                                <td>30</td>
                                <td>31</td>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                                <td>7</td>
                                <td>8</td>
                                <td>9</td>
                                <td>10</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>11</td>
                                <td>12</td>
                                <td>13</td>
                                <td>14</td>
                                <td>15</td>
                                <td>16</td>
                                <td>17</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>18</td>
                                <td>19</td>
                                <td>20</td>
                                <td>21</td>
                                <td>22</td>
                                <td>23</td>
                                <td>24</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>25</td>
                                <td>26</td>
                                <td>27</td>
                                <td>28</td>
                                <td>29</td>
                                <td>30</td>
                                <td>31</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </Slider>
                </div>

                <div className='C-right-contents'>
                    <div className="campus-cam">
                        
                    </div>
                </div> 
            </div>    
            
            </motion.div>
        </>
    );
}