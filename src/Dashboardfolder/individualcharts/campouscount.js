import React from "react";
import PieChart from "./campouschart";

import { Card, CardBody, Col, Row ,CardTitle } from "reactstrap";


const SocialSource = () => {
  return (
    <React.Fragment>
      <Col xl={4}>
      
        <Card style={{height:"95%"}}>
          
          <CardBody >
          <CardTitle>College wise count</CardTitle>
            <PieChart />
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default SocialSource;
