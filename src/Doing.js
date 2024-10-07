import * as React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

import { useContext } from 'react';
import  { TodoContext } from './TodoContext';

export default function FixedContainer({setStartDoing}) {

    const [,,,,,,todo] = useContext(TodoContext);

    function discard(){
        setStartDoing(false)
    }

    

  return (
    <div id='popBg'>
        <div id='popDoing'>
            <CancelIcon id='cancelIcon' onClick={discard}/>
            <h1>You should be doing:</h1>
            <h2>{todo}</h2>
            <div className='align-btn'>
                <button onClick={discard}>discard</button>
                <button>stop</button>
            </div>
        </div>
    </div>
  );
}
