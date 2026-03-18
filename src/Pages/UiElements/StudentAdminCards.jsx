import React ,{useState, useEffect} from 'react';
import { Container } from 'reactstrap';
import "./masonry.css";
import axios from 'axios';
//Import Breadcrumb
import "./AdminCard.css"
import Breadcrumbs from "../../components/Common/Breadcrumb";

import img1 from "../../assets/images/DSP.png"
import img2 from "../../assets/images/Hanumanthu.png"
import img3 from "../../assets/images/Kishore.png"
import img4 from "../../assets/images/Girish.png"

import { Col,Row,Card,CardBody,CardTitle,CardSubtitle,CardImg,CardText,CardHeader,CardImgOverlay,CardFooter,CardDeck} from "reactstrap";

const StudentAdminCards
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
    
      const [fakedata,setfakedata] = useState([
        {
            img : img1,
            name : 'Neduri Rajeswar Yadav',
            roll : '22A91A05E7',
            college : 'AEC',    
            mobile : '9121443271',
            email : 'cserajeswaryadav@gmail.com',
            dept : 'CSE',
            event : 'DIGI',
        },
        {
            img : img2,
            name : 'Sai Chandu Adapa',
            roll : '22A91A61J2',
            college : 'AEC',
            mobile : '1234567890',
            email : 'saichanduadapa@gmail.com',
            dept : 'IT',
            event : 'DIGI'
        },
        {
            img : img3,
            name : 'Raj',
            roll : '123',
            college : 'AEC',
            mobile : '1234567890',
            email : 'xyz@gmail.com',
            dept : 'AIML',
            event : 'ROBOS'
        },
        {
            img : img4,
            name : 'Sai',
            roll : '456',
            college : 'ACOE',
            mobile : '1234567890',
            email : 'xyz@gmail.com',
            dept : 'PETROLEUM',
            event : 'PETRO'
        },
        ])
        useEffect(()=>{
            (async() => {
               await axios.get(BaseURL+"/api/get-student-cordinate")
                .then(res => {
                    setfakedata(res)
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
            })()
          },[])
    
          const maxLength = 20;
          return (
            <>
                <div className='page-content'>
                    <div className='fcardParent'>
                        {console.log("This is the Required Pages")}
                        {fakedata.map((data,index)=>{
                            return (
                                <div style={{color:'white'}} className='fcard'>
                                    <div className='ftop'>
                                        <div className='ftl'>
                                            <img src={data.studentCordinatorId ? "https://info.aec.edu.in/adityacentral/studentphotos/" + data.studentCordinatorId.trim() + ".jpg": ""}></img>
                                        </div>
                                        <div className='ftr'>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ fontWeight: 'bold' }}>Name : </td>
                                                        {/* <td>{data.studentCordinatorName}</td> */}
                                                        <td title={data.studentCordinatorName}>{data.studentCordinatorName ? data.studentCordinatorName.length > maxLength ? `${data.studentCordinatorName.substring(0, maxLength)}...` : data.studentCordinatorName : " "}</td>

                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontWeight: 'bold' }}>Roll No : </td>
                                                        <td>{data.studentCordinatorId}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontWeight: 'bold' }}>Contact : </td>
                                                        <td>{data.studentCordinatorPhone}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className='fcenter'>
                                        <div className='fcc' style={{fontSize: '18px'}}>{data.departmentName}</div>
                                        <div className='fcc' style={{fontSize :  '18px'}}>{data.eventName}</div>
                                        <div className='fcc' style={{fontSize: '18px'}}>{data.studentCordinatorCollege}</div>
                                    </div>
                                    <div className='fbot'>
                                        <p className='fgmail'>{data.studentCordinatorEmail}</p>
                                    </div>
                                </div>
                            )})}
                    </div>
                </div>
            </>
        );
};

export default StudentAdminCards
;