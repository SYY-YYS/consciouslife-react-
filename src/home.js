import Form from "./form";
import Show from "./show";

import axios from "axios";

import SwipeableTemporaryDrawer from './SwipeableDrawer.js';


function convertTime(timeInSeconds) {
    if (timeInSeconds < 60) {
        return `${timeInSeconds} seconds`;
    } else if (timeInSeconds < 3600) {
        return `${(timeInSeconds / 60).toFixed(2)} minutes`;
    } else {
        return `${(timeInSeconds / 3600).toFixed(2)} hours`;
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