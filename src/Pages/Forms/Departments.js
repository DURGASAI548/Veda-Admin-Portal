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
import Breadcrumbs from "../../components/Common/Breadcrumb";
import '../../cardUpdate.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Departments = ({ onFormSubmit }) => {
  document.title = "Admin Portal";

  const validation = useFormik({
    initialValues: {
      departmentName: "",
      departmentTitle: "",
      departmentLogo: null,
      departmentImage: null,
      departmentContent: "",
    },

    validationSchema: Yup.object({
      departmentName: Yup.string().required("Please enter the Department Name"),
      departmentTitle: Yup.string().required("Please enter the Department Title"),
      departmentLogo: Yup.mixed()
        .required("Please upload the Department Logo")
        .test("fileSize", "File size is too large", (value) => {
          return value && value.size <= 3048576; // 1 MB
        })
        .test("fileType", "Unsupported file format", (value) => {
          return (
            value &&
            ["image/jpeg", "image/png", "image/gif"].includes(value.type)
          );
        }),
      departmentImage: Yup.mixed()
        .required("Please upload the Department Image")
        .test("fileSize", "File size is too large", (value) => {
          return value && value.size <= 3048576; // 1 MB
        })
        .test("fileType", "Unsupported file format", (value) => {
          return (
            value &&
            ["image/jpeg", "image/png", "image/gif"].includes(value.type)
          );
        }),
      departmentContent: Yup.string().required("Please enter Department Content"),
    }),

    onSubmit:  (values) => {
      console.log("Form submitted successfully", values);

      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append('departmentContent', values.departmentContent);
      formData.append('departmentImage', values.departmentImage);
      formData.append('departmentTitle', values.departmentTitle);
      formData.append('departmentName', values.departmentName);
      formData.append('departmentLogo', values.departmentLogo);
      (async() => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/add-department-data`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          // alert("Department Added sucessfully!!!")
          toast.success('Department Added Successfully!', {
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
            window.location.href="/vedaadmin/ViewDepartments"
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
          <Breadcrumbs title="BRANCH - EVENTS" breadcrumbItem="Add Department" />
          <Row>
            <Col className="cardBodyParent">
              <Card className="cardBody">
                <CardBody>
                  <h4 className="card-title">Add Department Form</h4>

                  <Form
                    className="needs-validation"
                    style={{ marginTop: '40px' }}
                    onSubmit={validation.handleSubmit}
                  >
                    <Row>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="departmentName">Department Name</Label>
                          <Input
                            name="departmentName"
                            placeholder="Department Name"
                            type="text"
                            className="form-control"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.departmentName}
                            invalid={
                              validation.touched.departmentName &&
                              validation.errors.departmentName
                                ? true
                                : false
                            }
                          />
                          <FormFeedback>
                            {validation.errors.departmentName}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="departmentTitle">Department Title</Label>
                          <Input
                            name="departmentTitle"
                            placeholder="Department Title"
                            type="text"
                            className="form-control"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.departmentTitle}
                            invalid={
                              validation.touched.departmentTitle &&
                              validation.errors.departmentTitle
                                ? true
                                : false
                            }
                          />
                          <FormFeedback>
                            {validation.errors.departmentTitle}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="departmentLogo">Department Logo</Label>
                          <Input
                            type="file"
                            name="departmentLogo"
                            className="form-control"
                            onChange={(event) => {
                              const file = event.currentTarget.files[0];
                              validation.setFieldValue("departmentLogo", file);
                            }}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.departmentLogo &&
                              validation.errors.departmentLogo
                                ? true
                                : false
                            }
                          />
                          <FormFeedback>
                            {validation.errors.departmentLogo}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="departmentImage">Department Image</Label>
                          <Input
                            type="file"
                            name="departmentImage"
                            className="form-control"
                            onChange={(event) => {
                              const file = event.currentTarget.files[0];
                              validation.setFieldValue("departmentImage", file);
                            }}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.departmentImage &&
                              validation.errors.departmentImage
                                ? true
                                : false
                            }
                          />
                          <FormFeedback>
                            {validation.errors.departmentImage}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup className="mb-3">
                          <Label htmlFor="departmentContent">Department Content</Label>
                          <Input
                            type="textarea"
                            name="departmentContent"
                            placeholder="Department Content"
                            className="form-control"
                            style={{ height: '150px' }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.departmentContent}
                            invalid={
                              validation.touched.departmentContent &&
                              validation.errors.departmentContent
                                ? true
                                : false
                            }
                          />
                          <FormFeedback>
                            {validation.errors.departmentContent}
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

export default Departments;
