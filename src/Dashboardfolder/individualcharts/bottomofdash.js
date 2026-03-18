import React from "react";
import { Card, CardBody, CardTitle, Col, Row, Container } from "reactstrap"
import LineChart from "./lineChartforMandF";
import SplineArea from './spilinechartRevenue';

const BottomOfDash = () => {
    return (
        <>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <CardTitle className="mb-4">Campus Wise Gender</CardTitle>
                            <LineChart />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            {JSON.parse(localStorage.getItem("authUser")).userBranch === 'Admin'?<Row>
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <CardTitle className="mb-4">Revenue Generated</CardTitle>
                            <SplineArea />
                        </CardBody>
                    </Card>
                </Col>
            </Row >:<></>}
            
        </>
    )
}

export default BottomOfDash;