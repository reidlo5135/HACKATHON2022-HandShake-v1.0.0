import React,{useEffect} from 'react';
import '../App.css';
import "../css/food.css"
import AOS from "aos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation } from 'react-router';
import gateNames from "../data/campusConfig";

export default function CampusDetail(){
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

        </>
    );
}
