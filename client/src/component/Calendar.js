import React,{useEffect, useState,useRef} from 'react';
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
import Hlogo from "../img/handshake.png";
import * as tmImage from '@teachablemachine/image';
import Spin from '../img/spin.gif'

const URL = "https://teachablemachine.withgoogle.com/models/DKLnLWS-K/"

export default function Calendar(){
    const [details, setDetails] = useState([]);
    const calRef = useRef();

    let model, webcam, labelContainer, maxPredictions;
    let status = '';
    let temp = 'None';
    let looping = 0;

    var numbers = []
    for(var i = 1; i < 31; i++) {
		numbers.push(i);
    }

    useEffect(()=> {
        init();
    },[])

    function next() {
        
        calRef.current.slickNext();
    }
    
    function back() {
    
        calRef.current.slickPrev();
    }

    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(500, 500, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        console.log("캠 로딩 완료")
        
        window.requestAnimationFrame(loop);
        // next, back, past
        let interval = setInterval(()=> {
            let redbull = status;
            console.log(looping)
            if (temp !== redbull) {
              console.log("이전값과 다릅니다.")
              looping = 0;
              temp = redbull;
            } else {
              if (looping === 3) {
                
                console.log("선택값은 " +redbull)
                if (redbull === 'Past') {
                    window.location.href = "/selectTest"
                } else if (redbull === 'Next') {
                    next();
                } else if (redbull === 'Back') {
                    back();
                }
                looping = 0;
              } else {
                looping++;
              }
              
            }
          },1000)
    
        
        document.getElementById("webcam-container").innerHTML = '';
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update();
        await predict();
        window.requestAnimationFrame(loop);
    }



   
    async function predict() {
        
        const prediction = await model.predict(webcam.canvas);
        let max = 0.0;
        let maxValue = '';
        for (let i = 0; i < maxPredictions; i++) {
            if (prediction[i].probability.toFixed(2) * 100 >= max) {
              max = prediction[i].probability.toFixed(2) * 100
              maxValue = prediction[i].className;
            }
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2) * 100;
            
        }
        status = maxValue;
        
       
    }

  const location = useLocation();
  console.log("location : ",location);
  
  const getSchedules = async () => {
    try {
        const response = await fetch('/api/schedule/all', {method: 'post'});
        const body = await response.json();
        console.log('calendar.js getSchedules response : ', response);
        console.log('calendar.js getSchedules body : ', body);
        setDetails(body);
        console.log('calendar.js getSchedules body : ', details);
    } catch (error) {
        console.error(error);
    }
}

