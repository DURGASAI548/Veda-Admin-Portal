import { Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
// import MyModal from "./EditForm";
import EditStudentForm from './EditStudentForm';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditStudent = () => {
  const [StudentData, setStudentData] = useState([])
  const [defaultValues, setDefaultValues] = useState({});
  const [modal_list, setmodal_list] = useState(false);
  const BaseUrl = process.env.REACT_APP_BASEURL;
  const [std, setStd] = useState(false);


  useEffect(()=>{
    axios.get(`${BaseUrl}/api/get-student-cordinate`)
    .then(res =>{
      const UpdateObj = res.map((obj, index) => ({
        ...obj,
        sno: index + 1
      }));
      setStudentData(UpdateObj);
    })
    .catch(err => {
      console.log(err)
    })
    // const Result =  await axios.get(`${BaseUrl}/api/get-student-cordinate`)
    // const UpdateObj = Result.map((obj, index) => ({
    //   ...obj,
    //   sno: index + 1
    // }));
    // setStudentData(UpdateObj);
  },[std])

  // Function to edit the responses
  const editfun = (customer) => {
    setDefaultValues({
      _id:customer._id,
      departmentName: customer.departmentName,
      eventName: customer.eventName,
      cordinatorName: customer.studentCordinatorName,
      cordinatorId: customer.studentCordinatorId,
      cordinatorCollege: customer.studentCordinatorCollege,
      cordinatorPhone: customer.studentCordinatorPhone,
      cordinatorEmail: customer.studentCordinatorEmail,
      cordinatorImage: customer.studentCordinatorId,
    });

    setmodal_list(true);
  }

  // Function to remove the responses
  const removefun = async(customer) => {
    // alert(customer.cordinatorId)
    await axios.delete(`${BaseUrl}/api/delete-student-cordinate/${customer.studentCordinatorId}`).
    then((response) => {
      toast.warn('Student Removed Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        window.location.href= "/vedaadmin/EditStudent";
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
    setStd(true)
  }

  const columns = [
    {
      name: <span className='font-weight-bold fs-13' style={{ fontWeight: "900", fontSize: "13px" }}>S.NO</span>,
      selector: row => row.sno,
      sortable: true,
      width: "75px",
      style: {
        display: "flex",
        justifyContent: "center"
      }
    },
    {
      name: <span className='font-weight-bold fs-13 ' style={{ fontWeight: "900", fontSize: "13.5px" }}>PhotoGraph</span>,
      selector: row => row.studentCordinatorId,
      width: "110px",
      cell: (ele) => {
        return (
          <img className="img-fluid rounded-circle" style={{ height: "70px", width: "68px", margin: "5px 0px" }} src={`https://info.aec.edu.in/adityacentral/studentphotos/${ele.studentCordinatorId}.jpg`} alt="Coordinator" />
        )
      },
      sortable: true
    },
    {
      name: <span className='font-weight-bold fs-13 d-flex justify-content-center' style={{ fontWeight: "900", fontSize: "13.5px" }}>Name</span>,
      selector: row => row.studentCordinatorName,
      sortable: true,
    },
    {
      name: <span className='font-weight-bold fs-13' style={{ fontWeight: "900", fontSize: "12.5px" }}>College ID</span>,
      selector: row => row.studentCordinatorId,
      sortable: true,
      width: "110px",
    },
    {
      name: <span className='font-weight-bold fs-13' style={{ fontWeight: "900", fontSize: "13.5px" }}>Email</span>,
      selector: row => (
        <a href={`mailto:${row.studentCordinatorEmail}`}>{row.studentCordinatorEmail}</a>
      ),
      sortable: true,
      width: "150px"
    },
    {
      name: <span className='font-weight-bold fs-13' style={{ fontWeight: "900", fontSize: "13.5px" }}>Phone</span>,
      selector: row => row.studentCordinatorPhone,
      sortable: true,
      width: "102px"
    },
    {
      name: <span className='font-weight-bold fs-13' style={{ fontWeight: "900", fontSize: "13.5px" }}>College</span>,
      selector: row => row.studentCordinatorCollege,
      sortable: true,
      width: "92px"
    },
    {
      name: <span className='font-weight-bold fs-13' style={{ fontWeight: "900", fontSize: "13.5px" }}>Department</span>,
      selector: row => row.departmentName,
      sortable: true,
      width: "123px"
    },
    {
      name: <span className='font-weight-bold fs-13' style={{ fontWeight: "900", fontSize: "13.5px" }}>Event</span>,
      selector: row => row.eventName,
      sortable: true,
      width: "140px"
    },
    // {
    //   name: <span className='font-weight-bold fs-13' style={{ fontWeight: "900", fontSize: "13.5px" }}>Event</span>,
    //   selector: row => row._id,
    //   sortable: true,
    //   width: "300px"
    // },
    {
      name: <span className='font-weight-bold fs-13' style={{ fontWeight: "900", fontSize: "13.5px" }}>Action</span>,
      sortable: true,
      width: "150px",
      cell: (ele) => {
        return (
          <div className="d-flex gap-2">
            <div className="edit">
              <button
                className="btn btn-sm btn-success edit-item-btn"
                onClick={() => editfun(ele)}
                style={{ height: "30px", width: 50 }}
              >
                Edit
              </button>
            </div>
            <div className="remove">
              <button
                className="btn btn-sm btn-danger remove-item-btn"
                onClick={() => removefun(ele)}
                style={{ height: "30px", width: "70px" }}
              >
                Remove
              </button>
            </div>
          </div>
        );
      },
    },
  ];

  const data = [
    {
      photo: "https://info.aec.edu.in/AEC/StudentPhotos/22A91A61D1.jpg",
      name: "Sai Chandu",
      college_id: "22A91A61D1",
      email: "saichanduadapa951@gmail.com",
      phone: "9381833711",
      College: "AEC",
      Department: "Viveka",
      event: "Paper Presentation",
      sno: 1
    },
    {
      photo: "https://info.aec.edu.in/AEC/StudentPhotos/22A91A61F4.jpg",
      name: "mahi",
      college_id: "22A91A61F4",
      email: "mahi@gmail.com",
      phone: "9381833711",
      College: "AEC",
      Department: "Digi",
      event: "Web Diseno",
      sno: 2
    },
    {
      photo: "https://info.aec.edu.in/AEC/StudentPhotos/22A91A61E5.jpg",
      name: "Siddu",
      college_id: "22A91A61E5",
      email: "siddu@gmail.com",
      phone: "9381833711",
      College: "ACOE",
      Department: "Ignite",
      event: "Water Rocket",
      sno: 3
    },
    {
      photo: "https://info.aec.edu.in/AEC/StudentPhotos/22A91A61J6.jpg",
      name: "Rajesh",
      college_id: "22A91A61J6",
      email: "rajesh@gmail.com",
      phone: "9381833711",
      College: "ACET",
      Department: "Opus",
      event: "Cadingo",
      sno: 4
    },
    {
      photo: "https://info.aec.edu.in/AEC/StudentPhotos/22A91A61D1.jpg",
      name: "Sai Chandu",
      college_id: "22A91A61D1",
      email: "saichanduadapa951@gmail.com",
      phone: "9381833711",
      College: "AEC",
      Department: "Viveka",
      event: "Paper Presentation",
      sno: 1
    },
    {
      photo: "https://info.aec.edu.in/AEC/StudentPhotos/22A91A61F4.jpg",
      name: "mahi",
      college_id: "22A91A61F4",
      email: "mahi@gmail.com",
      phone: "9381833711",
      College: "AEC",
      Department: "Digi",
      event: "Web Diseno",
      sno: 2
    },
    {
      photo: "https://info.aec.edu.in/AEC/StudentPhotos/22A91A61E5.jpg",
      name: "Siddu",
      college_id: "22A91A61E5",
      email: "siddu@gmail.com",
      phone: "9381833711",
      College: "ACOE",
      Department: "Ignite",
      event: "Water Rocket",
      sno: 3
    },
    {
      photo: "https://info.aec.edu.in/AEC/StudentPhotos/22A91A61J6.jpg",
      name: "Rajesh",
      college_id: "22A91A61J6",
      email: "rajesh@gmail.com",
      phone: "9381833711",
      College: "ACET",
      Department: "Opus",
      event: "Cadingo",
      sno: 4
    },
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Faculty Admins" breadcrumbItem="Edit Student Form" />
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
            data={StudentData}
            pagination
          />
        </Container>
      </div>
      {/* Modal Component */}
      <EditStudentForm
        isOpen={modal_list}
        toggle={() => setmodal_list(!modal_list)}
        initialData={defaultValues}
      />
      {console.log(defaultValues)}
      <ToastContainer />
    </React.Fragment>
  );
}

export default EditStudent;
