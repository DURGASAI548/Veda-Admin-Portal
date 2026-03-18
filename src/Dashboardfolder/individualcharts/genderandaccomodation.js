import PieChart from "./genderChart.js";
import { Card, CardBody, CardTitle, Col, Row, Container } from "reactstrap"
import DountChart from "./donutchartACC.js";

const GenderAndAcco = () => {
    return (
        <Row>
            <Col lg={6} md={12}>
                <Card>
                    <CardBody>
                        <CardTitle className="mb-4">Gender Chart</CardTitle>
                        <PieChart />
                    </CardBody>
                </Card>
            </Col>
            <Col lg={6} md={12}>
                <Card>
                    <CardBody>
                        <CardTitle className="mb-4">Accomodation YES Chart</CardTitle>
                        <DountChart/>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default GenderAndAcco;