import Form from "./form";
import Waiting from "./Waiting";
import Show from "./show";

export default function Home({setTimer,timer}){

    return(
        <div>
            <Form setTimer={setTimer}/>
            <Waiting timer={timer}/>
            <Show timer={timer}/>
        </div>
    );
}