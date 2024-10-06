import Form from "./form";
import Waiting from "./Waiting";
import Show from "./show";

import SwipeableTemporaryDrawer from './SwipeableDrawer.js';

export default function Home({setTimer,timer}){

    return(
        <div>
            <SwipeableTemporaryDrawer/>
            <Form setTimer={setTimer}/>
            <Waiting timer={timer}/>
            {/* <Show timer={timer}/> */}
        </div>
    );
}