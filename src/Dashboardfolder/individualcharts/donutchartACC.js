import React from "react";
import ReactApexChart from "react-apexcharts";
import { useEffect , useState } from "react";
import axios from "axios";

const DonutChart = () => {

    const [labels, setlabels] = useState([])
    const [series, setseries] = useState([])
    const BASE_URL = process.env.REACT_APP_BASEURL
    const [userBranch , setuserBranch] = useState("")

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("authUser"))
        setuserBranch(user.userBranch);
    },[])
    useEffect(()=>{
        axios.get(BASE_URL + '/api/get-accomodation-data/' + userBranch)
        .then((res) =>{
            setlabels(Object.keys(res[0]))
            setseries(Object.values(res[0]))
        })
        .catch((err) =>{
            console.error(err)
        })
    },[userBranch]);

    const dountchartData = {
        series: series,
        options: {
            labels: labels,
            colors: ["#78D6C6","#927FBF","#F05454"],
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
            plotOptions: {
                pie: {
                    donut: {
                        size: '60%',
                    }
                }
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
                    }
                }
            ]
        }
    }

    return (
        <React.Fragment>
            {series.length > 0 && <ReactApexChart
                options={dountchartData.options}
                series={dountchartData.series}
                type="donut"
                height="320"
                className="apex-charts"
            />}
        </React.Fragment>
    )
}

export default DonutChart;