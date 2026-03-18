import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Form, Row } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
    departmentName: Yup.string().required("Please select a department"),
    eventName: Yup.string().required("Please select an event"),
    studentCordinatorName: Yup.string().required("Please enter a name"),
    studentCordinatorId: Yup.string().required("Please enter college ID"),
    studentCordinatorCollege: Yup.string().required("Please select a college"),
    studentCordinatorPhone: Yup.number()
        .typeError("Phone number must be a valid number")
        .required("Please enter phone number")
        .test('len', 'Phone number must be exactly 10 digits', val => val && val.toString().length === 10),
    cordinatorImage: Yup.string().required("Please upload an image"),
    cordinatorEmail: Yup.string().email("Invalid email format").required("Please enter an email"),
});

const EditStudentForm = ({ isOpen, toggle, initialData, onSubmit }) => {
    const BaseUrl = process.env.REACT_APP_BASEURL;
    const [eventOptions, setEventOptions] = useState({});
    const [image, setImage] = useState('');
    const [dispImage, setDispImage] = useState('');

    // useEffect(() => {
    //     let isMounted = true; // Add a flag to track if the component is still mounted
    //     const fetchDepartmentsWithEvents = async () => {
    //       try {
    //         const response = await axios.get(BaseURL + "/api/get-departments-with-events");
    //         if (isMounted) {
    //           const obj = {};
    //           Object.entries(response.data).map(([key, events]) => {
    //             obj[key] = events.map((event) => ({
    //               value: event.eventName,
    //               label: event.eventName,
    //             }));
    //           });
    //           seteventOptions(obj);
    //         }
    //       } catch (err) {
    //         console.log(err);
    //       }
    //     };
    //     fetchDepartmentsWithEvents();
    //     return () => {
    //       isMounted = false; // Cleanup by setting isMounted to false
    //     };
    //   }, []);

    useEffect(() => {
        
        (async() => {
            try {
                const Result = await axios.get(BaseUrl + "/api/get-all-events");
                console.log(Result)
                const groupedEvents = Result.reduce((acc, current) => {
                    if (!acc[current.departmentName]) {
                        acc[current.departmentName] = [];
                    }
                    acc[current.departmentName].push(current.eventName);
                    return acc;
                }, {});
                // console.log("Asdfasdf",groupedEvents)
                setEventOptions(groupedEvents);
                console.log(groupedEvents)
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        })()
}, []);

    useEffect(() => {
        if (initialData) {
            formik.setValues(initialData);
            setDispImage(initialData.cordinatorImage);
        }
    }, [initialData]);

    const formik = useFormik({
        initialValues: {
            id:initialData?._id,
            departmentName: initialData?.departmentName || '',
            eventName: initialData?.eventName || '',
            studentCordinatorName: initialData?.cordinatorName || '',
            studentCordinatorId: initialData?.cordinatorId || '',
            studentCordinatorCollege: initialData?.cordinatorCollege || '',
            studentCordinatorPhone: initialData?.cordinatorPhone || '',
            studentCordinatorEmail: initialData?.cordinatorEmail || '',
            studentCordinatorImage: initialData?.cordinatorImage || '',
        },
        validationSchema,
        onSubmit: async (values) => {
            
        },        
        enableReinitialize: true,
    });

    const imageRef = useRef(null);
    const handleImageChange = (e) => {
        const fileImg = e.target.files[0];
        setImage(fileImg);
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setDispImage(fileReader.result);
        };
        fileReader.readAsDataURL(fileImg);
    };

    const SendData=async(event)=>{
        event.preventDefault();
        console.log('Submitting:', formik.values); // Add this line
            try {
                await axios.put(`${BaseUrl}/api/edit-student-cordinate`, formik.values);
                alert('Coordinator updated successfully');
                toggle(); // Close the modal
                window.location.href= "/vedaadmin/EditStudent";
            } catch (error) {
                console.error('Error updating coordinator:', error);
                alert('Failed to update coordinator');
                window.location.href= "/vedaadmin/EditStudent";
            }
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered style={{ maxWidth: '700px', width: '100%' }}>
            <ModalHeader className="bg-light p-3" toggle={toggle}>Edit Coordinator Details</ModalHeader>
            <Form  className="tablelist-form">
                <ModalBody>
                    <div style={{ padding: "0px 10px" }}>
                        <Row>
                            <Col lg="6" className="mb-3">
                                <label htmlFor="departmentName">Select Department:</label>
                                <select
                                    id="departmentName"
                                    name="departmentName"
                                    value={formik.values.departmentName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{border:"1px solid black"}}
                                    className={`form-select ${formik.errors.departmentName && formik.touched.departmentName ? 'is-invalid' : ''}`}
                                >
                                    <option value="">{"Select Department"}</option>
                                    {console.log(eventOptions)}
                                    {Object.keys(eventOptions).map((dept) => (
                                        <option key={dept} value={dept}>
                                            {dept.charAt(0).toUpperCase() + dept.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                {formik.errors.departmentName && formik.touched.departmentName && (
                                    <div className="invalid-feedback">{formik.errors.departmentName}</div>
                                )}
                            </Col>

                            <Col lg="6" className="mb-3">
                                <label htmlFor="eventName">Select Event:</label>
                                <select
                                    id="eventName"
                                    name="eventName"
                                    value={formik.values.eventName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{border:"1px solid black"}}
                                    className={`form-select ${formik.errors.eventName && formik.touched.eventName ? 'is-invalid' : ''}`}
                                >
                                    <option value="">{"Select Event"}</option>
                                    {eventOptions[formik.values.departmentName]?.map((event, index) => (
                                        <option key={index} value={event}>
                                            {event}
                                        </option>
                                    ))}
                                </select>
                                {formik.errors.eventName && formik.touched.eventName && (
                                    <div className="invalid-feedback">{formik.errors.eventName}</div>
                                )}
                            </Col>
                        </Row>

                        <Row>
                            <Col lg="6" className="mb-3">
                                <label htmlFor="studentCordinatorName" className="form-label">Coordinator Name</label>
                                <input
                                    type="text"
                                    id="studentCordinatorName"
                                    name="studentCordinatorName"
                                    className={`form-control ${formik.errors.studentCordinatorName && formik.touched.studentCordinatorName ? 'is-invalid' : ''}`}
                                    placeholder="Enter Name"
                                    value={formik.values.studentCordinatorName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{border:"1px solid black"}}
                                />
                                {formik.errors.studentCordinatorName && formik.touched.studentCordinatorName && (
                                    <div className="invalid-feedback">{formik.errors.studentCordinatorName}</div>
                                )}
                            </Col>

                            <Col lg="6" className="mb-3">
                                <label  className="form-input">Coordinator ID</label>
                                <input
                                    type="text"
                                    id="studentCordinatorId"
                                    name="studentCordinatorId"
                                    className={`form-control ${formik.errors.studentCordinatorId && formik.touched.studentCordinatorId ? 'is-invalid' : ''}`}
                                    placeholder="Enter ID"
                                    value={formik.values.studentCordinatorId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{border:"1px solid black"}}
                                />
                                {formik.errors.studentCordinatorId && formik.touched.studentCordinatorId && (
                                    <div className="invalid-feedback">{formik.errors.studentCordinatorId}</div>
                                )}
                            </Col>
                        </Row>

                        <Row>
                            <Col lg="6" className="mb-3">
                                <label htmlFor="studentCordinatorCollege" className="form-label">College</label>
                                <select
                                    id="studentCordinatorCollege"
                                    name="studentCordinatorCollege"
                                    value={formik.values.studentCordinatorCollege}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{border:"1px solid black"}}
                                    className={`form-select ${formik.errors.studentCordinatorCollege && formik.touched.studentCordinatorCollege ? 'is-invalid' : ''}`}
                                >
                                    <option value="">{"Select College"}</option>
                                    <option value="acet">ACET</option>
                                    <option value="aec">AEC</option>
                                    <option value="acoe">ACOE</option>
                                </select>
                                {formik.errors.studentCordinatorCollege && formik.touched.studentCordinatorCollege && (
                                    <div className="invalid-feedback">{formik.errors.studentCordinatorCollege}</div>
                                )}
                            </Col>

                            <Col lg="6" className="mb-3">
                                <label htmlFor="studentCordinatorPhone" className="form-label">Phone Number</label>
                                <input
                                    type="number"
                                    id="studentCordinatorPhone"
                                    name="studentCordinatorPhone"
                                    className={`form-control ${formik.errors.studentCordinatorPhone && formik.touched.studentCordinatorPhone ? 'is-invalid' : ''}`}
                                    placeholder="Enter Phone Number"
                                    value={formik.values.studentCordinatorPhone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{border:"1px solid black"}}
                                />
                                {formik.errors.studentCordinatorPhone && formik.touched.studentCordinatorPhone && (
                                    <div className="invalid-feedback">{formik.errors.studentCordinatorPhone}</div>
                                )}
                            </Col>
                        </Row>

                        <Row>
                            <Col lg="6" className="mb-3">
                                <label htmlFor="studentCordinatorEmail" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="studentCordinatorEmail"
                                    name="studentCordinatorEmail"
                                    className={`form-control ${formik.errors.studentCordinatorEmail && formik.touched.studentCordinatorEmail ? 'is-invalid' : ''}`}
                                    placeholder="Enter Email"
                                    value={formik.values.studentCordinatorEmail}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{border:"1px solid black"}}
                                />
                                {formik.errors.studentCordinatorEmail && formik.touched.studentCordinatorEmail && (
                                    <div className="invalid-feedback">{formik.errors.studentCordinatorEmail}</div>
                                )}
                            </Col>

                            {/* <Col lg="6" className="mb-3">
                                <label htmlFor="cordinatorImage" className="form-label">Upload Image</label>
                                <input
                                    type="file"
                                    id="cordinatorImage"
                                    name="cordinatorImage"
                                    className={`form-control ${formik.errors.cordinatorImage && formik.touched.cordinatorImage ? 'is-invalid' : ''}`}
                                    onChange={handleImageChange}
                                    ref={imageRef}
                                    style={{border:"1px solid black"}}
                                />
                                {formik.errors.cordinatorImage && formik.touched.cordinatorImage && (
                                    <div className="invalid-feedback">{formik.errors.cordinatorImage}</div>
                                )}
                                {dispImage && <img src={dispImage} alt="Coordinator" style={{ maxWidth: '100px', marginTop: '10px' }} />}
                            </Col> */}
                        </Row>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" onClick={(event) => SendData(event)} color="primary">Save Changes</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default EditStudentForm;
