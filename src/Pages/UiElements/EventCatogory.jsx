import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
} from "reactstrap";
import "./masonry.css";
import axios from "axios";
import "./departmentscards.css"
import { useState, useEffect } from "react";
// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// Sample department images
import img1 from "../../assets/images/DSP.png";
import img2 from "../../assets/images/Hanumanthu.png";
import img3 from "../../assets/images/Kishore.png";
import img4 from "../../assets/images/Girish.png";

const EventCatagory = () => {
  document.title = "Colours Admin";
  const BaseUrl = process.env.REACT_APP_BASEURL;
  const [eventCatagoryName, setEventCatagoryName] = useState([
    {
      img: img1,
      name: "Computer Science Engineering",
      code: "CSE",
      head: "Dr. John Doe",
      contact: "123-456-7890",
      email: "cse@example.com",
      facultyCount: 25,
      studentCount: 500,
    },
    {
      img: img2,
      name: "Information Technology",
      code: "IT",
      head: "Prof. Jane Smith",
      contact: "987-654-3210",
      email: "it@example.com",
      facultyCount: 20,
      studentCount: 400,
    },
    {
      img: img3,
      name: "Artificial Intelligence and Machine Learning",
      code: "AIML",
      head: "Dr. Alice Brown",
      contact: "456-789-1230",
      email: "aiml@example.com",
      facultyCount: 15,
      studentCount: 300,
    },
    {
      img: img4,
      name: "Petroleum Engineering",
      code: "PET",
      head: "Dr. Robert Green",
      contact: "321-654-9870",
      email: "petroleum@example.com",
      facultyCount: 10,
      studentCount: 150,
    },
  ]);
  useEffect(() => {
    axios
      .get(BaseUrl + "/api/get-eventCatagory-data")
      .then((res) => {
        console.log(res);
        setEventCatagoryName(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <React.Fragment>
        <div className='page-content'>
            <div className='DepartmentCard'>
                {eventCatagoryName.map((data, index) => {
                    return (
                        <div style={{ color: 'white', fontSize: '40px' }} className='catagory'>
                                  {data.eventCatagoryName}
                        </div>
                    )
                })}
            </div>
        </div>
    </React.Fragment>
);
};

export default EventCatagory;
