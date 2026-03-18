import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Form, Row } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object({
    departmentName: Yup.string().required("Please select a department"),
    eventName: Yup.string().required("Please select an event"),
    cordinatorName: Yup.string().required("Please enter a name"),
    cordinatorId: Yup.string().required("Please enter college ID"),
    cordinatorCollege: Yup.string().required("Please select a college"),
    cordinatorPhone: Yup.number()
        .typeError("Phone number must be a valid number")
        .required("Please enter phone number")
        .test('len', 'Phone number must be exactly 10 digits', val => val && val.toString().length === 10),
    cordinatorImage: Yup.string().required("Please upload an image"),
    cordinatorEmail: Yup.string().email("Invalid email format").required("Please enter an email"),
});

const EditFacultyForm = ({ isOpen, toggle, initialData, onSubmit }) => {
    const [image, setImage] = useState('');
    const [dispImage, setDispImage] = useState('');
    const BaseUrl = process.env.REACT_APP_BASEURL;
    const [eventOptions, seteventOptions] = useState({})
    console.log(initialData)
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
                    seteventOptions(groupedEvents);
                } catch (error) {
                    console.error("Error fetching events:", error);
                }
            })()
    }, []);
    // useEffect(() => {
        // console.log(eventOptions)
    // },[eventOptions])

    const formik = useFormik({
        initialValues: {
            departmentName: initialData?.departmentName || '',
            eventName: initialData?.eventName || '',
            cordinatorName: initialData?.cordinatorName || '',
            cordinatorId: initialData?.cordinatorId || '',
            cordinatorCollege: initialData?.cordinatorCollege || '',
            cordinatorPhone: initialData?.cordinatorPhone || '',
            cordinatorEmail: initialData?.cordinatorEmail || '',
            cordinatorImage: initialData?.cordinatorImage || '',
            _id:initialData?._id || ''
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log("values",values);
            try {
                const formData = new FormData();
                for (let key in values) {
                    if(key!=='cordinatorImage'){
                        formData.append(key, values[key]);
                    }
                }
                if (image) {
                    formData.append('cordinatorImage', image);
                }
                 
                // console.log(formData);
                const response = await axios.put(`${BaseUrl}/api/edit-faculty-cordinate`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success('Coordinator Updated Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                window.location.href="/vedaadmin/EditFaculty"
                onSubmit(response.data); // Notify parent component or reset the form
            } catch (error) {
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
                console.error("Error updating data:", error);
            }
        },
        enableReinitialize: true,
    });

    const imageRef = useRef(null);
    const handleImageChange = (e) => {
        const fileImg = e.target.files[0];
        if (fileImg) {
            setImage(fileImg);
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setDispImage(fileReader.result);
            };
            fileReader.readAsDataURL(fileImg);
        }
    };

    const defaultImage = "https://info.aec.edu.in/AEC/StudentPhotos/22A91A61E5.jpg";
    const imageSrc = image ? dispImage : `${BaseUrl}/public/Faculty_Images/${initialData?.cordinatorImage}` || defaultImage;

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered style={{ maxWidth: '700px', width: '100%' }}>
            <ModalHeader className="bg-light p-3" toggle={toggle}>Edit Coordinator Details</ModalHeader>
            <Form onSubmit={formik.handleSubmit} className="tablelist-form">
                <ModalBody>
                    <div style={{ padding: "0px 10px" }}>
                        <div className='mb-3' style={{ display: "flex", justifyContent: "center", width: "100%", height: "170px" }}>
                            <div style={{ height: "170px", width: "170px", position: "relative" }}>
                                <img style={{ cursor: 'pointer', height: "170px", width: "165px", borderRadius: "50%" }} src={imageSrc} alt="profileImg" />
                            </div>
                            <input
                                style={{ opacity: 0, position: "absolute", top: "3%", height: "150px", width: "150px", cursor: "pointer" }}
                                type="file"
                                ref={imageRef}
                                onChange={handleImageChange}
                            />
                        </div>
                        {console.log(eventOptions)}
                        <Row>
                            <Col lg="6" className="mb-3">
                                <label htmlFor="departmentName">Select Department:</label>
                                <select
                                    id="departmentName"
                                    name="departmentName"
                                    value={formik.values.departmentName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`form-select ${formik.errors.departmentName && formik.touched.departmentName ? 'is-invalid' : ''}`}
                                >
                                    <option value="">{"Select Department"}</option>
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
                                <label htmlFor="cordinatorName" className="form-label">Coordinator Name</label>
                                <input
                                    type="text"
                                    id="cordinatorName"
                                    name="cordinatorName"
                                    className={`form-control ${formik.errors.cordinatorName && formik.touched.cordinatorName ? 'is-invalid' : ''}`}
                                    placeholder="Enter Name"
                                    value={formik.values.cordinatorName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.cordinatorName && formik.touched.cordinatorName && (
                                    <div className="invalid-feedback">{formik.errors.cordinatorName}</div>
                                )}
                            </Col>

                            <Col lg="6" className="mb-3">
                                <label htmlFor="cordinatorId" className="form-input">Coordinator ID</label>
                                <input
                                    type="text"
                                    id="cordinatorId"
                                    name="cordinatorId"
                                    className={`form-control ${formik.errors.cordinatorId && formik.touched.cordinatorId ? 'is-invalid' : ''}`}
                                    placeholder="Enter ID"
                                    value={formik.values.cordinatorId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.cordinatorId && formik.touched.cordinatorId && (
                                    <div className="invalid-feedback">{formik.errors.cordinatorId}</div>
                                )}
                            </Col>
                        </Row>

                        <Row>
                            <Col lg="6" className="mb-3">
                                <label htmlFor="cordinatorCollege" className="form-label">College</label>
                                <select
                                    id="cordinatorCollege"
                                    name="cordinatorCollege"
                                    value={formik.values.cordinatorCollege}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`form-select ${formik.errors.cordinatorCollege && formik.touched.cordinatorCollege ? 'is-invalid' : ''}`}
                                >
                                    <option value="">Select College</option>
                                    <option value="ACET">ACET</option>
                                    <option value="AEC">AEC</option>
                                </select>
                                {formik.errors.cordinatorCollege && formik.touched.cordinatorCollege && (
                                    <div className="invalid-feedback">{formik.errors.cordinatorCollege}</div>
                                )}
                            </Col>

                            <Col lg="6" className="mb-3">
                                <label htmlFor="cordinatorPhone" className="form-label">Phone Number</label>
                                <input
                                    type="number"
                                    id="cordinatorPhone"
                                    name="cordinatorPhone"
                                    className={`form-control ${formik.errors.cordinatorPhone && formik.touched.cordinatorPhone ? 'is-invalid' : ''}`}
                                    placeholder="Enter Phone Number"
                                    value={formik.values.cordinatorPhone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.cordinatorPhone && formik.touched.cordinatorPhone && (
                                    <div className="invalid-feedback">{formik.errors.cordinatorPhone}</div>
                                )}
                            </Col>
                        </Row>

                        <Row>
                            <Col lg="12" className="mb-3">
                                <label htmlFor="cordinatorEmail" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="cordinatorEmail"
                                    name="cordinatorEmail"
                                    className={`form-control ${formik.errors.cordinatorEmail && formik.touched.cordinatorEmail ? 'is-invalid' : ''}`}
                                    placeholder="Enter Email"
                                    value={formik.values.cordinatorEmail}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.cordinatorEmail && formik.touched.cordinatorEmail && (
                                    <div className="invalid-feedback">{formik.errors.cordinatorEmail}</div>
                                )}
                            </Col>
                        </Row>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" onClick={toggle} color="light" className="btn-sm">Cancel</Button>
                    <Button type="submit" color="success" className="btn-sm">Update</Button>
                </ModalFooter>
                <ToastContainer />
            </Form>
        </Modal>
    );
};

export default EditFacultyForm;
