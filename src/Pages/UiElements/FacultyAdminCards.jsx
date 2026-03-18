import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import axios from 'axios';
import "./masonry.css";
import "./AdminCard.css"
import coordinator from "./coorinatorr.jpg"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import img1 from "../../assets/images/DSP.png"
import img2 from "../../assets/images/Hanumanthu.png"
import img3 from "../../assets/images/Kishore.png"
import img4 from "../../assets/images/Girish.png"

import { Col, Row, Card, CardBody, CardTitle, CardSubtitle, CardImg, CardText, CardHeader, CardImgOverlay, CardFooter, CardDeck } from "reactstrap";

const FacultyAdminCards
    = () => {
        document.title = "Starter  | Upzet - React Admin & Dashboard Template";
        const BaseURL = process.env.REACT_APP_BASEURL;
        const breakpointColumnsObj = {
            default: 3,
            1100: 3,
            700: 2,
            500: 1
        };
        document.title = "Cards | Upzet - React Admin & Dashboard Template";
        const [fakedata, setfakedata] = useState([
         
            {
                img: img2,
                name: 'Sai Chandu Adapa',
                roll: '22A91A61J2',
                college: 'AEC',
                mobile: '1234567890',
                email: 'saichanduadapa@gmail.com',
                dept: 'IT',
                event: 'DIGI'
            },
            
        ])
        const [validUrls, setValidUrls] = useState({});
        const divisions = ['ACET', 'AEC', 'ACOE'];

        useEffect(() => {
            axios.get(BaseURL + "/api/get-faculty-cordinate")
                .then(res => {
                    setfakedata(res)
                    // console.log(res)
                })
                .catch(err => {
                    // console.log(err)
                })
        }, [])

        const [dumimg, setdumimg] = useState('');
        const maxLength = 20;
        useEffect(() => {
            const checkImage = (division, EmpId, callback) => {
                const img = new Image();
                const url = `https://info.aec.edu.in/${division}/employeephotos/${EmpId}.jpg`;
    
                img.onload = () => {
                  
                    setValidUrls(prev => ({...prev, [EmpId]: url}));
                    callback(url); 
                };
    
                img.onerror = () => {
                    callback(null); 
                };
    
                img.src = url;
            };
    
            const findValidUrl = (idx, EmpId, callback) => {
               
                const attemptDivision = (divisionIndex) => {
                    if (divisionIndex >= divisions.length) {
                        callback(coordinator); 
                        return;
                    }
    
                    checkImage(divisions[divisionIndex], EmpId, (url) => {
                        
                        if (url) {
                            callback(url);
                        } else {
                            attemptDivision(divisionIndex + 1);
                        }
                    });
                };
    
                attemptDivision(0);
            };
    
            const updateValidUrls = async () => {
                // console.log(fakedata);
                const urls = await Promise.all(fakedata.map((item, idx) => {
                 
                    new Promise((resolve) => {
                        if (item?.cordinatorId) {
                            // console.log('firstttt')
                            findValidUrl(idx, item.cordinatorId.trim(), resolve);
                        } else {
                            resolve(coordinator); 
                        }
                    })
            }));
               
            };
    
            updateValidUrls();
        }, [fakedata]);
        return (
            <>
                <div className='page-content'>
                    <div className='fcardParent'>
                        {fakedata && fakedata.map((data, index) => {
                            
                            return (
                                <div style={{ color: 'white' }} className='fcard'>
                                    <div className='ftop'>
                                        <div className='ftl'>
                                            <img src={validUrls[data.cordinatorId] ?? coordinator} alt={data?.cordinatorId ?? "Cord"}/>


                                        </div>
                                        <div className='ftr'>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ fontWeight: 'bold' }}>Name : </td>
                                                        
                                                        <td title={data.cordinatorName}>{data.cordinatorName ? data.cordinatorName.length > maxLength ? `${data.cordinatorName.substring(0, maxLength)}...` : data.cordinatorName : " "}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontWeight: 'bold' }}>Emp ID : </td>
                                                        <td>{data.cordinatorId}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontWeight: 'bold' }}>Contact: </td>
                                                        <td>{data.cordinatorPhone}</td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className='fcenter'>
                                        <div className='fcc' style={{ fontSize: '18px' }}>{data.departmentName}</div>
                                        <div className='fcc' style={{ fontSize: '18px' }}>{data.eventName}</div>
                                        <div className='fcc' style={{ fontSize: '18px' }}>{data.cordinatorCollege?.toUpperCase()}</div>
                                    </div>
                                    <div className='fbot'>
                                        <p className='fgmail'>{data.cordinatorEmail}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>
        );
    };

export default FacultyAdminCards;