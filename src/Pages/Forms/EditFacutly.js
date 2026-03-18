import { Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
// import MyModal from "./EditForm";
import EditFacultyForm from './EditFacultyForm';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import coordinator from "./coorinatorr.jpg"

const EditFaculty = () => {
  const [validUrls, setValidUrls] = useState({});
  const divisions = [ 'AEC', 'ACET', 'ACOE'];
  const [FacultyData, setFacultyData] = useState([])
  const [defaultValues, setDefaultValues] = useState({});
  const [modal_list, setmodal_list] = useState(false);
  const [Dataupdate, setDataupdate] = useState(false)
  const [dumimg, setdumimg] = useState('');
  const BaseUrl = process.env.REACT_APP_BASEURL;
  const [fakedata, setfakedata] = useState([
         
    {
        img: "https://info.aec.edu.in/ACET/employeephotos/4455.jpg",
        name: 'Sai Chandu Adapa',
        roll: '22A91A61J2',
        college: 'AEC',
        mobile: '1234567890',
        email: 'saichanduadapa@gmail.com',
        dept: 'IT',
        event: 'DIGI'
    },
    
])




useEffect(() => {
  axios.get(BaseUrl + "/api/get-faculty-cordinate")
      .then(res => {
          setfakedata(res)
          // console.log(res)
      })
      .catch(err => {
          // console.log(err)
      })
}, [])

  // useEffect(()=>{
  //   axios.get(`${BaseUrl}/api/get-faculty-cordinate`)
  //   .then(res =>{
  //     const UpdateObj = res.map((obj, index) => ({
  //       ...obj,
  //       sno: index + 1
  //     }));
  //     setFacultyData(UpdateObj);
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
   
  // },[Dataupdate])

  useEffect(() => {
    const checkImage = (division, EmpId, callback) => {
        const img = new Image();
        const url = `https://info.aec.edu.in/${division}/employeephotos/${EmpId}.jpg`;

        img.onload = () => {
          
            setValidUrls(prev => ({...prev, [EmpId]: url}));
            callback(url); 
        };

        img.onerror = () => {
            callback(null); 
        };

        img.src = url;
    };

    const findValidUrl = (idx, EmpId, callback) => {
       
        const attemptDivision = (divisionIndex) => {
            if (divisionIndex >= divisions.length) {
                callback(coordinator); 
                return;
            }

            checkImage(divisions[divisionIndex], EmpId, (url) => {
                
                if (url) {
                    callback(url);
                } else {
                    attemptDivision(divisionIndex + 1);
                }
            });
        };

        attemptDivision(0);
    };

    const updateValidUrls = async () => {
        // console.log(fakedata);
        const urls = await Promise.all(fakedata.map((item, idx) => {
         
            new Promise((resolve) => {
                if (item?.cordinatorId) {
                    // console.log('firstttt')
                    findValidUrl(idx, item.cordinatorId.trim(), resolve);
                } else {
                    resolve(coordinator); 
                }
            })
    }));
       
    };

    updateValidUrls();
}, [fakedata]);
  // Function to edit the responses
  const editfun = (customer) => {
    setDefaultValues({
      departmentName: customer.departmentName,
      eventName: customer.eventName,
      cordinatorName: customer.cordinatorName,
      cordinatorId: customer.cordinatorId,
      cordinatorCollege: customer.cordinatorCollege,
      cordinatorPhone: customer.cordinatorPhone,
      cordinatorEmail: customer.cordinatorEmail,
      cordinatorImage: customer.cordinatorImage,
      _id:customer._id
    });

    setmodal_list(true);
  }

  // Function to remove the responses
  const removefun = (customer) => {
    const Id = customer._id;
    // console.log(Id)
    axios.delete(`${BaseUrl}/api/delete-faculty-cordinate/${Id}`).then((res)=>{
      toast.warn('Facoulty Removed Successfully!', {
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
        // console.log(er)
    })
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
      selector: row => row.cordinatorImage,
      width: "110px",
      cell: (ele) => {
        return (
          <img className="img-fluid rounded-circle" style={{ height: "70px", width: "68px", margin: "5px 0px" }} src={validUrls[ele.cordinatorId] ?? coordinator } alt={ele?.cordinatorId ?? "Cord"}/>
          // <img className="img-fluid rounded-circle" style={{ height: "70px", width: "68px", margin: "5px 0px" }} src={`${BaseUrl}/public/Faculty_Images/${ele.cordinatorImage}`} alt="Coordinator" />
        )
      },
      sortable: true
    },
    {
      name: <span className='font-weight-bold fs-13 d-flex justify-content-center' style={{ fontWeight: "900", fontSize: "13.5px" }}>Name</span>,
      selector: row => row.cordinatorName,
      sortable: true,
    },
    {
      name: <span className='font-weight-bold fs-13' style={{ fontWeight: "900", fontSize: "12.5px" }}>College ID</span>,
      selector: row => row.cordinatorId,
      sortable: true,
      width: "110px",
    },
    {
      name: <span className='font-weight-bold fs-13' style={{ fontWeight: "900", fontSize: "13.5px" }}>Email</span>,
      selector: row => (
        <a href={`mailto:${row.cordinatorEmail}`}>{row.cordinatorEmail}</a>
      ),
      sortable: true,
      width: "150px"
    },
    {
      name: <span className='font-weight-bold fs-13' style={{ fontWeight: "900", fontSize: "13.5px" }}>Phone</span>,
      selector: row => row.cordinatorPhone,
      sortable: true,
      width: "102px"
    },
    {
      name: <span className='font-weight-bold fs-13' style={{ fontWeight: "900", fontSize: "13.5px" }}>College</span>,
      selector: row => row.cordinatorCollege,
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
          <Breadcrumbs title="Faculty Admins" breadcrumbItem="Edit Faculty Admin" />
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
            data={fakedata}
            pagination
          />
        </Container>
      </div>
      {/* Modal Component */}
      <EditFacultyForm
        isOpen={modal_list}
        toggle={() => setmodal_list(!modal_list)}
        initialData={defaultValues}
      />
      {/* {console.log(defaultValues)} */}
      <ToastContainer />
    </React.Fragment>
  );
}

export default EditFaculty;
