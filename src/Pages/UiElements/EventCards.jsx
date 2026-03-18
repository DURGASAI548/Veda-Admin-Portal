import React from 'react';
import { Container } from 'reactstrap';
import "./masonry.css";
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
//Import Breadcrumb
import "./EventCards.css"
import Breadcrumbs from "../../components/Common/Breadcrumb";


import img1 from "../../assets/images/DSP.png"
import img2 from "../../assets/images/Hanumanthu.png"
import img3 from "../../assets/images/Kishore.png"
import img4 from "../../assets/images/Girish.png"


import { Col, Row, Card, CardBody, CardTitle, CardSubtitle, CardImg, CardText, CardHeader, CardImgOverlay, CardFooter, CardDeck } from "reactstrap";
const maxLength = 18;
const EventCards = () => {
    document.title = "Starter  | Upzet - React Admin & Dashboard Template";

    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
    };
    document.title = "Cards | Upzet - React Admin & Dashboard Template";

    const fakedata = [
        {
            img: img1,
            eventName: 'DIGI',
            dept: 'CSE & IT',
            price: '100',
            teamType: 'Individual',
        },
        {
            img: img2,
            eventName: 'ELECTRENDZ',
            dept: 'EEE',
            price: '100',
            teamType: 'Team',
        },
        {
            img: img3,
            eventName: 'IGNITE',
            dept: 'MECHANICAL',
            price: '100',
            teamType: 'Individual',
        },
        {
            img: img4,
            eventName: 'SPARK',
            dept: 'ECE',
            price: '100',
            teamType: 'Team',
        },
    ]


    // 
    // 
    const [ eventData, seteventData] = useState([]);
        const BaseUrl = process.env.REACT_APP_BASEURL;
        console.log(BaseUrl + "/api/get-all-events")
        useEffect(() => {
            (async () => {
                await axios.get(BaseUrl + "/api/get-all-events") // updated api
                    .then(res => {
                        seteventData(res);
                        console.log(res);
                    })
                    .catch(err =>
                        console.log(err)
                    )
            })();
        }, []); // PLEASE HANDLE IMAGES
        return (
            <React.Fragment>
                <div className='page-content'>
                    <div className='EventCardParent'>
                        {eventData.map((data, index) => {
                            return (
                                <div style={{ color: 'white' }} className='EventCard'>
                                     <div className='EventBottom' style={{height:"fitContent"}}>
                                        <p className='departmentTitle' style={{fontSize:"20px"}}>{data.eventName}</p>
                                    </div>
                                    <div className='EventTop'>
                                        <div className='tr'>
                                            <table>
                                                <tr>
                                                    <td style={{ fontWeight: 'bold'}}>Event Catagory Name : </td>
                                                    <td>{data.eventCatagoryName}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: 'bold'}}>Event Sub Catagory Name : </td>
                                                    <td>{data.eventSubCatName}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: 'bold' }}>Event Name : </td>
                                                    <td>{data.eventName}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: 'bold' }}>Registration Fee : </td>
                                                    <td>{data.price}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: 'bold' }}>Max Team Size : </td>
                                                    <td>{data.maxTeamSize}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: 'bold' }}>Min Team Size : </td>
                                                    <td>{data.minTeamSize}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: 'bold' }}>Event Venue : </td>
                                                    {/* <td>{data.eventVenue}</td> */}
                                                    <td title={data.venue}>{data.venue ? data.venue.length > maxLength ? `${data.venue.substring(0, maxLength)}...` : data.venue : " "}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </React.Fragment>
        );
};

export default EventCards;