import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import { Chart, CategoryScale } from 'chart.js';
Chart.register(CategoryScale);


const LineChart = () => {

    const BASE_URL = process.env.REACT_APP_BASEURL;
    const [label1, setlabel1] = useState([])
    const [daata, setdaata] = useState(null)
    const [userBranch , setuserBranch] = useState("")

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("authUser"))
        setuserBranch(user.userBranch);
    })
    useEffect(() => {
        axios.get(BASE_URL + '/api/get-campu-gender-data/' + userBranch)
            .then((res) => {
                setlabel1(Object.keys(res));
                setdaata(res);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [userBranch]);


    const data = daata && {
        labels: label1,
        datasets: [
            {
                label: "Male",
                lineTension: 0.2,
                backgroundColor: "#E95C63",
                borderColor: ["#E95C63"],
                borderWidth: 3,
                fill: false,
                pointBackgroundColor: "#ffffff",
                pointBorderColor: "#3B5249",
                data: daata && [daata.AU.male, daata.ACET.male, daata.ACOE.male, daata.others.male],
            },
            {
                label: "Female",
                lineTension: 0.2,
                backgroundColor: "#0D4C92",
                borderColor: ["#0D4C92"],
                borderWidth: 3,
                fill: false,
                pointBackgroundColor: "#ffffff",
                pointBorderColor: "#01D28E",
                data: daata && [daata.AU.female, daata.ACET.female, daata.ACOE.female, daata.others.female],
            },
            {
                label: "Others",
                lineTension: 0.2,
                backgroundColor: "#FFC947",
                borderColor: ["#FFC947"],
                borderWidth: 3,
                fill: false,
                pointBackgroundColor: "#ffffff",
                pointBorderColor: "#FF6969",
                data: daata && [daata.AU.others, daata.ACET.others, daata.ACOE.others, daata.others.others],
            }
        ],
    };
    var option = {
        y: {
            ticks: {
                max: 250,
                min: 0,
                stepSize: 50,
                zeroLineColor: "#7b919e",
                borderDash: [3, 3],

            },
        },
    };
    return (
        <>
            {daata && <React.Fragment>
                <Line width={537} height={200} data={data} options={option} />
            </React.Fragment>}
        </>
    );
};

export default LineChart;