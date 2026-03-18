import { Col, Container, Row } from 'reactstrap';
// import Breadcrumbs from '../../components/Common/Breadcrumb';
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import EditEventForm from '../Events/EditEventForm';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditEvent = () => {
  const BaseUrl = process.env.REACT_APP_BASEURL;
  
  const [defaultValues, setDefaultValues] = useState({});
  const [modal_list, setmodal_list] = useState(false);
  const [eventData, seteventData] = useState([]);
  const [Invoker, setInvoker] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const Invoke = () => {
    // setInvoker(!Invoker)
    // console.log("Invoked")
  }
  useEffect(() => {
    axios.get(BaseUrl + "/api/get-all-events")
      .then(res => {
        console.log(res)
        const UpdateObj = res.map((obj, index) => ({
          ...obj,
          sno: index + 1
        }));
        // console.log(res);
        seteventData(UpdateObj)
      })
      .catch(err => {
        console.log(err)
      })

    // try {
    //   const Result = await axios.get(BaseUrl + "/api/get-all-events");
    //   console.log(Result)
    //   const UpdateObj = Result.map((obj, index) => ({
    //     ...obj,
    //     sno: index + 1
    //   }));
    //   seteventData(UpdateObj);
    //   // console.log(UpdateObj);
    // }
    // catch (err) {
    //   console.log(err);
    // }
  }, [Invoker]);
  // Function to edit the responses
  const editfun = (event) => {
    setDefaultValues({
      event_id: eventData._id,
      eventCatagoryName: event.eventCatagoryName,
      eventSubCatName: event.eventSubCatName,
      eventName: event.eventName,
      eventImage: event.eventImage,
      eventType: event.eventType,
      maxdivparticepants: event.maxdivparticepants,
      // departmentName: event.departmentName,
      price: event.price,
      overview: event.overview,
      maxTeamSize: event.maxTeamSize,
      minTeamSize: event.minTeamSize,
      divisions: event.divisions,
      regulations: event.regulations,
      venue: event.venue,
      isAllowDivision: event.isAllowDivision,
      _id: event._id
    });

    setmodal_list(true);
  };

  // Function to remove the responses
  const removefun = (event) => {
    console.log(event);
    axios.post(BaseUrl + '/delete-event', event)
      .then(res => {
        // window.alert('data deleted');
        toast.warn('Event Deleted Successfully!', {
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
        console.log(res);
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
      }
      )
  };

  const [removeData, setRemoveData] = useState({});
  const handleShow = (dt) => {
    setShowModal(true)
    setRemoveData(dt)
  };
  const handleClose = () => setShowModal(false);
  const handleSaveChanges = () => {
      console.log('Changes saved!');
      removefun(removeData);
      setShowModal(false);
  };

  const columns = [
    {
      name: <span className='font-weight-bold fs-13'>S.NO</span>,
      selector: row => row.sno,
      sortable: true,
      width: "50px",
      style: {
        display: "flex",
        justifyContent: "center",
      },
    }, {
      name: <span className='font-weight-bold fs-13'>Event Catagory Name</span>,
      selector: row => row.eventCatagoryName,
      width: "150px",
      sortable: true,
    },
    {
      name: <span className='font-weight-bold fs-13'>Event SubCatagory Name</span>,
      selector: row => row.eventSubCatName,
      width: "150px",
      sortable: true,
    },
    {
      name: <span className='font-weight-bold fs-13'>Event Name</span>,
      selector: row => row.eventName,
      width: "150px",
      sortable: true,
    },
    {
      name: <span className='font-weight-bold fs-13'>Price</span>,
      selector: row => row.price,
      width: "100px",
      sortable: true,
    },
    {
      name: <span className='font-weight-bold fs-13'>Overview</span>,
      width: "200px",
      selector: row => row.overview,
      sortable: true,
    },
    {
      name: <span className='font-weight-bold fs-13'>Max Team Size</span>,
      selector: row => row.maxTeamSize,
      width: "100px",
      sortable: true,
    },
    {
      name: <span className='font-weight-bold fs-13'>Min Team Size</span>,
      selector: row => row.minTeamSize,
      width: "100px",
      sortable: true,
    },
    {
      name: <span className='font-weight-bold fs-13'>Divisions</span>,
      selector: row => row.divisions,
      width: "200px",
      sortable: true,
    },
    {
      name: <span className='font-weight-bold fs-13'>Regulations</span>,
      selector: row => row.regulations,
      width: "200px",
      sortable: true,
    },
    {
      name: <span className='font-weight-bold fs-13'>Venue</span>,
      selector: row => row.venue,
      width: "150px",
      sortable: true,
    },
    // {
    //   name: <span className='font-weight-bold fs-13'>Record ID</span>,
    //   selector: row => row._id,
    //   width: "300px",
    //   sortable: true,
    // },
    {
      name: <span className='font-weight-bold fs-13'>Action</span>,
      width: "200px",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-success edit-item-btn"
            onClick={() => editfun(row)}
            style={{ height: "30px", width: "50px" }}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger remove-item-btn"
            // onClick={() => removefun(row)}
            onClick={() => handleShow(row)}
            style={{ height: "30px", width: "70px" }}
          >
            Remove
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      sno: 1,
      departmentName: "Digi",
      eventName: "Web Diseno",
      registrationFee: "50$",
      eventOverview: "A conference about the latest in tech.",
      maxTeamSize: 5,
      rulesAndRegulations: ["Follow all safety protocols.", "Follow all safety protocols."],
      eventVenue: "Auditorium A",
      extraTeamSize: 1,
      extraAmountPerHead: 200
    },
    {
      sno: 2,
      departmentName: "Electrendz",
      eventName: "Poster Presentation",
      registrationFee: "Free",
      eventOverview: "A celebration of diverse cultures.",
      maxTeamSize: 10,
      rulesAndRegulations: ["Respect all participants.", "Respect all participants."],
      eventVenue: "Open Grounds",
      extraTeamSize: 2,
      extraAmountPerHead: 100
    },
    {
      sno: 3,
      departmentName: "Ignite",
      eventName: "Water rocket",
      registrationFee: "20$",
      eventOverview: "Exhibiting innovative scientific projects.",
      maxTeamSize: 5,
      rulesAndRegulations: ["Projects should be approved by faculty.", "Projects should be approved by faculty."],
      eventVenue: "Science Block",
      extraTeamSize: 3,
      extraAmountPerHead: 300
    },
    // Add more event objects as needed
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Event Admins" breadcrumbItem="Event List" />
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
          </Row>
          <DataTable
            columns={columns}
            data={eventData}
            pagination
          />
        </Container>
      </div>
      <ToastContainer />
      {/* Modal Component */}
      <EditEventForm
        isOpen={modal_list}
        toggle={() => setmodal_list(!modal_list)}
        initialData={defaultValues}
        Invokeing={Invoke}
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
                <p>Are You sure to Delete Event</p>
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

export default EditEvent;