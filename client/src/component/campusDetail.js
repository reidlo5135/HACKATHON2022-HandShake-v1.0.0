import React, {useEffect, useState} from 'react';
import '../App.css';
import "../css/food.css"
import AOS from "aos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation } from 'react-router';
import gateNames from "../data/campusConfig";

export default function CampusDetail(){
    const [details, setDetails] = useState([]);
    const location = useLocation();
    const gateName = location.state;
    const name = gateNames.get(gateName);

    console.log("location : ", location);
    console.log("gateName : ", gateName);
    console.log("name : ", name);

    const getGateDetails = async () => {
        try {
            const response = await fetch(`/api/campus/gates/details/${name}`, {method: 'post'});
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
        getGateDetails();
    }, []);

    return (
        <>
            {details.map(detail => {
                return(
                    <div key={7}>
                        <h1>{detail.name}</h1>
                        <h2>{detail.f1}</h2>
                        <h2>{detail.f2}</h2>
                        <h2>{detail.f3}</h2>
                        <h2>{detail.f4}</h2>
                        <h2>{detail.f5}</h2>
                        <h2>{detail.f6}</h2>
                        <h2>{detail.f7}</h2>
                    </div>
                )})
            }
        </>
    );
}