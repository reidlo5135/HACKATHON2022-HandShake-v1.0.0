import React,{useEffect,useState} from 'react';
import '../App.css';
import Main from "./Main";
import "../css/food.css"
import {motion} from "framer-motion"
import AOS from "aos";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hlogo from "../img/handshake.png";

export default function Food(){
    const [details, setDetails] = useState([]);

    const getFood = async () => {
        try {
            const response = await fetch(`/api/food/all/`, {method: 'post'});
            const body = await response.json();
            console.log('campusDetail.js getGateDetails response : ', response);
            console.log('campusDetail.js getGateDetails body : ', body);
            setDetails(body);
            console.log('campusDetail.js getGateDetails body : ', details);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        AOS.init();
        getFood();
        console.log(details);
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
            <div className='f-contents'>
                <div className='f-left-contents'>
                <Slider {...settings}>
                
                    
                    {details.map(detail =>{
                                    return (
                                        <div className="f-container">
                                            <div className='food-title' key={1}>
                                                {detail.day}
                                            </div>
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
                                                        <td>{detail.corner1 === undefined? "-"  : detail.corner1}</td>
                                                        <td>{detail.corner2 === undefined? "-" : detail.corner2}</td>
                                                        <td>{detail.corner3 === undefined? "-"  : detail.corner3}</td>
                                                        <td>{detail.corner4 === undefined? "-"  : detail.corner4}</td>
                                                        <td>{detail.corner5 === undefined? "-"  : detail.corner5}</td>
                                                        <td>{detail.corner6 === undefined? "-"  : detail.corner6}</td>
                                                        <td>{detail.PLUS === undefined? "-"  : detail.PLUS}</td>
                                                    </tr>
                                                </tbody>
                                        </table>
                                        </div>
                                    )
                                })
                            }
                
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