useEffect(() => {
    AOS.init();
    getSchedules();
}, []);

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 2
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
        
            <div className='C-contents'>
                <div className='C-left-contents'>
                <Slider ref={calRef} {...settings}>
                
                <div className='month'>3월</div>
                <div className="c-container">
                    <table className='tc-table'>
                        <thead className='c-thead'>
                            <tr className='c-tr'>
                                <th className='c-th'>Sun</th>
                                <th className='c-th'>Mon</th>
                                <th className='c-th'>Tue</th>
                                <th className='c-th'>Wed</th>
                                <th className='c-th'>Thu</th>
                                <th className='c-th'>Fri</th>
                                <th className='c-th'>Sat</th>
                            </tr>
                        </thead>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>28</td>
                                <td className='c-td'>29</td>
                                <td className='c-td'>30</td>
                                <td className='c-td'>31</td>
                                <td className='c-td'>1 {details.map(detail => {return(<><div className='cl-desc' >{detail.d1 === undefined  ? <></> : <h2 className={'cl-d1'}>{detail.d1}</h2>}</div></>)})}</td>
                                <td className='c-td'>2</td>
                                <td className='c-td'>3</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody' >
                            <tr className='c-t4'>
                                <td className='c-td'>4</td>
                                <td className='c-td'>5</td>
                                <td className='c-td'>6{details.map(detail => {return(<><div className='cl-desc' >{detail.d6 === undefined  ? <></> : <h2 className={'cl-d6'}>{detail.d6}</h2>}</div></>)})}</td>
                                <td className='c-td'>7</td>
                                <td className='c-td'>8{details.map(detail => {return(<><div className='cl-desc' >{detail.d8 === undefined  ? <></> : <h2 className={'cl-d8'}>{detail.d8}</h2>}</div></>)})}</td>
                                <td className='c-td'>9{details.map(detail => {return(<><div className='cl-desc' >{detail.d9 === undefined  ? <></> : <h2 className={'cl-d9'}>{detail.d9}</h2>}</div></>)})}</td>
                                <td className='c-td'>10{details.map(detail => {return(<><div className='cl-desc' >{detail.d10 === undefined  ? <></> : <h2 className={'cl-d10'}>{detail.d10}</h2>}</div></>)})}</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>11</td>
                                <td className='c-td'>12</td>
                                <td className='c-td'>13{details.map(detail => {return(<><div className='cl-desc' >{detail.d13 === undefined  ? <></> : <h2 className={'cl-d13'}>{detail.d13}</h2>}</div></>)})}</td>
                                <td className='c-td'>14{details.map(detail => {return(<><div className='cl-desc' >{detail.d14 === undefined  ? <></> : <h2 className={'cl-d14'}>{detail.d14}</h2>}</div></>)})}</td>
                                <td className='c-td'>15{details.map(detail => {return(<><div className='cl-desc' >{detail.d15 === undefined  ? <></> : <h2 className={'cl-d15'}>{detail.d15}</h2>}</div></>)})}</td>
                                <td className='c-td'>16{details.map(detail => {return(<><div className='cl-desc' >{detail.d16 === undefined  ? <></> : <h2 className={'cl-d16'}>{detail.d16}</h2>}</div></>)})}</td>
                                <td className='c-td'>17{details.map(detail => {return(<><div className='cl-desc' >{detail.d17 === undefined  ? <></> : <h2 className={'cl-d17'}>{detail.d17}</h2>}</div></>)})}</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>18</td>
                                <td className='c-td'>19</td>
                                <td className='c-td'>20</td>
                                <td className='c-td'>21{details.map(detail => {return(<><div className='cl-desc' >{detail.d21 === undefined  ? <></> : <h2 className={'cl-d21'}>{detail.d21}</h2>}</div></>)})}</td>
                                <td className='c-td'>22{details.map(detail => {return(<><div className='cl-desc' >{detail.d22 === undefined  ? <></> : <h2 className={'cl-d22'}>{detail.d22}</h2>}</div></>)})}</td>
                                <td className='c-td'>23{details.map(detail => {return(<><div className='cl-desc' >{detail.d23 === undefined  ? <></> : <h2 className={'cl-d23'}>{detail.d23}</h2>}</div></>)})}</td>
                                <td className='c-td'>24{details.map(detail => {return(<><div className='cl-desc' >{detail.d24 === undefined  ? <></> : <h2 className={'cl-d24'}>{detail.d24}</h2>}</div></>)})}</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>25</td>
                                <td className='c-td'>26</td>
                                <td className='c-td'>27{details.map(detail => {return(<><div className='cl-desc' >{detail.d27 === undefined  ? <></> : <h2 className={'cl-d27'}>{detail.d27}</h2>}</div></>)})}</td>
                                <td className='c-td'>28{details.map(detail => {return(<><div className='cl-desc' >{detail.d28 === undefined  ? <></> : <h2 className={'cl-d28'}>{detail.d28}</h2>}</div></>)})}</td>
                                <td className='c-td'>29{details.map(detail => {return(<><div className='cl-desc' >{detail.d29 === undefined  ? <></> : <h2 className={'cl-d29'}>{detail.d29}</h2>}</div></>)})}</td>
                                <td className='c-td'>30{details.map(detail => {return(<><div className='cl-desc' >{detail.d30 === undefined  ? <></> : <h2 className={'cl-d30'}>{detail.d30}</h2>}</div></>)})}</td>
                                <td className='c-td'>31</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='month'>4월</div>
                <div className="c-container">
                    <table className='tc-table'>
                        <thead className='c-thead'>
                            <tr className='c-tr'>
                                <th className='c-th'>Sun</th>
                                <th className='c-th'>Mon</th>
                                <th className='c-th'>Tue</th>
                                <th className='c-th'>Wed</th>
                                <th className='c-th'>Thu</th>
                                <th className='c-th'>Fri</th>
                                <th className='c-th'>Sat</th>
                            </tr>
                        </thead>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>28</td>
                                <td className='c-td'>29</td>
                                <td className='c-td'>30</td>
                                <td className='c-td'>31</td>
                                <td className='c-td'>1 </td>
                                <td className='c-td'>2</td>
                                <td className='c-td'>3</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody' >
                            <tr className='c-t4'>
                                <td className='c-td'>4</td>
                                <td className='c-td'>5</td>
                                <td className='c-td'>6</td>
                                <td className='c-td'>7</td>
                                <td className='c-td'>8</td>
                                <td className='c-td'>9</td>
                                <td className='c-td'>10</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>11</td>
                                <td className='c-td'>12</td>
                                <td className='c-td'>13<div className='cl-desc' >22학년도 제 4회 교무회의</div></td>
                                <td className='c-td'>14</td>
                                <td className='c-td'>15</td>
                                <td className='c-td'>16</td>
                                <td className='c-td'>17</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>18</td>
                                <td className='c-td'>19</td>
                                <td className='c-td'>20<div className='cl-desc' >1학기 중간고사</div></td>
                                <td className='c-td'>21<div className='cl-desc' >1학기 중간고사</div></td>
                                <td className='c-td'>22<div className='cl-desc' >1학기 중간고사</div></td>
                                <td className='c-td'>23</td>
                                <td className='c-td'>24</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>25<div className='cl-desc' >1학기 중간고사</div></td>
                                <td className='c-td'>26<div className='cl-desc' >1학기 중간고사</div></td>
                                <td className='c-td'>27<div className='cl-desc' >2022학년도 제 5회 교무회의</div></td>
                                <td className='c-td'>28</td>
                                <td className='c-td'>29</td>
                                <td className='c-td'>30</td>
                                <td className='c-td'>31</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='month'>5월</div>
                <div className="c-container">
                    <table className='tc-table'>
                        <thead className='c-thead'>
                            <tr className='c-tr'>
                                <th className='c-th'>Sun</th>
                                <th className='c-th'>Mon</th>
                                <th className='c-th'>Tue</th>
                                <th className='c-th'>Wed</th>
                                <th className='c-th'>Thu</th>
                                <th className='c-th'>Fri</th>
                                <th className='c-th'>Sat</th>
                            </tr>
                        </thead>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>28</td>
                                <td className='c-td'>29</td>
                                <td className='c-td'>30</td>
                                <td className='c-td'>31</td>
                                <td className='c-td'>1 <div className='cl-desc'>근로자의 날</div></td>
                                <td className='c-td'>2</td>
                                <td className='c-td'>3</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody' >
                            <tr className='c-t4'>
                                <td className='c-td'>4</td>
                                <td className='c-td'>5<div className='cl-desc' >어린이날</div></td>
                                <td className='c-td'>6</td>
                                <td className='c-td'>7</td>
                                <td className='c-td'>8<div className='cl-desc' >석가탄신일</div></td>
                                <td className='c-td'>9</td>
                                <td className='c-td'>10</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>11<div className='cl-desc' >22학년도 제 6회 교무회의</div></td>
                                <td className='c-td'>12</td>
                                <td className='c-td'>13</td>
                                <td className='c-td'>14</td>
                                <td className='c-td'>15</td>
                                <td className='c-td'>16</td>
                                <td className='c-td'>17</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>18</td>
                                <td className='c-td'>19</td>
                                <td className='c-td'>20</td>
                                <td className='c-td'>21</td>
                                <td className='c-td'>22</td>
                                <td className='c-td'>23</td>
                                <td className='c-td'>24</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>25<div className='cl-desc' >22학년도 제 7회 교무회의</div></td>
                                <td className='c-td'>26</td>
                                <td className='c-td'>27<div className='cl-desc' >임곡축제</div></td>
                                <td className='c-td'>28</td>
                                <td className='c-td'>29</td>
                                <td className='c-td'>30</td>
                                <td className='c-td'>31</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='month'>6월</div>
                <div className="c-container">
                    <table className='tc-table'>
                        <thead className='c-thead'>
                            <tr className='c-tr'>
                                <th className='c-th'>Sun</th>
                                <th className='c-th'>Mon</th>
                                <th className='c-th'>Tue</th>
                                <th className='c-th'>Wed</th>
                                <th className='c-th'>Thu</th>
                                <th className='c-th'>Fri</th>
                                <th className='c-th'>Sat</th>
                            </tr>
                        </thead>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>28</td>
                                <td className='c-td'>29</td>
                                <td className='c-td'>30</td>
                                <td className='c-td'>31</td>
                                <td className='c-td'>1 {details.map(detail => {return(<><div className='cl-desc' >{detail.d1 === undefined  ? <></> : <h2 className={'cl-d1'}>{detail.d1}</h2>}</div></>)})}</td>
                                <td className='c-td'>2</td>
                                <td className='c-td'>3</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody' >
                            <tr className='c-t4'>
                                <td className='c-td'>4</td>
                                <td className='c-td'>5</td>
                                <td className='c-td'>6{details.map(detail => {return(<><div className='cl-desc' >{detail.d6 === undefined  ? <></> : <h2 className={'cl-d6'}>{detail.d6}</h2>}</div></>)})}</td>
                                <td className='c-td'>7</td>
                                <td className='c-td'>8{details.map(detail => {return(<><div className='cl-desc' >{detail.d8 === undefined  ? <></> : <h2 className={'cl-d8'}>{detail.d8}</h2>}</div></>)})}</td>
                                <td className='c-td'>9{details.map(detail => {return(<><div className='cl-desc' >{detail.d9 === undefined  ? <></> : <h2 className={'cl-d9'}>{detail.d9}</h2>}</div></>)})}</td>
                                <td className='c-td'>10{details.map(detail => {return(<><div className='cl-desc' >{detail.d10 === undefined  ? <></> : <h2 className={'cl-d10'}>{detail.d10}</h2>}</div></>)})}</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>11</td>
                                <td className='c-td'>12</td>
                                <td className='c-td'>13{details.map(detail => {return(<><div className='cl-desc' >{detail.d13 === undefined  ? <></> : <h2 className={'cl-d13'}>{detail.d13}</h2>}</div></>)})}</td>
                                <td className='c-td'>14{details.map(detail => {return(<><div className='cl-desc' >{detail.d14 === undefined  ? <></> : <h2 className={'cl-d14'}>{detail.d14}</h2>}</div></>)})}</td>
                                <td className='c-td'>15{details.map(detail => {return(<><div className='cl-desc' >{detail.d15 === undefined  ? <></> : <h2 className={'cl-d15'}>{detail.d15}</h2>}</div></>)})}</td>
                                <td className='c-td'>16{details.map(detail => {return(<><div className='cl-desc' >{detail.d16 === undefined  ? <></> : <h2 className={'cl-d16'}>{detail.d16}</h2>}</div></>)})}</td>
                                <td className='c-td'>17{details.map(detail => {return(<><div className='cl-desc' >{detail.d17 === undefined  ? <></> : <h2 className={'cl-d17'}>{detail.d17}</h2>}</div></>)})}</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>18</td>
                                <td className='c-td'>19</td>
                                <td className='c-td'>20</td>
                                <td className='c-td'>21{details.map(detail => {return(<><div className='cl-desc' >{detail.d21 === undefined  ? <></> : <h2 className={'cl-d21'}>{detail.d21}</h2>}</div></>)})}</td>
                                <td className='c-td'>22{details.map(detail => {return(<><div className='cl-desc' >{detail.d22 === undefined  ? <></> : <h2 className={'cl-d22'}>{detail.d22}</h2>}</div></>)})}</td>
                                <td className='c-td'>23{details.map(detail => {return(<><div className='cl-desc' >{detail.d23 === undefined  ? <></> : <h2 className={'cl-d23'}>{detail.d23}</h2>}</div></>)})}</td>
                                <td className='c-td'>24{details.map(detail => {return(<><div className='cl-desc' >{detail.d24 === undefined  ? <></> : <h2 className={'cl-d24'}>{detail.d24}</h2>}</div></>)})}</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>25</td>
                                <td className='c-td'>26</td>
                                <td className='c-td'>27{details.map(detail => {return(<><div className='cl-desc' >{detail.d27 === undefined  ? <></> : <h2 className={'cl-d27'}>{detail.d27}</h2>}</div></>)})}</td>
                                <td className='c-td'>28{details.map(detail => {return(<><div className='cl-desc' >{detail.d28 === undefined  ? <></> : <h2 className={'cl-d28'}>{detail.d28}</h2>}</div></>)})}</td>
                                <td className='c-td'>29{details.map(detail => {return(<><div className='cl-desc' >{detail.d29 === undefined  ? <></> : <h2 className={'cl-d29'}>{detail.d29}</h2>}</div></>)})}</td>
                                <td className='c-td'>30{details.map(detail => {return(<><div className='cl-desc' >{detail.d30 === undefined  ? <></> : <h2 className={'cl-d30'}>{detail.d30}</h2>}</div></>)})}</td>
                                <td className='c-td'>31</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </Slider>
                </div>

                <div className='C-right-contents'>
                    <div id="webcam-container">
                        <img src={Spin}/>
                    </div>
                </div> 
            </div>    
            
            </motion.div>
        </>
    );
}