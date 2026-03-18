import React from 'react';
import LineColumnArea from './departmentwisechart';
import { useEffect, useState } from 'react';
import axios from 'axios';

import {
    Card,
    CardBody,
    Col,
    CardTitle,
    Row
} from "reactstrap";

import { OverViewData } from '../../CommonData/Data/index';
import CountUp from 'react-countup';
import { useRowSelect } from 'react-table';


const OverView = () => {
    const BASE_URL = process.env.REACT_APP_BASEURL;
    const [data, setdata] = useState([]);
    const [userBranch , setuserBranch] = useState("")

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("authUser"))
        setuserBranch(user.userBranch);
    })

    useEffect(() => {
        axios.get(BASE_URL + '/api/get-user-years/' + userBranch)
            .then((res) => {
                setdata(res);
                console.log(res)
                console.log('/api/get-user-years/')
            })
            .catch((err) => {
                console.error(err)
            })
    }, [userBranch]);

    return (
        <React.Fragment>
            <Col xl={8}>
                <Card>
                    <CardBody>
                        <CardTitle className="mb-4">
                            Deaprtment wise Team count
                        </CardTitle>
                        <LineColumnArea />
                    </CardBody>
                    {/* <CardBody className="border-top">
                        <div className="text-muted text-center">
                            <Row class="d-flex justify-content-center">
                                <h4>Total Individual Registrations : <span style={{fontSize: '20px'}}>{data.total}</span></h4>
                            </Row>
                        </div>
                    </CardBody> */}
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default OverView;