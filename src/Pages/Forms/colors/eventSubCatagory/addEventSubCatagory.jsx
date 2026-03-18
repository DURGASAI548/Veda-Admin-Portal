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
import { useState, useEffect } from "react";

const AddEventSubCatagory = ({ onFormSubmit }) => {
  document.title = "Colours Admin";

  const [selectEventCatOption, setSelectEventCatOption] = useState({});
  const [selectedEventCatOption, setSelectedEventCatOption] = useState('');

  useEffect(() => {
    (async () => {
        const Result = await axios.get("http://localhost:2001/api/get-eventCatagory-data");
        // console.log(result.data);
        const groupedEvents = Result.reduce((acc, current) => {
            // If the department does not exist in the accumulator, create an entry
            if (!acc[current.eventCatagoryName]) {
                acc[current.eventCatagoryName] = [];
            }
            // Add the event to the department's array
            acc[current.eventCatagoryName].push(current.eventCatagoryName);

            return acc;
        }, {});
        setSelectEventCatOption(groupedEvents)
        console.log(groupedEvents);
    })();
}, [])

  const validation = useFormik({
    initialValues: {
      eventCatagoryName: "",
      eventSubCatName: "",
      eventSubCatImage: null,
    },

    validationSchema: Yup.object({
      eventCatagoryName: Yup.string().required("Please enter the Event Catagory Name"),
      eventSubCatName: Yup.string().required("Please enter the Event SubCatagory Name"),

      eventSubCatImage: Yup.mixed()
        .required("Please upload the Event SubCatagory Image")
        .test("fileSize", "File size is too large", (value) => {
          return value && value.size <= 3048576; // 1 MB
        })
        .test("fileType", "Unsupported file format", (value) => {
          return (
            value &&
            ["image/jpeg", "image/png", "image/gif"].includes(value.type)
          );
        }),
    }),

    onSubmit: (values) => {
      console.log("Form submitted successfully", values);

      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append('eventCatagoryName', values.eventCatagoryName);
      formData.append('eventSubCatName', values.eventSubCatName);
      formData.append('eventSubCatImage', values.eventSubCatImage);
      (async () => {
        try {
          const response = await axios.post('http://localhost:2001/api/add-eventSubCatagory-data', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          // alert("Department Added sucessfully!!!")
          toast.success('eventSubCatagory Added Successfully!', {
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
            window.location.href = "/EventSubCatagorys"
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

  const handleSelectCatName = (e) => {
    console.log(e.target.value);
    setSelectedEventCatOption(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="BRANCH - EVENTS" breadcrumbItem="Add Event SubCatagory" />
          <Row>
            <Col className="cardBodyParent">
              <Card className="cardBody">
                <CardBody>
                  <h4 className="card-title">Add Event SubCatagory</h4>

                  <Form
                    className="needs-validation"
                    style={{ marginTop: '40px' }}
                    onSubmit={validation.handleSubmit}
                  >
                    <Row>
                      <Col lg="6" className="mb-3">
                        <label htmlFor="eventCatagoryName">Select Event Catagory Name:</label>
                        <select
                          id="eventCatagoryName"
                          name="eventCatagoryName"
                          value={validation.values.eventCatagoryName}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          style={{ border: "1px solid black", color: "black", fontWeight: 500 }}
                          className={`form-select ${validation.errors.eventCatagoryName && validation.touched.eventCatagoryName ? 'is-invalid' : ''}`}
                        >
                          <option value="">Select Event Catagory</option>
                          {Object.keys(selectEventCatOption).map((dept) => (
                            <option key={dept} value={dept}>
                              {dept.charAt(0).toUpperCase() + dept.slice(1)}
                            </option>
                          ))}
                        </select>
                        {validation.errors.eventCatagoryName && validation.touched.eventCatagoryName && (
                          <div className="invalid-feedback">{validation.errors.eventCatagoryName}</div>
                        )}
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor=" eventSubCatName">Event SubCatagory Name</Label>
                          <Input
                            name="eventSubCatName"
                            placeholder="Event SubCatagory Name"
                            type="text"
                            className="form-control"
                            style={{ border: "1px solid black", color: "black", fontWeight: 500 }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.eventSubCatName}
                            invalid={
                              validation.touched.eventSubCatName &&
                                validation.errors.eventSubCatName
                                ? true
                                : false
                            }
                          />
                          <FormFeedback>
                            {validation.errors.eventSubCatName}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="eventSubCatImage">Event SubCatagory Image</Label>
                          <Input
                            type="file"
                            name="eventSubCatImage"
                            className="form-control"
                            onChange={(event) => {
                              const file = event.currentTarget.files[0];
                              validation.setFieldValue("eventSubCatImage", file);
                            }}
                            style={{ border: "1px solid black", color: "black", fontWeight: 500 }}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.eventSubCatImage &&
                                validation.errors.eventSubCatImage
                                ? true
                                : false
                            }
                          />
                          <FormFeedback>
                            {validation.errors.eventSubCatImage}
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

export default AddEventSubCatagory;
