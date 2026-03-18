import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormValidations = ({ onFormSubmit }) => {
  document.title = "Admin Portal";
  const BaseUrl = process.env.REACT_APP_BASEURL;

  // Department options
  // const [departmentOptions, setdepartmentOptions] = useState([
  //   { value: "", label: "Select Department" },
  //   { value: "CSE", label: "CSE & IT" },
  //   { value: "ECE", label: "ECE" },
  //   { value: "AIML", label: "AIML, IOT & DS" },
  //   { value: "PETROLEUM", label: "PETROLEUM" },
  //   { value: "MINING", label: "MINING" },
  //   { value: "EEE", label: "EEE" },
  //   { value: "MECHANICAL", label: "MECHANICAL" },
  //   { value: "AGRICULTURE", label: "AGRICULTURE" },
  //   { value: "CIVIL", label: "CIVIL" },
  // ]);

  const [isToggled, setIsToggled] = useState(false);
  const [selectEventCatOption, setSelectEventCatOption] = useState({});
  const [selectEventSubCatOption, setSelectSubEventCatOption] = useState({});

  const [selectedEventCatOption, setSelectedEventCatOption] = useState('');
  const [selecteventType, setselecteventType] = useState(["Solo", "Group"]);


  useEffect(() => {
    (async () => {
      const Result = await axios.get(BaseUrl + "/api/get-eventCatagory-data");
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

  // useEffect(() => {
  //   (async () => {
  //     const Result = await axios.get(BaseUrl + `/api/get-eventCatagory-header/${selectedEventCatOption}`);
  //     // console.log(result.data);
  //     const groupedEvents = Result.reduce((acc, current) => {
  //       // If the department does not exist in the accumulator, create an entry
  //       if (!acc[current.eventSubCatName]) {
  //         acc[current.eventSubCatName] = [];
  //       }
  //       // Add the event to the department's array
  //       acc[current.eventSubCatName].push(current.eventSubCatName);

  //       return acc;
  //     }, {});
  //     setSelectSubEventCatOption(groupedEvents)
  //     console.log(groupedEvents);
  //   })();
  // }, [selectedEventCatOption]);

  // useEffect(() => {
  //   (() => {
  //     axios.get(BaseUrl + "/api/get-unique-departments")
  //       .then(res => {
  //         var ar = [{ value: "", label: "Select Department" }]
  //         res.map(ele => {
  //           ar.push({ value: ele, label: ele })
  //         })
  //         setdepartmentOptions(ar)
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //   })();
  // }, [])
  // Initialize form validation
  const validation = useFormik({
    enableReinitialize: true,


    initialValues: {
      eventCatagoryName: "",
      eventSubCatName: "",
      eventName: "",
      eventType: "",
      price: "",
      overview: "",
      isAllowDivision: "",
      maxdivparticepants: "",
      divisions: [""],
      regulations: [""],
      maxTeamSize: "",
      minTeamSize: "",
      venue: ""
    },

    validationSchema: Yup.object({
      eventCatagoryName: Yup.string().required("Please Select a EventCatagoryName"),
      eventSubCatName: Yup.string().required("Please Select a EventSubCatName"),
      eventName: Yup.string().required("Please Enter the Event Name"),
      eventType: Yup.string().required("Please Enter the Event Type"),
      price: Yup.number()
        .typeError("Please enter a valid number")
        .required("Please Enter the Price"),
      // teamType: Yup.string().required("Please Select the Team Type"),
      overview: Yup.string().required("Please Enter an Overview"),
      divisions: Yup.array().of(
        Yup.string().required("Please Enter the Regulation")
      ),
      maxdivparticepants: Yup.string().required("Please Enter Max Div Particepants"),
      regulations: Yup.array().of(
        Yup.string().required("Please Enter the Regulation")
      ),
      maxTeamSize: Yup.number()
        .typeError("Please enter a valid number")
        .required("Please Enter the Maximum Team Size"),
      minTeamSize: Yup.number()
        .typeError("Please enter a valid number")
        .required("Please Enter the Minimum Team Size"),
      venue: Yup.string().required("Please Enter the Venue"),
      department: Yup.string().required("Please Select a Department"),
      eventImage: Yup.mixed()
        .required("Please upload the Event Image")
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
      console.log("Form submitted successfully");
      console.log("Form values:", values);

      if (onFormSubmit) {
        onFormSubmit(values);
      } else {
        console.warn("onFormSubmit prop is not provided");
      }
    },
  });

  const addRegulation = () => {
    validation.setFieldValue("regulations", [
      ...validation.values.regulations,
      "",
    ]);
  };

  const addDivision = () => {
    const maxDivisions = validation.values.maxdivparticepants;

    // Check if the max division limit is reached
    if (validation.values.divisions.length >= maxDivisions) {
      alert("You cannot add more divisions than the maximum allowed.");
      return;
    }
    validation.setFieldValue("divisions", [
      ...validation.values.divisions,
      "",
    ]);
  };

  const removeRegulation = (index) => {
    const updatedRegulations = validation.values.regulations.filter(
      (reg, idx) => idx !== index
    );
    validation.setFieldValue("regulations", updatedRegulations);
  };

  const removeDivision = (index) => {
    const updatedDivision = validation.values.divisions.filter(
      (reg, idx) => idx !== index
    );
    validation.setFieldValue("divisions", updatedDivision);
  };

  const handleToggle = () => {
    console.log('testing');
    setIsToggled((prevState) => !prevState);
  };

  const handleSelectCatName = async (e) => {
    const { value } = e.target;
    console.log(value);
    const Result = await axios.get(BaseUrl + `/api/get-eventCatagory-byCatname/${value}`);
    console.log(Result);
    const groupedEvents = Result.reduce((acc, current) => {
      // If the department does not exist in the accumulator, create an entry
      if (!acc[current.eventSubCatName]) {
        acc[current.eventSubCatName] = [];
      }
      // Add the event to the department's array
      acc[current.eventSubCatName].push(current.eventSubCatName);
      return acc;
    }, {});
    setSelectSubEventCatOption(groupedEvents)
    console.log(groupedEvents);
    setSelectedEventCatOption(value); // Update the hook with the selected value
    validation.handleChange(e);
  };

  // const handleSelectSubCat = (e) => {
  //   console.log(e.target.value);
  //   setSelectedEventSubCatOption(e.target.value);
  // };


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="BRANCH - EVENTS" breadcrumbItem="Add Event Form" />
          <Row>
            <Col className="cardBodyParent">
              <Card className="cardBody">
                <CardBody>
                  <h4 className="card-title">Add Event Form</h4>
                  <p className="card-title-desc">
                    Please Provide Valid Details.
                  </p>
                  <Form
                    className="needs-validation"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const FinalData = {
                        eventCatagoryName: selectedEventCatOption,
                        eventSubCatName: validation.values.eventSubCatName,
                        eventName: validation.values.eventName,
                        eventImage: validation.values.eventImage,
                        departmentName: validation.values.department,
                        eventType: validation.values.eventType,
                        price: validation.values.price,
                        maxTeamSize: validation.values.maxTeamSize,
                        minTeamSize: validation.values.minTeamSize,
                        venue: validation.values.venue,
                        overview: validation.values.overview,
                        divisions: validation.values.divisions,
                        maxdivparticepants: validation.values.maxdivparticepants,
                        regulations: validation.values.regulations,
                        isAllowDivision: isToggled,
                        // extraTeamSize: validation.values.extraTeamSize,
                        // extraAmountPerHead:
                        //   validation.values.extraAmountPerHead,
                        // createdBy: "User",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                      };
                      try {
                        console.log(FinalData);
                        const res = await axios.post(
                          BaseUrl + "/add-event",
                          FinalData, {
                          headers: {
                            'Content-Type': 'multipart/form-data',
                          },
                        }
                        );
                        if (res) {
                          toast.success('Event Added Successfully!', {
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
                            window.location.reload()
                          }, 2000);
                        }
                        console.log("Department data added successfully", res);
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
                        console.log(err)
                      }
                      validation.handleSubmit();
                    }}
                  >
                    <Row>
                      <Col lg="6" className="mb-3">
                        <label htmlFor="eventCatagoryName">Select Event Catagory Name:</label>
                        <select
                          id="eventCatagoryName"
                          name="eventCatagoryName"
                          value={selectedEventCatOption}
                          onChange={handleSelectCatName}
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
                      <Col lg="6" className="mb-3">
                        <label htmlFor="eventSubCatName">Select Event Sub Catagory Name:</label>
                        <select
                          id="eventSubCatName"
                          name="eventSubCatName"
                          value={validation.values.eventSubCatName}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          style={{ border: "1px solid black", color: "black", fontWeight: 500 }}
                          className={`form-select ${validation.errors.eventSubCatName && validation.touched.eventSubCatName ? 'is-invalid' : ''}`}
                        >
                          <option value="">Select Event Sub Catagory</option>
                          {Object.keys(selectEventSubCatOption).map((dept) => (
                            <option key={dept} value={dept}>
                              {dept.charAt(0).toUpperCase() + dept.slice(1)}
                            </option>
                          ))}
                        </select>
                        {validation.errors.eventSubCatName && validation.touched.eventSubCatName && (
                          <div className="invalid-feedback">{validation.errors.eventSubCatName}</div>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationEventName">
                            Event Name
                          </Label>
                          <Input
                            name="eventName"
                            placeholder="Event Name"
                            type="text"
                            className="form-control"
                            id="validationEventName"
                            style={{ border: "1px solid black", color: "black", fontWeight: 500 }}
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
                            placeholder="Price"
                            type="number"
                            className="form-control"
                            id="validationPrice"
                            style={{ border: "1px solid black", color: "black", fontWeight: 500 }}
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
                      <Row>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="eventImage">Event Image</Label>
                            <Input
                              type="file"
                              name="eventImage"
                              className="form-control"
                              onChange={(event) => {
                                const file = event.currentTarget.files[0];
                                validation.setFieldValue("eventImage", file);
                              }}
                              style={{ border: "1px solid black", color: "black", fontWeight: 500 }}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.eventImage &&
                                  validation.errors.eventImage
                                  ? true
                                  : false
                              }
                            />
                            <FormFeedback>
                              {validation.errors.eventImage}
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col lg="6" className="mb-3">
                          <label htmlFor="eventType">Select Event Type:</label>
                          <select
                            id="eventType"
                            name="eventType"
                            value={validation.values.eventType}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            style={{ border: "1px solid black", color: "black", fontWeight: 500 }}
                            className={`form-select ${validation.errors.eventType && validation.touched.eventType ? 'is-invalid' : ''}`}
                          >
                            <option value="">Select Event Type</option>
                            {selecteventType.map((dept) => (
                              <option key={dept} value={dept}>
                                {dept.charAt(0).toUpperCase() + dept.slice(1)}
                              </option>
                            ))}
                          </select>
                          {validation.errors.eventType && validation.touched.eventType && (
                            <div className="invalid-feedback">{validation.errors.eventType}</div>
                          )}
                        </Col>
                      </Row>
                      <Row>
                       
                      </Row>
                      
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationMinTeamSize">
                            Min Team Size
                          </Label>
                          <Input
                            name="minTeamSize"
                            placeholder="Minimum Team Size"
                            type="number"
                            className="form-control"
                            id="validationMinTeamSize"
                            style={{ border: "1px solid black", color: "black", fontWeight: 500 }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.minTeamSize || ""}
                            invalid={
                              validation.touched.minTeamSize &&
                                validation.errors.minTeamSize
                                ? true
                                : false
                            }
                          />
                          {validation.touched.minTeamSize &&
                            validation.errors.minTeamSize ? (
                            <FormFeedback type="invalid">
                              {validation.errors.minTeamSize}
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
                            placeholder="Maximum Team Size"
                            type="number"
                            className="form-control"
                            id="validationMaxTeamSize"
                            style={{ border: "1px solid black", color: "black", fontWeight: 500 }}
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
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationVenue">Venue</Label>
                          <Input
                            name="venue"
                            placeholder="Venue"
                            type="text"
                            className="form-control"
                            id="validationVenue"
                            style={{ border: "1px solid black", color: "black", fontWeight: 500 }}
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

                    <Row>
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationOverview">Overview</Label>
                        <Input
                          type="textarea"
                          name="overview"
                          placeholder="Overview"
                          className="form-control"
                          id="validationOverview"
                          style={{ border: "1px solid black", color: "black", fontWeight: 500 }}
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
                    </Row>

                    <Row>
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationRegulation">
                          Rules (Enter the regulation in form of points.)
                        </Label>
                        {validation.values.regulations.map(
                          (regulation, index) => (
                            <div key={index} className="mb-2">
                              <div className="d-flex align-items-start">
                                <Input
                                  type="textarea"
                                  name={`regulations[${index}]`}
                                  placeholder={`Regulation ${index + 1}`}
                                  className={`form-control me-2 ${validation.touched.regulations &&
                                    validation.touched.regulations[index] &&
                                    validation.errors.regulations &&
                                    validation.errors.regulations[index]
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                    style={{ border: "1px solid black", color: "black", fontWeight: 500 }}
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.regulations[index]}
                                />
                                <Button
                                  color="danger"
                                  onClick={() => removeRegulation(index)}
                                  disabled={
                                    validation.values.regulations.length === 1
                                  }
                                >
                                  Remove
                                </Button>
                              </div>
                              {validation.touched.regulations &&
                                validation.touched.regulations[index] &&
                                validation.errors.regulations &&
                                validation.errors.regulations[index] ? (
                                <FormFeedback
                                  type="invalid"
                                  className="d-block"
                                >
                                  {validation.errors.regulations[index]}
                                </FormFeedback>
                              ) : null}
                            </div>
                          )
                        )}
                        <Button
                          color="secondary"
                          className="mt-2"
                          onClick={addRegulation}
                        >
                          Add Regulation
                        </Button>
                      </FormGroup>
                    </Row>
                    
                    <Row>
                      <Col md="6">
                        <Label htmlFor="AllowVisible">
                          Allow Visible
                        </Label><br></br>
                        <Button
                          className={`btn ${isToggled ? "btn-danger" : "btn-success"}`}
                          onClick={handleToggle}
                        >
                          {isToggled ? "Off Divisions" : "Add Divisions"}
                        </Button>
                      </Col>
                    </Row>
                    <br></br>
                    {isToggled &&
                      (<div><Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationPrice">Max Division particepations
                          </Label>
                          <Input
                            name="maxdivparticepants"
                            placeholder="Max Division Particepations"
                            type="number"
                            className="form-control"
                            id="validationMaxDivisionParticepations"
                            style={{ border: "1px solid black", color: "black", fontWeight: 500 }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.maxdivparticepants || ""}
                            invalid={
                              validation.touched.maxdivparticepants &&
                                validation.errors.maxdivparticepants
                                ? true
                                : false
                            }
                          />
                          {validation.touched.maxdivparticepants &&
                            validation.errors.maxdivparticepants ? (
                            <FormFeedback type="invalid">
                              {validation.errors.maxdivparticepants}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>

                        <Row>
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationRegulation">
                              Divisions (Enter the divisions in form of points.)
                            </Label>
                            {validation.values.divisions.map(
                              (regulation, index) => (
                                <div key={index} className="mb-2">
                                  <div className="d-flex align-items-start">
                                    <Input
                                      type="textarea"
                                      name={`divisions[${index}]`}
                                      placeholder={`Divisions ${index + 1}`}
                                      className={`form-control me-2 ${validation.touched.divisions &&
                                        validation.touched.divisions[index] &&
                                        validation.errors.divisions &&
                                        validation.errors.divisions[index]
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                        style={{ border: "1px solid black", color: "black", fontWeight: 500 }}
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={validation.values.divisions[index]}
                                    />
                                    <Button
                                      color="danger"
                                      onClick={() => removeDivision(index)}
                                      disabled={
                                        validation.values.divisions.length === 1
                                      }
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                  {validation.touched.divisions &&
                                    validation.touched.divisions[index] &&
                                    validation.errors.divisions &&
                                    validation.errors.divisions[index] ? (
                                    <FormFeedback
                                      type="invalid"
                                      className="d-block"
                                    >
                                      {validation.errors.divisions[index]}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              )
                            )}
                            <Button
                              color="secondary"
                              className="mt-2"
                              onClick={addDivision}
                            >
                              Add Divisions
                            </Button>
                          </FormGroup>
                        </Row></div>)}

                    <Row className="mt-3">
                      <Col className="d-flex justify-content-end">
                        <Button color="primary" type="submit">
                          Submit
                        </Button>
                      </Col>
                    </Row>
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

export default FormValidations;
