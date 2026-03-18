import React from "react"
import { Container, Row, Col } from "reactstrap";
import logo from './GREEN TM.png';

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid ={true}>
          <Row>
            <Col sm={4}>{new Date().getFullYear()} © Technical Hub.</Col>
            <Col sm={4}>Provided by <img src={logo} alt="TH_logo" style={{height: '40px'}}/></Col>
            <Col sm={4}>
              <div className="text-sm-end d-none d-sm-block">
                Crafted with <i className="mdi mdi-heart text-danger"></i> by
                colors Developer's Team.
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>

  );
}

export default Footer;