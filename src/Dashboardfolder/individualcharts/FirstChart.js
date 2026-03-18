import React from "react"
import ReactApexChart from "react-apexcharts"
import { useEffect, useState } from "react";
import axios from "axios";



const Apaexlinecolumn = ({vertical,horizontal}) => {
    // console.log(vertical,horizontal)

    


    // useEffect(() => {
    //     // console.log(BASE_URL + '/api/get-campus-years/' + userBranch)
    //     // console.log(userBranch, "userbravdxb sdfkhbv sdkfjv kdsfv skjdf vlakdfjv sdlfjv sdkfb dsljfbv,ad fsbvljsdf vldsfv,adf bnch")
    //     axios.get(BASE_URL + '/api/get-campus-years/' + userBranch)
    //         .then((res) => {
    //             setdaata(res);
    //             console.log('/api/get-campus-years/')
    //             console.log(res)
    //         })
    //         .catch((err) => {
    //             console.error(err)
    //         })
    // }, [userBranch]);
    // console.log( userBranch);
    
    // sethorizontal(x);
    const ApaexlinecolumnData = {
        series: horizontal,
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

            colors: ["#008738", "#FFBB00"],
            xaxis: {
                categories: vertical,
            },
            yaxis: {
                title: {
                    text: "Teams count and Students count",
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
            {vertical && horizontal && <ReactApexChart
                options={ApaexlinecolumnData.options}
                series={ApaexlinecolumnData.series}
                type="bar"
                height={400}
                className="apex-charts"
            />}
        </React.Fragment>
    )
}

export default Apaexlinecolumn;
