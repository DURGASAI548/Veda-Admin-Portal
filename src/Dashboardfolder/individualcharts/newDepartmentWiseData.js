import React from "react";
import NewLineColumnArea from "./newDepartmentWiseChart";
import LineColumnArea from "./departmentwisechart";
import { useEffect, useState } from "react";
import axios from "axios";
import Chart1 from "./FirstChart.js";
// import CountUp from 'react-countup';
import { Card, CardBody, Col, CardTitle, Row } from "reactstrap";

import { OverViewData } from "../../CommonData/Data/index";
import CountUp from "react-countup";
import { useRowSelect } from "react-table";
import { ThreeDots } from 'react-loader-spinner'

const OverViewChart1 = () => {
  const BASE_URL = process.env.REACT_APP_BASEURL;
  const [loader,setloader] = useState(true);
  const [data, setdata] = useState([]);
  const [userBranch, setuserBranch] = useState();
  const [options, setoptions] = useState([]);
  const [value, setvalue] = useState();
  const [chartdata, setchartdata] = useState([]);
  const [teamcount, setteamcount] = useState(0);
  const [studentcount, setstudentcount] = useState(0);
  const [Chartdata, setChartData] = useState([]);
  const [horizontal, sethorizontal] = useState([]);
  const [vertical, setvertical] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    setuserBranch(user.userBranch);

    axios
      .get(BASE_URL + "/api/get-unique-departments")
      .then((res) => {
        setoptions(res);
        // console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (userBranch === "Admin") {
      setvalue("Admin");
    } else {
      setvalue(userBranch);
    }
  }, [userBranch]);
  

  useEffect(() => {
    setloader(true)
    axios
      .get(BASE_URL + "/api/get-chart-data/" + value)
      .then((res) => {
        // console.log(res);
        var x1 = [];
        var x2 = [];
        var y = [];
        var team = 0;
        var student = 0;
        res.map((ele) => {
          // console.log(ele);
          x1.push(ele.individualReg);
          team+=ele.teamReg;
          student+=ele.individualReg;
          x2.push(ele.teamReg);
          if (ele.departmentName.length > 10) {
            y.push(ele.departmentName.slice(0, 10) + "...");
          } else {
            y.push(ele.departmentName);
          }
        });
        setteamcount(team)
        setstudentcount(student);
        sethorizontal([
          { name: "Teams count", data: x2 },
          { name: "Student count", data: x1 },
        ]);
        setvertical(y);
        // console.log(x)
        // setChartData(x);
        setloader(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [value]);


  // useEffect(() => {
  //     axios.get(BASE_URL + '/api/get-user-years/' + userBranch)
  //         .then((res) => {
  //             setdata(res);
  //             console.log(res)
  //         })
  //         .catch((err) => {
  //             console.error(err)
  //         })
  // }, [userBranch]);

 

  const GetCall = (event) => {
    // console.log(event.target.value)
    setvalue(event.target.value);
  };

  return (
    <React.Fragment>
      <Col xl={12}>
        <Card>
          <CardBody>
            <CardTitle className="mb-6">
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ fontSize: "17px", width: "fit-content" }}>
                  Choose Department:{" "}
                </div>
                {userBranch === "Admin" ? (
                  <select
                    style={{
                      marginLeft: 50,
                      width: "260px",
                      padding: "10px 5px",
                      borderRadius: "5px",
                      fontSize: "17px",
                    }}
                    onChange={(event) => GetCall(event)}
                  >
                    <option value="Admin">ALL</option>
                    {options &&
                      options.map((ele) => {
                        // {console.log(ele)}
                        return <option value={ele}>{ele}</option>;
                      })}
                  </select>
                ) : (
                  <div style={{ marginLeft: "10px" }}>{userBranch}</div>
                )}
              </div>
            </CardTitle>
            {/* {chartdata ? <NewLineColumnArea data={chartdata} /> : <></>} */}
            {loader ?<div style={{width:"100%",display:"flex",justifyContent:"center",height:"360px",alignItems:"center"}}> <ThreeDots
                    visible={true}
                    height="120"
                    width="120"
                    color="#4fa94d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    /> </div>:
                    <Chart1 vertical={vertical} horizontal={horizontal} />
            }
          </CardBody>
          <CardBody className="border-top">
            <div className="text-muted text-center">
              <Row className="d-flex justify-content-center">
                <h4 style={{width:"fit-content"}}>
                   Team count :{" "}
                  <span style={{ fontSize: "20px" }}><CountUp end={teamcount} /></span>
                </h4>
                <h4 style={{width:"fit-content"}}>
                   Student count :{" "}
                  <span style={{ fontSize: "20px" }}><CountUp end={studentcount} /></span>
                </h4>
              </Row>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default OverViewChart1;
