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
import { data } from './data'
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
    res.forEach(e => {
        if (e.site_id.includes("臺北市")) districtSet.add(e.site_id)
    });
    districtArray = [...districtSet]
    for (let i = 0; i < districtArray.length; i++) {
        districtObjArray.push({value: districtArray[i], label: districtArray[i]})
    }
    const countPeople = (district_name, res_array) => {
        let result = res_array.filter(ele => ele.site_id == district_name)
        return result;
    }

    const [district, setDistrict] = useState(districtObjArray[0].value)
    const [singleF, setSingleF] = useState(countPeople(district, res).reduce(((prev, curr) => prev + parseInt(curr.household_single_f, 10)), 0))
    const [singleM, setSingleM] = useState(countPeople(district, res).reduce(((prev, curr) => prev + parseInt(curr.household_single_m, 10)), 0))
    const [groupF, setGroupF] = useState(countPeople(district, res).reduce(((prev, curr) => prev + parseInt(curr.household_ordinary_f, 10)), 0))
    const [groupM, setGroupM] = useState(countPeople(district, res).reduce(((prev, curr) => prev + parseInt(curr.household_ordinary_m, 10)), 0))

    const changeDistrict = (dist) => {
        setDistrict(dist);
        setSingleF(countPeople(dist, res).reduce(((prev, curr) => prev + parseInt(curr.household_single_f, 10)), 0))
        setSingleM(countPeople(dist, res).reduce(((prev, curr) => prev + parseInt(curr.household_single_m, 10)), 0))
        setGroupF(countPeople(dist, res).reduce(((prev, curr) => prev + parseInt(curr.household_ordinary_f, 10)), 0))
        setGroupM(countPeople(dist, res).reduce(((prev, curr) => prev + parseInt(curr.household_ordinary_m, 10)), 0))
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
    };

    const labels = ["共同生活戶", "個體生活戶"];
    const male = [groupM, singleM];
    const female = [groupF, singleF];

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
                            onChange = {e => changeDistrict(e.value)}
                        />
                    </div>
                    <Bar options={options} data={chartData} />
                </div>
            </main>
        </>
    )
}