import React, {useEffect, useState} from 'react';
import '../App.css';
import "../css/campusdetail.css"
import AOS from "aos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation } from 'react-router';
import gateNames from "../data/campusConfig";
import Hlogo from "../img/handshake.png";

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
        <div className='top'>
            <div className='cd-title'>
                {gateName}
            </div>
            <div className='cd-logo'>
                <img src={Hlogo} alt="handshake 로고" className='h-logo'/>
            </div>
        </div>
        
        <div className='cd-contents'>
            <div className='cd-left-contents'>
                {details.map(detail => {
                    return(
                        <>       
                        <div className='cd-desc' >
                            {detail.fb1 === null ? null : <h2 className={'dc-fb1'}>{detail.fb1}</h2>}
                            {detail.f1 === null ? null : <h2 className={'dc-f1'}>{detail.f1}</h2>}
                            {detail.f === null ? null : <h2 className={'dc-f2'}>{detail.f2}</h2>}
                            {detail.f3 === null ? null : <h2 className={'dc-f3'}>{detail.f3}</h2>}
                            {detail.f4 === null ? null : <h2 className={'dc-f4'}>{detail.f4}</h2>}
                            {detail.f5 === null ? null : <h2 className={'dc-f5'}>{detail.f5}</h2>}
                            {detail.f6 === null ? null : <h2 className={'dc-f6'}>{detail.f6}</h2>}
                            {detail.f7 === null ? null : <h2 className={'dc-f7'}>{detail.f7}</h2>}
                            {/* {detail.map} */}
                        </div>           
                        </>
                    )})
                }
                </div>
                <div className='cd-right-contents'>
                    <div className="cd-cam">
                </div>
                </div>  
            </div>
        </>
    );
}