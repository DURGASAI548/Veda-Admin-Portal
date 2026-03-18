import React, { useState, useEffect } from "react";
import axios from "axios";
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
import "../../cardUpdate.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = ({ onFormSubmit }) => {
  document.title = "Form Validation | Upzet - React Admin & Dashboard Template";
  const BaseURL = process.env.REACT_APP_BASEURL;
  // Department and Event options
  const [departmentOptions, setdepartmentOptions] = useState([
    { value: "", label: "Select Department" },
    { value: "CSE", label: "CSE & IT" },
    { value: "ECE", label: "ECE" },
    { value: "AIML", label: "AIML, IOT & DS" },
    { value: "PETROLEUM", label: "PETROLEUM" },
    { value: "MINING", label: "MINING" },
    { value: "EEE", label: "EEE" },
    { value: "MECHANICAL", label: "MECHANICAL" },
    { value: "AGRICULTURE", label: "AGRICULTURE" },
    { value: "CIVIL", label: "CIVIL" },
  ]);
  const [eventOptions, seteventOptions] = useState({
    CSE: [
      { value: "CSE1", label: "Web Design" },
      { value: "CSE2", label: "Coding Contest" },
    ],
    ECE: [
      { value: "ECE1", label: "Project Presentation" },
      { value: "ECE2", label: "Circuit Design" },
    ],
    AIML: [
      { value: "AIML1", label: "AI Workshop" },
      { value: "AIML2", label: "ML Contest" },
    ],
    PETROLEUM: [
      { value: "CSE1", label: "Web Design" },
      { value: "CSE2", label: "Coding Contest" },
    ],
    MINING: [
      { value: "ECE1", label: "Project Presentation" },
      { value: "ECE2", label: "Circuit Design" },
    ],
    EEE: [
      { value: "AIML1", label: "AI Workshop" },
      { value: "AIML2", label: "ML Contest" },
    ],
    MECHANICAL: [
      { value: "CSE1", label: "Web Design" },
      { value: "CSE2", label: "Coding Contest" },
    ],
    AGRICULTURE: [
      { value: "ECE1", label: "Project Presentation" },
      { value: "ECE2", label: "Circuit Design" },
    ],
    CIVIL: [
      { value: "AIML1", label: "AI Workshop" },
      { value: "AIML2", label: "ML Contest" },
    ],
    // ... Add other departments and their events here
  });
  useEffect(() => {
    axios.get(BaseURL + "/api/get-department-data")
      .then(res => {
        var ar = [];
        ar.push({ value: "", label: "Select Department" })
        res.map(ele => {
          ar.push({ value: ele.departmentName, label: ele.departmentName })
        })
        // console.log(ar)
        setdepartmentOptions(ar)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  // Department and Event options

  useEffect(() => {
    axios.get(BaseURL + "/api/get-departments-with-events")
      .then(res => {
        // console.log(res)
        let obj = {};
        Object.entries(res).map(ele => {
          var a = [];
          ele[1].map(element => {
            a.push({ value: element.eventName, label: element.eventName })
          })
          obj[ele[0]] = a;
        })
        // console.log(obj)
        seteventOptions(obj)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const [selectedDepartment, setSelectedDepartment] = useState("");

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      facultyName: "",
      phoneNumber: "",
      collegeId: "",
      email: "",
      photo: null,
      department: "",
      event: "",
      college: "",
    },

    validationSchema: Yup.object({
      facultyName: Yup.string().required("Please Enter the Faculty Name"),
      phoneNumber: Yup.number()
        .typeError("Please enter a valid phone number")
        .required("Please Enter the Phone Number")
        .test('len', 'Phone number must be exactly 10 digits', val => val && val.toString().length === 10),
      collegeId: Yup.string().required("Please Enter the College ID"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Please Enter the Email"),
      department: Yup.string().required("Please Select a Department"),
      event: Yup.string().required("Please Select an Event"),
      college: Yup.string().required("Please Select a College"),
    }),

    onSubmit: (values) => {
      console.log(values)
      const StudentData = {
        departmentName: values.department,
        eventName: values.event,
        studentCordinatorName: values.facultyName,
        studentCordinatorId: values.collegeId,
        studentCordinatorCollege: values.college,
        studentCordinatorPhone: values.phoneNumber,
        studentCordinatorEmail: values.email,
        createdBy: 'DSP',
        createdAt: new Date(),
        updatedAt: new Date(),

      }
      axios.post(BaseURL + "/api/add-student-cordinate", StudentData)
        .then(res => {
          toast.success('Student Added Successfully!', {
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
            window.location.href = "/vedaadmin/ViewStudent"
          }, 2500);
          console.log(res)
        })
        .catch(err => {
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
          console.log(err)
        })
      console.log("Form submitted successfully");
      console.log("Form values:", values);
      if (onFormSubmit) {
        onFormSubmit(values);
      } else {
        console.warn("onFormSubmit prop is not provided");
      }
    },
  });

  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setSelectedDepartment(department);
    validation.setFieldValue("department", department);
    validation.setFieldValue("event", ""); // Reset event when department changes
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="COORDINATORS" breadcrumbItem="Add Student Admin" />
          <Row>
            <Col className="cardBodyParent">
              <Card className="cardBody">
                <CardBody>
                  <h4 className="card-title">Add Student Form</h4>
                  <p className="card-title-desc">
                   Please Provide Valid Details.
                  </p>
                  <Form
                    className="needs-validation"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                    }}
                  >
                    <Row>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationDepartment">
                            Department
                          </Label>
                          <Input
                            type="select"
                            name="department"
                            className="form-control"
                            id="validationDepartment"
                            onChange={handleDepartmentChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.department || ""}
                            invalid={
                              validation.touched.department &&
                              Boolean(validation.errors.department)
                            }
                          >
                            {departmentOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Input>
                          {validation.touched.department &&
                            validation.errors.department ? (
                            <FormFeedback type="invalid">
                              {validation.errors.department}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationEvent">Events</Label>
                          <Input
                            type="select"
                            name="event"
                            className="form-control"
                            id="validationEvent"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.event || ""}
                            invalid={
                              validation.touched.event &&
                              Boolean(validation.errors.event)
                            }
                          >
                            <option value="">Select Event</option>
                            {selectedDepartment &&
                              eventOptions[selectedDepartment] &&
                              eventOptions[selectedDepartment].map((event) => (
                                <option key={event.value} value={event.value}>
                                  {event.label}
                                </option>
                              ))}
                          </Input>
                          {validation.touched.event &&
                            validation.errors.event ? (
                            <FormFeedback type="invalid">
                              {validation.errors.event}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationFacultyName">
                            Student Name
                          </Label>
                          <Input
                            name="facultyName"
                            placeholder="Student Name"
                            type="text"
                            className="form-control"
                            id="validationFacultyName"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.facultyName || ""}
                            invalid={
                              validation.touched.facultyName &&
                                validation.errors.facultyName
                                ? true
                                : false
                            }
                          />
                          {validation.touched.facultyName &&
                            validation.errors.facultyName ? (
                            <FormFeedback type="invalid">
                              {validation.errors.facultyName}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationPhoneNumber">Phone No</Label>
                          <Input
                            name="phoneNumber"
                            placeholder="Mobile Number"
                            type="number"
                            className="form-control"
                            id="validationPhoneNumber"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.phoneNumber || ""}
                            invalid={
                              validation.touched.phoneNumber &&
                                validation.errors.phoneNumber
                                ? true
                                : false
                            }
                          />
                          {validation.touched.phoneNumber &&
                            validation.errors.phoneNumber ? (
                            <FormFeedback type="invalid">
                              {validation.errors.phoneNumber}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCollegeId">College Id</Label>
                          <Input
                            name="collegeId"
                            placeholder="College ID"
                            type="text"
                            className="form-control"
                            id="validationCollegeId"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.collegeId || ""}
                            invalid={
                              validation.touched.collegeId &&
                                validation.errors.collegeId
                                ? true
                                : false
                            }
                          />
                          {validation.touched.collegeId &&
                            validation.errors.collegeId ? (
                            <FormFeedback type="invalid">
                              {validation.errors.collegeId}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationEmail">Email</Label>
                          <Input
                            name="email"
                            placeholder="Email"
                            type="email"
                            className="form-control"
                            id="validationEmail"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                                validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                            validation.errors.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      {/* <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationPhoto">Your Photo</Label>
                          <Input
                            type="file"
                            name="photo"
                            className="form-control"
                            id="validationPhoto"
                            onChange={(event) =>
                              validation.setFieldValue(
                                "photo",
                                event.currentTarget.files[0]
                              )
                            }
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.photo &&
                              validation.errors.photo
                                ? true
                                : false
                            }
                          />
                          {validation.touched.photo &&
                          validation.errors.photo ? (
                            <FormFeedback type="invalid">
                              {validation.errors.photo}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col> */}
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCollege">College</Label>
                          <Input
                            type="select"
                            name="college"
                            className="form-control"
                            id="validationCollege"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.college || ""}
                            invalid={
                              validation.touched.college &&
                              Boolean(validation.errors.college)
                            }
                          >
                            <option value="">Select College</option>
                            <option value="aec">AEC</option>
                            <option value="acet">ACET</option>
                            <option value="acoe">ACOE</option>
                          </Input>
                          {validation.touched.college &&
                            validation.errors.college ? (
                            <FormFeedback type="invalid">
                              {validation.errors.college}
                            </FormFeedback>
                          ) : null}
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

export default AddStudent;
