import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
// import Breadcrumbs from '../../components/Common/Breadcrumb';
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import DataTable from 'react-data-table-component';
import EditDepartmentForm from './EditDepartmentForm';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const data = [
  {
    id: 1,
    eventCatagoryName: "Computer Science",
    eventSubCatName: "Innovative Tech Solutions",
    content: "Exploring the latest in technology, programming, and software development.",
    departmentLogo: "https://img.freepik.com/premium-vector/man-with-glasses-picture-man-wearing-glasses_1126821-13488.jpg",
    eventSubCatImage: "https://images.unsplash.com/photo-1480408144303-d874c5e12201?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=575213599ae24b3dbdfd84be79425c50&auto=format&fit=crop&w=634&q=80"
  },
  {
    id: 2,
    eventCatagoryName: "Arts",
    eventSubCatName: "Creative Arts and Culture",
    content: "Celebrating the rich diversity of artistic expression and cultural heritage.",
    departmentLogo: "https://img.freepik.com/premium-vector/man-with-glasses-picture-man-wearing-glasses_1126821-13488.jpg",
    eventSubCatImage: "https://images.unsplash.com/photo-1480408144303-d874c5e12201?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=575213599ae24b3dbdfd84be79425c50&auto=format&fit=crop&w=634&q=80"
  },
  {
    id: 3,
    eventCatagoryName: "Science",
    eventSubCatName: "Scientific Discoveries",
    content: "Showcasing groundbreaking scientific research and innovations.",
    departmentLogo: "https://img.freepik.com/premium-vector/man-with-glasses-picture-man-wearing-glasses_1126821-13488.jpg",
    eventSubCatImage: "https://images.unsplash.com/photo-1480408144303-d874c5e12201?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=575213599ae24b3dbdfd84be79425c50&auto=format&fit=crop&w=634&q=80"
  },
  // Add more department objects as needed
];

const EditDepartment = () => {
  const [defaultValues, setDefaultValues] = useState({});
  const [modal_list, setModalList] = useState(false);
  const BaseUrl = process.env.REACT_APP_BASEURL;
  const [Update, setUpdate] = useState(false)
  const [eventData, seteventData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  

  useEffect(() => {
    axios.get(BaseUrl + "/api/get-eventSubCatagory-data")
      .then(res => {
        const UpdateObj = res.map((obj, index) => ({
          ...obj,
          id: index + 1
        }));
        seteventData(UpdateObj);
      })
      .catch(err => {
        console.log(err)
      })
    // (async () => {
    //   try {
    //     const Result = await axios.get(BaseUrl + "/api/get-department-data");
    //     const UpdateObj = Result.map((obj, index) => ({
    //       ...obj,
    //       id: index + 1
    //     }));
    //     seteventData(UpdateObj);
    //     // console.log(UpdateObj);
    //   }
    //   catch (err) {
    //     console.log(err);
    //   }
    // })();

  }, [Update]);

  // Function to edit the responses
  const editFun = (eventCatagory) => {
    setDefaultValues({
      eventCatagoryName: eventCatagory.eventCatagoryName,
      eventSubCatName: eventCatagory.eventSubCatName,
      eventSubCatImage: eventCatagory.eventSubCatImage,
      id: eventCatagory._id
    });
    setModalList(true);
  };



  // Function to remove the responses
  const removeFun = (eventCatagory) => {
    console.log(eventCatagory)
    axios.delete(`${BaseUrl}/api/delete-eventSubCatagory/${eventCatagory._id}`).
      then((response) => {
        toast.success('eventSubCatagory Deleted Successfully!', {
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
        }, 2500);
      }).catch((er) => {
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
        console.log(er);
      })
    // alert(`${eventCatagory.eventCatagoryName} eventCatagory Removed Sucessfully!!!`);
    setUpdate(true);
  };

  const [deleteSub, setDeleteSub] = useState({});
  const handleShow = (dt) => {
    setShowModal(true)
    setDeleteSub(dt);
  };

  const handleClose = () => {
    setShowModal(false);
  }
  const handleSaveChanges = () => {
      console.log('Changes saved!');
      removeFun(deleteSub);
      setShowModal(false);
  };


  const columns = [
    {
      name: <span className='font-weight-bold fs-13' style={{ fontWeight: "900", fontSize: "13px" }}>S.NO</span>,
      selector: row => row.id,
      sortable: true,
      width: "75px",
      style: {
        display: "flex",
        justifyContent: "center"
      }
    },
    // {
    //   name: <span className='font-weight-bold fs-13 ' style={{ fontWeight: "900", fontSize: "13.5px" }}>Logo</span>,
    //   selector: row => row.eventCatagoryLogo,
    //   width: "110px",
    //   cell: (ele) => {
    //     return (
    //       <img className="img-fluid rounded-circle" style={{ height: "70px", width: "68px", margin: "5px 0px" }} src={`${BaseUrl}/public/Department_Images/${ele.departmentLogo}`} alt="Coordinator" />
    //     )
    //   },
    //   sortable: true
    // },
    {
      name: <span className='font-weight-bold fs-13 d-flex justify-content-center' style={{ fontWeight: "900", fontSize: "13.5px" }}>Event Catagory Name</span>,
      selector: row => row.eventCatagoryName,
      width: "170px",
      sortable: true,
    },
    {
      name: <span className='font-weight-bold fs-13 d-flex justify-content-center' style={{ fontWeight: "900", fontSize: "13.5px" }}>Event Sub Cat Name</span>,
      selector: row => row.eventSubCatName,
      width: "200px",
      sortable: true,
    },
    {
      name: <span className='font-weight-bold fs-13 ' style={{ fontWeight: "900", fontSize: "13.5px" }}>Image</span>,
      selector: row => row.eventSubCatImage,
      width: "110px",
      cell: (ele) => {
        return (
          <img className="img-fluid rounded-circle" style={{ height: "70px", width: "68px", margin: "5px 0px" }} src={`${BaseUrl}/public/eventSubCat_Images/${ele.eventSubCatImage}`} alt="Coordinator" />
        )
      },
      sortable: true
    },

    // {
    //   name: <span className='font-weight-bold fs-13 d-flex justify-content-center' style={{ fontWeight: "900", fontSize: "13.5px" }}>Content</span>,
    //   selector: row => row.departmentContent,
    //   width: "500px",
    //   height: "500px",
    //   sortable: true,
    // },
    {
      name: <span className='font-weight-bold fs-13' style={{ fontWeight: "900", fontSize: "13.5px" }}>Action</span>,
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-success edit-item-btn"
            onClick={() => editFun(row)}
            style={{ height: "30px", width: "50px" }}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger remove-item-btn"
            // onClick={() => removeFun(row)}
            onClick={() => handleShow(row)}
            style={{ height: "30px", width: "70px" }}
          >
            Remove
          </button>
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="SubCatagory Admins" breadcrumbItem="SubCatagory List" />
          <Row className="g-4 mb-3">
            <Col className="col-sm">
              <div className="d-flex justify-content-sm-end">
                <div className="search-box ms-2" style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-control search"
                    placeholder="Search..."
                    style={{ border: 'none', paddingRight: '30px' }}
                  />
                  <i
                    className="ri-search-line search-icon"
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      color: '#aaa'
                    }}
                  ></i>
                </div>
              </div>
            </Col>
            <ToastContainer />
          </Row>
          <DataTable
            columns={columns}
            data={eventData}
            pagination
          />
        </Container>
      </div>
      {/* Modal Component */}
      <EditDepartmentForm
        isOpen={modal_list}
        toggle={() => setModalList(!modal_list)}
        initialData={defaultValues}
      />

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

export default EditDepartment;
