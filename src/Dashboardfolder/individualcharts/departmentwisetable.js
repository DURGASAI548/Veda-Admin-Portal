import React from 'react';
import { Col } from 'reactstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Datatable = () => {

    const [deptdata, setdeptdata] = useState([]);
    const BASE_URL = process.env.REACT_APP_BASEURL;
    const [userBranch , setuserBranch] = useState("")

        useEffect(() =>{
            const user = JSON.parse(localStorage.getItem("authUser"))
            setuserBranch(user.userBranch)
        })

    useEffect(() => {
        axios.get(BASE_URL + '/api/get-user-data-for-table/' + userBranch)
            .then((res) => {
                setdeptdata(res)
                console.log('/api/get-user-data-for-table/')
            })
            .catch((err) => {
                console.error(err)
            })
    }, [userBranch]);


    return (
        <React.Fragment>
            <Col lg={12}>
                <div className="card" >
                    <div className="card-body">
                        <h4 className="card-title mb-4">Overall Synopsis</h4>

                        <div className="table-responsive" id="newcard">
                            <table className="table table-centered table-nowrap mb-0">

                                <thead style={{ Color: 'pink' }}>
                                    <tr style={{ Color: 'pink' }}>
                                        <th scope="col">Departments</th>
                                        <th scope="col">Event Count</th>
                                        <th scope="col">AEC</th>
                                        <th scope="col">ACET</th>
                                        <th scope="col">ACOE</th>
                                        <th scope="col">Other</th>
                                        <th scope="col">Individual<br />Registrations</th>
                                        <th scope="col">Teams<br />Registered</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {deptdata && deptdata.map((item, key) => {
                                        return <tr key={key}>
                                            <td>
                                                {item.logo ?
                                                    <div style={{ display: 'flex', justifyContent: 'space-evenly', gap: '10px', fontSize: '18px', width: '150px' }}>
                                                        <img src={BASE_URL + '/public/Department_Images/' + item.logo} alt="user" className="avatar-xs rounded-circle" style={{ width: '' }} />
                                                        <p className="font-size-15 mb-0" style={{ width: '100px' }}>{item.departmentName}</p>
                                                    </div> : <div className="avatar-xs"></div>
                                                }
                                            </td>
                                            <td>
                                                <p className="mb-1 font-size-12">{item.events}</p>

                                            </td>
                                            <td>{item.AEC}</td>
                                            <td>{item.ACET}</td>
                                            <td>{item.ACOE}</td>
                                            <td>{item.Other}</td>
                                            <td>{item.individualReg}</td>
                                            <td>{item.teamReg}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Col>
            {/* </Row> */}
        </React.Fragment>
    )
}

export default Datatable;