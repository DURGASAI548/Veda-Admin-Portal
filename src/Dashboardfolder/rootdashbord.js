import React, { useEffect, useState } from "react";
import UsePanel_two from "./individualcharts/userpanneltow";
import SocialSource from "./individualcharts/campouscount";
import OverView from "./individualcharts/depertmetwisedata";
import OverViewChart1 from "./individualcharts/newDepartmentWiseData";
import Datatable from "./individualcharts/departmentwisetable";
// NEWWWWW
import GenderAndAcco from "./individualcharts/genderandaccomodation";
import BottomOfDash from "./individualcharts/bottomofdash";
// import Chart1 from "./individualcharts/FirstChart.js";
// import { Card, CardBody , CardTitle, Col, Row } from "reactstrap";

// import { Row, Container } from "reactstrap";
import { Card, CardBody, CardTitle, Col, Row, Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../components/Common/Breadcrumb";

const DashboardFinal = () => {
  //   useEffect(()=>{
  //     const user = JSON.parse(localStorage.getItem("authUser"))
  //     setuserBranch(user.userBranch);
  // })
  document.title = "Dashboard | Upzet - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Upzet" breadcrumbItem="Dashboard" />
          <Row>
            {/* <OverViewChart1 /> */}
            {/* <SocialSource /> */}
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Campus wise Years</CardTitle>
                  <Chart1 />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <UsePanel_two />
          </Row>

          <Row>
            <OverView />
            <SocialSource />
          </Row>
          {/* {JSON.parse(localStorage.getItem("authUser")).userBranch ===
          "Admin" ? (
            <Row>
              <Datatable />
            </Row>
          ) : (
            <></>
          )} */}

          {/* NEWWWWW */}
          {/* <Row>
            <GenderAndAcco />
          </Row>
          <Row>
            <BottomOfDash />
          </Row> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardFinal;
