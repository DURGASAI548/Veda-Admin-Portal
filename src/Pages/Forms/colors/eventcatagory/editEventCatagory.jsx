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
import { useEffect } from "react";

const EditEventCatagory = () => {
  document.title = "Colours Admin";
  const [totalCatgories, setTotalCatgories] = useState([]);
  const [updatedCatagory, setUpdatedCatagory] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [removeData, setRemoveData] = useState({});
    
  

  useEffect(() => {
    axios.get("http://localhost:2001/api/get-eventCatagory-data")
      .then((result) => {
        setTotalCatgories(result);
        console.log(result);
      }).catch((er) => {
        console.log(er);
      })
  }, [])

  

  const handleChange = (index, eventCatagory, value) => {
    const dumyevents = [...totalCatgories];
    dumyevents[index][eventCatagory] = value;
    setTotalCatgories(dumyevents);
  }

  const handleShow = (dt) => {
    setShowModal(true)
    setRemoveData(dt)
  };

  const editCatagory = (catagoryId, updatedCatagory) => {

    console.log(updatedCatagory.eventCatagoryName);
    // Create a FormData object to handle file uploads
    // const formData = new FormData();
    // formData.append('eventCatagoryName', updatedCatagory.eventCatagoryName);

    const mydata = {'eventCatagoryName': updatedCatagory.eventCatagoryName};
        try {
          const response = axios.put(`${process.env.REACT_APP_BASEURL}/api/edit-eventCatagory/${catagoryId}`, mydata);
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
  }

  const handleClose = () => setShowModal(false);
  const handleSaveChanges = () => {
      console.log('Changes saved!');
      deleteEventCatagory(removeData)
      setShowModal(false);
  };


  const deleteEventCatagory = (catId) => {
    console.log(catId);

    axios.delete(`${process.env.REACT_APP_BASEURL}/api/delete-eventCatagory/${catId}`)
    .then((result) => {
      console.log(result)
      window.location.href="/EventCatagory"
    }).catch((er) => {
      console.log(er);
    })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="BRANCH - EVENTS" breadcrumbItem="Add Event Catagory" />
          <Row>
            <Col className="cardBodyParent">
              <Card className="cardBody">
                <CardBody>
                  <h4 className="card-title">Edit Event Catagory Form</h4>
                  {console.log(totalCatgories)}
                  {totalCatgories && totalCatgories.map((catagory, index) => {
                    return (
                      <Form
                        className="needs-validation"
                        style={{ marginTop: '40px' }}
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
                                value={totalCatgories[index]?.eventCategoryName || catagory.eventCatagoryName}
                                onChange={(e) => handleChange(index, "eventCatagoryName", e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <Button color="primary" onClick={() => editCatagory(catagory._id, totalCatgories[index])}>
                              Edit
                            </Button>
                            <Button color="danger" style = {{marginLeft : "10px"}} onClick={() => handleShow(catagory._id)}>
                              Delete
                            </Button>
                          </Col>
                        </Row>
                        <ToastContainer />
                      </Form>
                    )
                  })}
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
                <p>Are You sure to Delete Event Catagory</p>
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

export default EditEventCatagory;
