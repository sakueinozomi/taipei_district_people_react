import {data} from './data'
import './LogoBar.css';

export const GetData = () => {
    let res = data[0].result.records;
    if (isNaN(parseInt(res[0].statistic_yyy, 10))){
        res.shift()
    }
    console.log(res)

    return (
        <>
            <main>
                <div className='render'></div>
            </main>
        </>
    )
}