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

const FormValidations = ({ onFormSubmit }) => {
  document.title = "Form Validation | Upzet - React Admin & Dashboard Template";

  // Initialize form validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      eventName: "",
      price: "",
      teamType: "",
      overview: "",
      regulation: "",
      maxTeamSize: "",
      venue: "",
      department: "",
    },

    validationSchema: Yup.object({
      eventName: Yup.string().required("Please Enter the Event Name"),
      price: Yup.number()
        .typeError("Please enter a valid number")
        .required("Please Enter the Price"),
      teamType: Yup.string().required("Please Select the Team Type"),
      overview: Yup.string().required("Please Enter an Overview"),
      regulation: Yup.string().required("Please Enter the Regulations"),
      maxTeamSize: Yup.number()
        .typeError("Please enter a valid number")
        .required("Please Enter the Maximum Team Size"),
      venue: Yup.string().required("Please Enter the Venue"),
      department: Yup.string().required("Please Select a Department"),
    }),

    onSubmit: (values) => {
      console.log("Form submitted successfully");
      console.log("Form values:", values);

      if (onFormSubmit) {
        onFormSubmit(values);
      } else {
        console.warn("onFormSubmit prop is not provided");
      }
    },
  });

  // console.log("Form values:", validation.values);


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Form Validation" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h4 className="card-title">Event Form Validation</h4>
                  <p className="card-title-desc">
                    Provide valuable, actionable feedback to your users with
                    HTML5 form validation.
                  </p>
                  <Form
                    className="needs-validation"
                    onSubmit={(e) => {
                      e.preventDefault();
                      // console.log(validation.values);
                      validation.handleSubmit();
                    }}
                  >
                    {/* Form fields */}
                    <Row>
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationDepartment">Department</Label>
                        <Input
                          type="select"
                          name="department"
                          className="form-control"
                          id="validationDepartment"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.department || ""}
                          invalid={
                            validation.touched.department &&
                            Boolean(validation.errors.department)
                          }
                        >
                          <option value="">Select Department</option>
                          <option value="CSE">CSE & IT</option>
                          <option value="ECE">ECE</option>
                          <option value="AIML">AIML,IOT & DS</option>
                          <option value="PET">PETROLEUM</option>
                          <option value="MIN">MINING</option>
                          <option value="EEE">EEE</option>
                          <option value="MECH">MECHANICAL</option>
                          <option value="AGRI">AGRICULTURE</option>
                          <option value="CIVIL">CIVIL</option>
                        </Input>
                        {validation.touched.department &&
                        validation.errors.department ? (
                          <FormFeedback type="invalid">
                            {validation.errors.department}
                          </FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Row>
                    {/* Additional fields */}
                    <Row>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationEventName">Event Name</Label>
                            <Input
                              name="eventName"
                              placeholder="Enter Event Name"
                              type="text"
                              className="form-control"
                              id="validationEventName"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.eventName || ""}
                              invalid={
                                validation.touched.eventName &&
                                validation.errors.eventName
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.eventName &&
                            validation.errors.eventName ? (
                              <FormFeedback type="invalid">
                                {validation.errors.eventName}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationPrice">Price</Label>
                            <Input
                              name="price"
                              placeholder="Enter Price"
                              type="number"
                              className="form-control"
                              id="validationPrice"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.price || ""}
                              invalid={
                                validation.touched.price &&
                                validation.errors.price
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.price &&
                            validation.errors.price ? (
                              <FormFeedback type="invalid">
                                {validation.errors.price}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationTeamType">Team Type</Label>
                            <Input
                              type="select"
                              name="teamType"
                              className="form-control"
                              id="validationTeamType"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.teamType || ""}
                              invalid={
                                validation.touched.teamType &&
                                validation.errors.teamType
                                  ? true
                                  : false
                              }
                            >
                              <option value="">Select</option>
                              <option value="Solo">Solo</option>
                              <option value="Team">Team</option>
                            </Input>
                            {validation.touched.teamType &&
                            validation.errors.teamType ? (
                              <FormFeedback type="invalid">
                                {validation.errors.teamType}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationMaxTeamSize">
                              Max Team Size
                            </Label>
                            <Input
                              name="maxTeamSize"
                              placeholder="Enter Maximum Team Size"
                              type="number"
                              className="form-control"
                              id="validationMaxTeamSize"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.maxTeamSize || ""}
                              invalid={
                                validation.touched.maxTeamSize &&
                                validation.errors.maxTeamSize
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.maxTeamSize &&
                            validation.errors.maxTeamSize ? (
                              <FormFeedback type="invalid">
                                {validation.errors.maxTeamSize}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationOverview">Overview</Label>
                            <Input
                              type="textarea"
                              name="overview"
                              placeholder="Enter Overview"
                              className="form-control"
                              id="validationOverview"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.overview || ""}
                              invalid={
                                validation.touched.overview &&
                                validation.errors.overview
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.overview &&
                            validation.errors.overview ? (
                              <FormFeedback type="invalid">
                                {validation.errors.overview}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationRegulation">Regulation</Label>
                            <Input
                              type="textarea"
                              name="regulation"
                              placeholder="Enter Regulations"
                              className="form-control"
                              id="validationRegulation"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.regulation || ""}
                              invalid={
                                validation.touched.regulation &&
                                validation.errors.regulation
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.regulation &&
                            validation.errors.regulation ? (
                              <FormFeedback type="invalid">
                                {validation.errors.regulation}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationVenue">Venue</Label>
                            <Input
                              name="venue"
                              placeholder="Enter Venue"
                              type="text"
                              className="form-control"
                              id="validationVenue"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.venue || ""}
                              invalid={
                                validation.touched.venue &&
                                validation.errors.venue
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.venue &&
                            validation.errors.venue ? (
                              <FormFeedback type="invalid">
                                {validation.errors.venue}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                    <Button color="primary" type="submit">
                      Submit
                    </Button>
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

export default FormValidations;
