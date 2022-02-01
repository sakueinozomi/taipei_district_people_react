import React, {useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {data} from './data'
import './LogoBar.css';
import Select from 'react-select'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const GetData = () => {
    const [allDistrict, setAllDistrict] = useState([])
    // const [district, setDistrict] = useState("")
    // const [singleF, setSingleF] = useState("")
    // const [singleM, setSingleM] = useState("")
    // const [groupF, setGroupF] = useState("")
    // const [groupM, setGroupM] = useState("")

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
    };

    const labels = ["共同生活戶", "個體生活戶"];
    const female = [20, 59];
    const male = [34, 17];

    const data = {
        labels,
        datasets: [
          {
            label: "男",
            data: male,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: "女",
            data: female,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
          
        ],
    };

    // let res = data[0].result.records;
    // if (isNaN(parseInt(res[0].statistic_yyy, 10))){
    //     res.shift()
    // }
    // let allDistr = [];

    const selectOptions = [
        { value: '新北市板橋區', label: '新北市板橋區' },
        { value: '新北市三重區', label: '新北市三重區' }
    ];

    return (
        <>
            <main>
                <div className='render'>
                    <Select 
                        options={selectOptions}
                    />
                    <Bar options={options} data={data} />
                </div>
            </main>
        </>
    )
}