import React from "react"
import { Pie } from "react-chartjs-2"
import { useState, useEffect } from "react";
import axios from "axios";

import 'chart.js/auto';
import { Chart, CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

const PieChart = () => {

    const [totaldata, settotaldata] = useState([]);
    const [cntdata, setcntdata] = useState([]);
    const [clgnames, setclgnames] = useState([]);
    const BASE_URL = process.env.REACT_APP_BASEURL;

    const [userBranch , setuserBranch] = useState("");
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("authUser"))
        setuserBranch(user.userBranch)
        console.log(user)
    } , [])

    useEffect(() => {
        axios.get(BASE_URL + '/api/get-campus-count/' + userBranch )
            .then((res) => {
                settotaldata(res);
                // console.log('/api/get-campus-count/')
                // console.log(res)
                var arr = [], brr = [];
                Object.entries(res).map(ele => {
                    console.log(ele[0], ele[1])
                    arr.push(ele[0]);
                    brr.push(ele[1]);
                })
                setclgnames(arr);
                // console.log(arr)
                const result = []
                for(let i = 0 ; i < 4 ; i++){
                    const total = brr[i].firstyear+brr[i].secondyear+brr[i].thirdyear + brr[i].finalyear;
                    result.push(total)                }
                setcntdata(result);
                // console.log(result)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [userBranch]);

    const data = {
        labels: clgnames,
        datasets: [
            {
                data:cntdata,
                backgroundColor: [
                    "#008738", "#FFBB00", "#173093", "#F348AD"
                ],
                borderColor: [
                    '#fff',
                    '#fff',
                    '#fff',
                    '#fff'
                ],
                hoverBackgroundColor: ["#008738", "#FFBB00", "#173093", "#F348AD"],
                hoverBorderColor: "#fff",
            },
        ],
    }
    return (
        <React.Fragment>
            <Pie width={500} height={250} data={data} className="chartjs-chart" />
        </React.Fragment>
    );
}

export default PieChart
