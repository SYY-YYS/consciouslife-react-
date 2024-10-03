import { useState } from 'react';

const Clock = () => {
    const [time, setTime] = useState();
    function infinite() {
        const date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let sec = date.getSeconds();
        if(JSON.stringify(minute).length === 1) { 
          minute='0'+ minute}
        if(JSON.stringify(sec).length === 1) { 
          sec='0'+ sec}
        if(JSON.stringify(hour).length === 1) { 
          hour='0'+ hour}
        setTime(hour+' : '+ minute+' : '+sec);
    }
    setInterval(infinite, 100)
    return (
        <div className="clock">
            <div className='clockDisplay'>
                <h1>{time}</h1>
            </div>
        </div>
    );
}
 
export default Clock;