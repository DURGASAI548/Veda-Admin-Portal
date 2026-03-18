import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const PieChart = () => {

    const [labels, setLabels] = useState([]);
    const [series, setSeries] = useState([]);
    const BASE_URL = process.env.REACT_APP_BASEURL;
    const [userBranch , setuserBranch] = useState("")

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("authUser"))
        setuserBranch(user.userBranch);
      } , [])

    useEffect(() => {
        axios
            .get(BASE_URL + "/api/get-gender-count-auth/" +userBranch)
            .then((res) => {
                console.log("gemder charttttttt");
                console.log(res);
                setLabels(Object.keys(res[0]))
                setSeries(Object.values(res[0]))
            })
            .catch((err) => {
                console.error(err);
            });
    }, [userBranch]);

    const PieChartData = {
        series: series,
        options: {
            labels: labels,
            colors: ["#A2CA71", "#6482AD", "#FFAE42"],
            legend: {
                show: true,
                position: "bottom",
                horizontalAlign: "center",
                verticalAlign: "middle",
                floating: false,
                fontSize: "14px",
                offsetX: 0,
                offsetY: -10,
            },
            responsive: [
                {
                    breakpoint: 600,
                    options: {
                        chart: {
                            height: 240,
                        },
                        legend: {
                            show: false,
                        },
                    },
                },
            ],
        },
    };

    return (
        <React.Fragment>
            {series.length > 0 && (
                <ReactApexChart
                    options={PieChartData.options}
                    series={PieChartData.series}
                    type="pie"
                    height="320"
                    className="apex-charts"
                />
            )}
        </React.Fragment>
    );
};

export default PieChart;