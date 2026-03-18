import React, { useState } from "react";
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

const EditEventSubCatagory = ({ onFormSubmit }) => {
  document.title = "Admin Portal";

   const [showModal, setShowModal] = useState(false);
      const [removeData, setRemoveData] = useState({});

      const handleShow = (dt) => {
        setShowModal(true)
        setRemoveData(dt)
      };

      const handleClose = () => setShowModal(false);
      const handleSaveChanges = () => {
          console.log('Changes saved!');
          // deleteEventCatagory(removeData)/.
          setShowModal(false);
      };

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

    onSubmit:  (values) => {
      console.log("Form submitted successfully", values);

      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append('eventSubCatImage', values.eventSubCatImage);
      formData.append(' eventSubCatName', values. eventSubCatName);
      formData.append('eventCatagoryName', values.eventCatagoryName);
    //   (async() => {
    //     try {
    //       const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/add-Event SubCatagory-data`, formData, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       });
    //       // alert("Department Added sucessfully!!!")
    //       toast.success('Department Added Successfully!', {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //         });
    //       setTimeout(() => {
    //         window.location.href="/vedaadmin/ViewDepartments"
    //       }, 2500);
    //       console.log('Response:', response);
    //     } catch (err) {
    //       toast.error('Error Occured!', {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //         });
    //       console.log(err);
    //     }
    //   })();

    //   if (onFormSubmit) {
    //     onFormSubmit(values);
    //   } else {
    //     console.warn("onFormSubmit prop is not provided");
    //   }
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="BRANCH - EVENTS" breadcrumbItem="Edit Event SubCatagory" />
          <Row>
            <Col className="cardBodyParent">
              <Card className="cardBody">
                <CardBody>
                  <h4 className="card-title">Edit Event SubCatagory</h4>
                  <Form
                    className="needs-validation"
                    style={{ marginTop: '40px' }}
                    onSubmit={validation.handleSubmit}
                  >
                    <Row>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="eventCatagoryName">Select Event Catagory Name</Label>
                          <Input
                            name="eventCatagoryName"
                            placeholder="Event SubCatagory Name"
                            type="text"
                            className="form-control"
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
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor=" eventSubCatName">Event SubCatagory Name</Label>
                          <Input
                            name="eventSubCatName"
                            placeholder="Event SubCatagory Name"
                            type="text"
                            className="form-control"
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
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Alert</h5>
                <button type="button" className="close" aria-label="Close" onClick={handleClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are You sure to Delete Event Sub Catagory</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
                <button type="button" className="btn btn-danger" onClick={handleSaveChanges}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default EditEventSubCatagory;
