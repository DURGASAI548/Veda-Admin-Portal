import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import OtherCollegePaymentDetails from "./secondrootdashboardtwo.js";


import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown,
} from "reactstrap";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";


const AlternativePagination = () => {
  const [filteredData, setFilteredData] = useState([]);
  const exportToExcel = (data) => {
    // Create a new workbook and a worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Convert workbook to binary and save it
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "data.xlsx"
    );
  };

  const [loader, setloader] = useState(false);
  const [userBranch, setuserBranch] = useState();
  const BASE_URL = process.env.REACT_APP_BASEURL;
  const [tabledata, settabledata] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    setuserBranch(user.userBranch);
    setloader(true);
    axios
      .get(BASE_URL + "/api/get-payment-details/" + user.userBranch)
      .then((res) => {
        console.log(res);
        settabledata(res);
        setFilteredData(res)
        setloader(false);
      })
      .catch((err) => {
        setloader(false);
        console.log(err);
      });
  }, []);
  const columns = [
    {
      name: <span className="font-weight-bold fs-15"><b>S.No</b></span>,
      selector: (row) => row.SNo,
      sortable: true,
      width: "75px",
    },
    {
      name: <span className="font-weight-bold fs-15"><b>ROLL NUMBER</b></span>,
      selector: (row) => row.userRollNumber,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-15"><b>NAME</b></span>,
      selector: (row) => row.userName,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-15"><b>Department</b></span>,
      selector: (row) => row.userDepartment,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-15"><b>Year of study</b></span>,
      selector: (row) => row.userYear,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-15"><b>MOBILE</b></span>,
      selector: (row) => row.userMobile,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-15"><b>EMAIL</b></span>,
      selector: (row) => row.userEmail,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-15"><b>EVENT CATRGORY</b></span>,
      selector: (row) => row.userEventCategory,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-15"><b>EVENT</b></span>,
      selector: (row) => row.userEvent,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-15"><b>College</b></span>,
      selector: (row) => row.userCollege,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-15"><b>TEAM CODE</b></span>,
      selector: (row) => row.userTeamCode,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-15"><b>PAID ON</b></span>,
      selector: (row) => row.createdAt,
      sortable: true,
    },
    // {
    //   name: <span className="font-weight-bold fs-15">Volume %</span>,
    //   sortable: true,
    //   selector: (cell) => {
    //     return (
    //       <h6 className={"fs-15 mb-0 text-" + cell.volumeClass}>
    //         {" "}
    //         <i className={"align-middle me-1 " + cell.icon}></i>https://adityauniversity.in/
    //         {cell.volume}
    //       </h6>
    //     );
    //   },
    // },
    // {
    //   name: <span className="font-weight-bold fs-15">Action</span>,
    //   sortable: true,
    //   cell: () => {
    //     return <button className="btn btn-sm btn-soft-info">Trade Now</button>;
    //   },
    // },
  ];
  const Search = (event) => {
    if (event.target.value.trim() === '') {
      // If search query is empty, show all records
      setFilteredData(tabledata);
    }
    else {
      const lowercasedQuery = event.target.value.toLowerCase();
      const filtered = tabledata.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(lowercasedQuery)
        )
      );
      setFilteredData(filtered);
    }
  }
  //   const data = [
  //     {
  //       srNo: "01",
  //       currency: [btc, "Bitcoin (BTC)"],
  //       price: "$47,071.60",
  //       pairs: "BTC/USD",
  //       high: "$28,722.76",
  //       low: "$68,789.63",
  //       marketVolume: "$888,411,910",
  //       volume: "1.50%",
  //       icon: "mdi mdi-trending-up",
  //       volumeClass: "success",
  //     },
  //     {
  //       srNo: "02",
  //       currency: [eth, "Ethereum (ETH)"],
  //       price: "$3,813.14",
  //       pairs: "ETH/USDT",
  //       high: "$4,036.24",
  //       low: "$3,588.14",
  //       marketVolume: "$314,520,675",
  //       volume: "0.42%",
  //       icon: "mdi mdi-trending-down",
  //       volumeClass: "danger",
  //     },
  //     {
  //       srNo: "03",
  //       currency: [ltc, "Litecoin (LTC)"],
  //       price: "$149.65",
  //       pairs: "LTC/USDT",
  //       high: "$412.96",
  //       low: "$104.33",
  //       marketVolume: "$314,520,675",
  //       volume: "0.89%",
  //       icon: "mdi mdi-trending-up",
  //       volumeClass: "success",
  //     },
  //     {
  //       srNo: "04",
  //       currency: [xmr, "Monero (XMR)"],
  //       price: "$17,491.16",
  //       pairs: "XRM/USDT",
  //       high: "$31,578.35",
  //       low: "$8691.75",
  //       marketVolume: "$9,847,327",
  //       volume: "1.92%",
  //       icon: "mdi mdi-trending-up",
  //       volumeClass: "success",
  //     },
  //     {
  //       srNo: "05",
  //       currency: [ant, "Aragon (ANT)"],
  //       price: "$172.93",
  //       pairs: "SOL/USD",
  //       high: "$178.37",
  //       low: "$172.3",
  //       marketVolume: "$40,559,274",
  //       volume: "2.87%",
  //       icon: "mdi mdi-trending-down",
  //       volumeClass: "danger",
  //     },
  //     {
  //       srNo: "06",
  //       currency: [sol, "Solana (SOL)"],
  //       price: "$17,491.16",
  //       pairs: "XRM/USDT",
  //       high: "$31,578.35",
  //       low: "$8691.75",
  //       marketVolume: "$9,847,327",
  //       volume: "1.92%",
  //       icon: "mdi mdi-trending-up",
  //       volumeClass: "success",
  //     },
  //     {
  //       srNo: "07",
  //       currency: [fil, "Filecoin (FIL)"],
  //       price: "$13.31",
  //       pairs: "ANT/USD",
  //       high: "$13.85",
  //       low: "$12.53",
  //       marketVolume: "$156,209,195.18",
  //       volume: "3.96%",
  //       icon: "mdi mdi-trending-up",
  //       volumeClass: "success",
  //     },
  //     {
  //       srNo: "08",
  //       currency: [fil, "Filecoin (FIL)"],
  //       price: "$35.21",
  //       pairs: "FIL/USD",
  //       high: "$36.41",
  //       low: "$35.03",
  //       marketVolume: "$374,618,945.51",
  //       volume: "0.84%",
  //       icon: "mdi mdi-trending-down",
  //       volumeClass: "danger",
  //     },
  //     {
  //       srNo: "09",
  //       currency: [aave, "Aave (AAVE)"],
  //       price: "$275.47",
  //       pairs: "AAVE/USDT",
  //       high: "$277.11",
  //       low: "$255.01",
  //       marketVolume: "$156,209,195.18",
  //       volume: "8.20%",
  //       icon: "mdi mdi-trending-up",
  //       volumeClass: "success",
  //     },
  //     {
  //       srNo: "10",
  //       currency: [ada, "Cardano (ADA)"],
  //       price: "$1.35",
  //       pairs: "ADA/USD",
  //       high: "$1.39",
  //       low: "$1.32",
  //       marketVolume: "$880,387,980.14",
  //       volume: "0.42%",
  //       icon: "mdi mdi-trending-down",
  //       volumeClass: "danger",
  //     },
  //     {
  //       srNo: "11",
  //       currency: [fil, "Filecoin (FIL)"],
  //       price: "$35.21",
  //       pairs: "FIL/USD",
  //       high: "$36.41",
  //       low: "$35.03",
  //       marketVolume: "$374,618,945.51",
  //       volume: "0.84%",
  //       icon: "mdi mdi-trending-down",
  //       volumeClass: "danger",
  //     },
  //     {
  //       srNo: "12",
  //       currency: [aave, "Aave (AAVE)"],
  //       price: "$275.47",
  //       pairs: "AAVE/USDT",
  //       high: "$277.11",
  //       low: "$255.01",
  //       marketVolume: "$156,209,195.18",
  //       volume: "8.20%",
  //       icon: "mdi mdi-trending-up",
  //       volumeClass: "success",
  //     },
  //     {
  //       srNo: "13",
  //       currency: [ada, "Cardano (ADA)"],
  //       price: "$1.35",
  //       pairs: "ADA/USD",
  //       high: "$1.39",
  //       low: "$1.32",
  //       marketVolume: "$880,387,980.14",
  //       volume: "0.42%",
  //       icon: "mdi mdi-trending-down",
  //       volumeClass: "danger",
  //     },
  //   ];
  return (
    <div
      style={{
        marginTop: "80px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="my-3"
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "space-between",
          alignContent: 'center',
        }}
      >
        <Input
          name="email"
          className="form-control"
          placeholder="Search here...."
          type="text"
          onChange={(event) => Search(event)}
          style={{ width: "300px", height: "40px" }}
        />
        <button
          type="button"
          className="btn btn-primary waves-effect waves-light"
          onClick={() => exportToExcel(filteredData)}
        >
          Download Excel
        </button>


      </div>
      {loader ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            height: "fit-content",
            alignItems: "center",
          }}
        >
          {" "}
          <ThreeDots
            visible={true}
            height="120"
            width="120"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />{" "}
        </div>
      ) : (
        <div style={{ width: "90%" }}>
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={8}
          />
          <br></br>
          <div style={{ width: '100%', marginBottom: '20px', height: '700px' }}>
            <OtherCollegePaymentDetails />
          </div>
        </div>
      )}
    </div>
  );
};
export default AlternativePagination;
