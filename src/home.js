import Form from "./form";
import Show from "./show";

import axios from "axios";

import SwipeableTemporaryDrawer from './SwipeableDrawer.js';


export function convertTime(timeInSeconds) {
    if (timeInSeconds < 60) {
        return `${timeInSeconds} s`;
    } else if (timeInSeconds < 3600) {
        return `${(timeInSeconds / 60).toFixed(2)} min`;
    } else {
        return `${(timeInSeconds / 3600).toFixed(2)} h`;
    }
}



export default function Home({setTimer,timer}){

    return(
        <div>
            <SwipeableTemporaryDrawer/>
            <Form timer={timer} setTimer={setTimer}/>

            {/* just for development purpose */}
            <Show timer={timer}/>
        </div>
    );
}