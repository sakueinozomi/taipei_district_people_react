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
    let res = data[0].result.records;
    if (isNaN(parseInt(res[0].statistic_yyy, 10))){
        res.shift()
    }
    const districtSet = new Set();
    let districtArray = [];
    let districtObjArray = [];
    res.forEach(e => districtSet.add(e.site_id));
    districtArray = [...districtSet]
    for (let i = 0; i < districtArray.length; i++) {
        districtObjArray.push({value: districtArray[i], label: districtArray[i]})
    }

    // console.log(districtObjArray)

    const [district, setDistrict] = useState(districtObjArray[0].data)
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

    const chartData = {
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


    return (
        <>
            <main>
                <div className='render'>
                    <div className='select-box'>
                        地區
                        <Select 
                            className="select-option" 
                            options={districtObjArray}
                            defaultValue={districtObjArray[0].value}
                            placeholder={districtObjArray[0].value}
                            onChange = {e => setDistrict(e.value)}
                        />
                    </div>
                    <Bar options={options} data={chartData} />
                </div>
            </main>
        </>
    )
}