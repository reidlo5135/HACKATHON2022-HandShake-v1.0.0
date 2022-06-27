import React,{useEffect,useState,useRef} from 'react';
import '../App.css';
import Main from "./Main";
import "../css/food.css"
import {motion} from "framer-motion"
import AOS, { init } from "aos";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hlogo from "../img/handshake.png";
import * as tmImage from '@teachablemachine/image';
import Spin from '../img/spin.gif'

const URL = "https://teachablemachine.withgoogle.com/models/DKLnLWS-K/"

export default function Food(){
    const [details, setDetails] = useState([]);

    const foodRef = useRef();

    useEffect(()=> {
        init();
    },[])

    function next() {
        
        foodRef.current.slickNext();
    }
    
    function back() {
    
        foodRef.current.slickPrev();
    }

    let model, webcam, labelContainer, maxPredictions;
    let status = '';
    let temp = 'None';
    let looping = 0;

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
                <Slider ref={foodRef} {...settings}>
                
                    
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
                    {/* <div className="campus-cam"> */}
                    <div id="webcam-container">
                        <img src={Spin}/>
                    </div>
                    {/* </div> */}
                </div> 
            </div>     
            
            </motion.div>
        </>
    );
}