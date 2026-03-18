import React from "react"
import ReactApexChart from "react-apexcharts"
import { useEffect, useState } from "react";
import axios from "axios";



const Apaexlinecolumn = () => {

    const BASE_URL = process.env.REACT_APP_BASEURL;
    const [daata, setdaata] = useState();
    const [userBranch , setuserBranch] = useState("");

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("authUser"));
        console.log("user setted " + user)
        setuserBranch(user.userBranch);
    }, [])

    useEffect(() => {
        // console.log(BASE_URL + '/api/get-campus-years/' + userBranch)
        // console.log(userBranch, "userbravdxb sdfkhbv sdkfjv kdsfv skjdf vlakdfjv sdlfjv sdkfb dsljfbv,ad fsbvljsdf vldsfv,adf bnch")
        axios.get(BASE_URL + '/api/get-campus-years/' + userBranch)
            .then((res) => {
                setdaata(res);
                console.log('/api/get-campus-years/')
                console.log(res)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [userBranch]);
    // console.log( userBranch);
    const ApaexlinecolumnData = {
        series: [
            {
                name: "First Years",
                data: daata && [daata.AU?.first, daata.ACET?.first, daata.ACOE?.first, daata.others?.first]
            },
            {
                name: "Second Years",
                data: daata && [daata.AU?.second, daata.ACET?.second, daata.ACOE?.second, daata.others?.second]
            },
            {
                name: "Third Years",
                data: daata && [daata.AU?.third, daata.ACET?.third, daata.ACOE?.third, daata.others?.third]
            },
            {
                name: "Fourth Years",
                data: daata && [daata.AU?.fourth, daata.ACET?.fourth, daata.ACOE?.fourth, daata.others?.fourth]
            }
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "45%",
                    endingShape: "rounded",
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
            },

            // "#f46a6a"

            colors: ["#008738", "#FFBB00", "#173093", "#F348AD"],
            xaxis: {
                categories: [
                    "AU",
                    "ACET",
                    "ACOE",
                    "Others"
                ],
            },
            yaxis: {
                title: {
                    text: "Campus wise Student Regestration Years",
                },
            },
            grid: {
                borderColor: "#f1f1f1",
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val
                    },
                },
            },
        },
    }

    return (
        <React.Fragment>
            {daata && <ReactApexChart
                options={ApaexlinecolumnData.options}
                series={ApaexlinecolumnData.series}
                type="bar"
                height={350}
                className="apex-charts"
            />}
        </React.Fragment>
    )
}

export default Apaexlinecolumn;
