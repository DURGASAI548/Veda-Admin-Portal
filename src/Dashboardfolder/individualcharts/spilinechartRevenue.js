import React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Col, Row, Container } from "reactstrap"
import axios from 'axios';
import ReactApexChart from "react-apexcharts";
import CountUp from 'react-countup';
import { ThreeDots } from 'react-loader-spinner';
const DashedLine = () => {

    const BASE_URL = process.env.REACT_APP_BASEURL;
    const [loader, setloader] = useState(true);
    const [label, setlabel] = useState(null);
    const [daata, setdaata] = useState(null);
    const [totalrev, settotalrev] = useState(null);
    const [options, setoptions] = useState([]);
    const [selectoption, setselectoption] = useState("ALL");

    useEffect(() => {
        axios.get(BASE_URL + "/api/get-unique-departments")
            .then(res => {
                setoptions(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        setloader(true)
        axios.get(BASE_URL + '/api/get-revenue/' + selectoption)
            .then((res) => {

                var a = []
                Object.keys(res).map(ele => {
                    
                    a.push(ele)

                })
                setlabel(a);
                setdaata(Object.values(res));
                settotalrev(res);
                setloader(false)
            })
            .catch((err) => {
                console.error(err);
                setloader(false)
            })
    }, [selectoption]);
    const Call = (event) => {
        setselectoption(event.target.value)
    }
    const DashedLineData = daata && {
        series: [
            {
                name: "Revenue ₹",
                data: daata,
            },
        ],
        options: {
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
                width: 3,
            },
            colors: ["rgb(61, 142, 248)"],
            xaxis: {
                type: "department/event",
                categories: label,
            },
            grid: {
                borderColor: "#f1f1f1",
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy HH:mm",
                },
            },
        },
    }
    function zombie(totalrev) {
        let total = 0;
        for (let i in totalrev) {
            total += totalrev[i];
        }
        return total;
    }
    return (
        <> <React.Fragment>
            <div className='d-flex'>
                <div>Choose department : &nbsp;</div>
                <select onChange={(event) => Call(event)} style={{
                    marginLeft: 50,
                    width: "260px",
                    padding: "10px 5px",
                    borderRadius: "5px",
                    fontSize: "17px",
                }}>
                    <option value="ALL">All</option>
                    {options && options.map(ele => {
                        return <option value={ele}>{ele}</option>
                    })}
                </select>
            </div>

            {!loader ? <div><ReactApexChart
                options={DashedLineData.options}
                series={DashedLineData.series}
                type="area"
                height="380"
                className="apex-charts"
            /><CardBody className="border-top">
            <div className="text-muted text-center">
                <Row class="d-flex justify-content-center">
                    <h4>Total Revenue : <CountUp end={zombie(totalrev)} style={{ fontSize: '20px' }} duration={3} /> /-</h4>
                </Row>
            </div>
        </CardBody></div> : <div style={{ width: "100%", display: "flex", justifyContent: "center", height: "360px", alignItems: "center" }}> <ThreeDots
                visible={true}
                height="120"
                width="120"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            /> </div>}
            {/* {loader ? <div style={{ width: "100%", display: "flex", justifyContent: "center", height: "360px", alignItems: "center" }}> <ThreeDots
                visible={true}
                height="120"
                width="120"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            /> </div> : <CardBody className="border-top">
                <div className="text-muted text-center">
                    <Row class="d-flex justify-content-center">
                        <h4>Total Revenue : <CountUp end={zombie(totalrev)} style={{ fontSize: '20px' }} duration={3} /> /-</h4>
                    </Row>
                </div>
            </CardBody>} */}

        </React.Fragment>
        </>
    )
}

export default DashedLine;