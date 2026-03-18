import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  FormFeedback,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import '../../../../cardUpdate.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEventCatagory = ({ onFormSubmit }) => {
  document.title = "Colours Admin";

  const validation = useFormik({
    initialValues: {
      eventCatagoryName: "",
    },

    validationSchema: Yup.object({
      eventCatagoryName: Yup.string().required("Please enter the Event Catagory Name"),
    }),

    onSubmit:  (values) => {
      console.log("Form submitted successfully", values);

      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append('eventCatagoryName', values.eventCatagoryName);
      (async() => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/add-eventCatagory-data`, formData);
          // alert("eventCatagory Added sucessfully!!!")
          toast.success('eventCatagory Added Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          setTimeout(() => {
            window.location.href="/EventCatagory"
          }, 2500);
          console.log('Response:', response);
        } catch (err) {
          toast.error('Error Occured!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          console.log(err);
        }
      })();

      if (onFormSubmit) {
        onFormSubmit(values);
      } else {
        console.warn("onFormSubmit prop is not provided");
      }
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="BRANCH - EVENTS" breadcrumbItem="Add Event Catagory" />
          <Row>
            <Col className="cardBodyParent">
              <Card className="cardBody">
                <CardBody>
                  <h4 className="card-title">Add Event Catagory Form</h4>

                  <Form
                    className="needs-validation"
                    style={{ marginTop: '40px' }}
                    onSubmit={validation.handleSubmit}
                  >
                    <Row>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="eventCatagoryName">Event Catagory Name</Label>
                          <Input
                            name="eventCatagoryName"
                            placeholder="Event Catagory Name"
                            type="text"
                            className="form-control"
                            style={{ border: "1px solid black", color: "black", fontWeight: 500 }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.eventCatagoryName}
                            invalid={
                              validation.touched.eventCatagoryName &&
                              validation.errors.eventCatagoryName
                                ? true
                                : false
                            }
                          />
                          <FormFeedback>
                            {validation.errors.eventCatagoryName}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button color="primary" type="submit">
                      Submit
                    </Button>
                    <ToastContainer />
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddEventCatagory;
