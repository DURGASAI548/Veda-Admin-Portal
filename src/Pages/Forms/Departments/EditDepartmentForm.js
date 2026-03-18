import React, { useState, useEffect } from 'react';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Form, Row } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object({
    eventCatagoryName: Yup.string().required("Please enter event Catagory Name"),
    eventSubCatName: Yup.string().required("Please enter event Sub Catagory Name"),
    eventSubCatImage: Yup.mixed(),
});

const FormModal = ({ isOpen, toggle, initialData, onSubmit }) => {
    const BaseUrl = process.env.REACT_APP_BASEURL;
    const [image1, setImage1] = useState(null);
    const [eventCatOptions, setEventCatOptions] = useState({})

    useEffect(() => {
        (async () => {
            const Result = await axios.get(BaseUrl + "/api/get-eventCatagory-data");
            const groupedEvents = Result.reduce((acc, current) => {
                if (!acc[current.eventCatagoryName]) {
                    acc[current.eventCatagoryName] = [];
                }
                acc[current.eventCatagoryName].push(current.eventCatagoryName);
                return acc;
            }, {});
            setEventCatOptions(groupedEvents)
            console.log(groupedEvents);
        })();
    }, [])

    const formik = useFormik({
        initialValues: {
            eventCatagoryName: initialData?.eventCatagoryName || '',
            eventSubCatName: initialData?.eventSubCatName || '',
            eventSubCatImage: null,
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('eventCatagoryName', values.eventCatagoryName);
            formData.append('eventSubCatName', values.eventSubCatName);
            if (image1) formData.append('eventSubCatImage', image1);
        }
    });

    useEffect(() => {
        if (initialData) {
            formik.setValues({
                eventCatagoryName: initialData.eventCatagoryName,
                eventSubCatName: initialData.eventSubCatName,
                eventSubCatImage: null, // We will handle this separately
            });
            setImage1(null); // Clear any previously selected image
        }
    }, [initialData]);

    const handleImageChange1 = (e) => {
        setImage1(e.target.files[0]);
    };

    const getImageSrc = (fileName) => {
        console.log(fileName);
        return fileName ? `${BaseUrl}/public/eventSubCat_Images/${fileName}` : "https://info.aec.edu.in/AEC/StudentPhotos/22A91A61E5.jpg";
    };

    const Editddept=async()=>{
        const formData = new FormData();
        formData.append('eventCatagoryName', formik.values.eventCatagoryName);
        formData.append('eventSubCatName', formik.values.eventSubCatName);
        if (image1) formData.append('eventSubCatImage', image1);

        try {
            await axios.put(`${BaseUrl}/api/edit-eventSubCatagory/${initialData.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure this is set
                },
            })
            toast.success('SubCatagory Updated Successfully!', {
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
                toggle(); // Close the modal
            }, 2500);
            if (onSubmit) onSubmit(); // Trigger any additional action if needed
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
            console.error('Error updating SubCatagory data:', error);
        }

    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered style={{ maxWidth: '700px', width: '100%' }}>
            <ModalHeader className="bg-light p-3" toggle={toggle}>Edit Coordinator Details</ModalHeader>
            <Form onSubmit={formik.handleSubmit} className="tablelist-form">
                <ModalBody>
                    <div style={{ padding: "0px 10px" }}>
                        <Row>
                            <Col lg="6" style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <label>SubCatagory Image:</label>
                                <div className='mb-3' style={{ display: "flex", justifyContent: "center", width: "100%", height: "170px" }}>
                                    <div style={{ height: "170px", width: "170px", position: "relative" }}>
                                        <img
                                            style={{ cursor: 'pointer', height: "170px", width: "165px", borderRadius: "50%" }}
                                            src={image1 ? URL.createObjectURL(image1) : getImageSrc(initialData?.eventSubCatImage)}
                                            alt="SubCatagory Image"
                                        />
                                    </div>
                                    <input
                                        style={{ opacity: 0, position: "absolute", top: "3%", height: "150px", width: "150px", cursor: "pointer" }}
                                        type="file"
                                        name="eventSubCatImage"
                                        onChange={handleImageChange1}
                                    />
                                </div>
                            </Col>
                        </Row>

                        <Row>
                        <Col lg="6" className="mb-3">
                                <label htmlFor="eventCatagoryName">Select Event Catagory Name:</label>
                                <select
                                    id="eventCatagoryName"
                                    name="eventCatagoryName"
                                    value={formik.values.eventCatagoryName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{ border: "1px solid black", color: "black", fontWeight: 500 }}
                                    className={`form-select ${formik.errors.eventCatagoryName && formik.touched.eventCatagoryName ? 'is-invalid' : ''}`}
                                >
                                    <option value="">Select Event Catagory</option>
                                    {Object.keys(eventCatOptions).map((dept) => (
                                        <option key={dept} value={dept}>
                                            {dept.charAt(0).toUpperCase() + dept.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                {formik.errors.eventCatagoryName && formik.touched.eventCatagoryName && (
                                    <div className="invalid-feedback">{formik.errors.eventCatagoryName}</div>
                                )}
                            </Col>

                            <Col lg="6" className="mb-3">
                                <label className="form-input">Event Sub Cat Name</label>
                                <input
                                    type="text"
                                    id="eventSubCatName"
                                    name="eventSubCatName"
                                    className={`form-control ${formik.errors.eventSubCatName && formik.touched.eventSubCatName ? 'is-invalid' : ''}`}
                                    placeholder="Enter SubCatagory Title"
                                    value={formik.values.eventSubCatName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{ border: "1px solid black", color: "black", fontWeight: 500 }}
                                />
                                {formik.errors.eventSubCatName && formik.touched.eventSubCatName && (
                                    <div className="invalid-feedback">{formik.errors.eventSubCatName}</div>
                                )}
                            </Col>
                        </Row>
                        <ToastContainer />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button style={{ backgroundColor: "white", color: "rgb(13, 38, 38)", fontWeight: 600 }} onClick={toggle}>Cancel</Button>
                    <Button color="primary" type="submit" onClick={Editddept}>Save</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default FormModal;
