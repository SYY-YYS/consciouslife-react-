import SwipeableTemporaryDrawer from './SwipeableDrawer.js';


function About(){

    return(
        <>
        
        <div className='information'>
            <SwipeableTemporaryDrawer/>
            <h2>
            <strong>Description:</strong><br />
            This app aims to replicate a python app that the coder uses, which records time spent into an excel file (shown in coder's <a href='https://syy-yys.github.io/mywebpage/' target={'_blank'} rel="noreferrer">personal website</a>).<br />
            Accumulated time of repeated items will be shown in same line.<br />
            It won't save your records when you leave the page, so please just use it for daily records.<br />
            
            <br />
            </h2>
        </div>
        </>
    );
}

export default About;