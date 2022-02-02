import React, {useState} from 'react';
import './GetData.css';
import { data } from './data'

export const LogoBar = () => {

    const year = data[0].result.records[1].statistic_yyy
    return (
        <>
            <div className="logo-bar">
                <div className="logo"></div>
                <div className="title">
                    {year}年人口戶數及性別
                </div>
            </div> 
        </>
    )
}