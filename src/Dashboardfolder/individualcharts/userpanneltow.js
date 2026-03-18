import React from "react";
import { Card, CardBody , CardTitle, Col, Row } from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import CountUp from 'react-countup';

import Apaexlinecolumn from "./yearwisedatachart";
import { setupDirect } from "@testing-library/user-event/dist/cjs/setup/setup.js";


// import { Row, Container } from "reactstrap";
// import { Card, CardBody, CardTitle, Col, Row, Container } from "reactstrap"


const UserPanel_two = () => {

    const BASE_URL = process.env.REACT_APP_BASEURL;
    const [data, setdata] = useState([]);
    const [user, setUser] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("authUser"));
        setUser(user.userBranch);
        console.log(user.userBranch);
    },[])

    useEffect(() => {
        axios.get(BASE_URL + `/api/get-user-years/${user}`)
            .then((res) => {
                setdata(res);
                console.log(res)
                console.log('/api/get-user-years/')
            })
            .catch((err) => {
                console.error(err)
            })
    }, [user]);

    return (
        <React.Fragment>
            <Row>

                <Col xl={2} sm={6}>
                    <Card style={{ minHeight: "200px" }}>
                        <CardBody>
                            <div className="d-flex text-muted">
                                <div className="flex-grow-1 overflow-hidden">
                                    <h5 className="mb-2">First Years</h5>
                                    <h5 className="mb-3">{<CountUp end={data.firstYear} duration={2.5} />}</h5>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Card style={{ minHeight: "200px" }}>
                        <CardBody>
                            <div className="d-flex text-muted">
                                <div className="flex-grow-1 overflow-hidden">
                                    <h5 className="mb-2">Third Years</h5>
                                    <h5 className="mb-3">{<CountUp end={data.thirdYear} duration={2.5} />}</h5>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    
                </Col>



                <Col xl={2} sm={6}>
                    
                    <Card style={{ minHeight: "200px" }}>
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-grow-1 overflow-hidden">
                                    <h5 className="mb-2">Second Years</h5>
                                    <h5 className="mb-3">{<CountUp end={data.secondYear} duration={2.5} />}</h5>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Card style={{ minHeight: "200px" }}>
                        <CardBody>
                            <div className="d-flex text-muted">
                                <div className="flex-grow-1 overflow-hidden">
                                    <h5 className="mb-2">Fourth Years</h5>
                                    <h5 className="mb-3">{<CountUp end={data.fourthYear} duration={2.5} />}</h5>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={8} sm={12}>
                    <Col lg={12}>
                        <Card>
                            <CardBody>
                                <CardTitle className="mb-4">Campus wise Years</CardTitle>
                                <Apaexlinecolumn />
                            </CardBody>
                        </Card>
                    </Col>
                </Col>

            </Row>
        </React.Fragment>
    );
};

export default UserPanel_two;
