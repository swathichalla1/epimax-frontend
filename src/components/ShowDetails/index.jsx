import React,{useState} from 'react'
import './index.css'

const ShowDetails = (props) => {
  const {details,changetask} = props;
    const {SNo,Task,Deadline,Status,User,Feedback} = details;


  const [feedback,addfeedback] = useState(Feedback);
  const [edit,setedit] = useState(false);
  const [statusvalue,setStatus] = useState(Status);

const TaskId = details.SNo;
  

  const changefeedback = (e)=>{
   addfeedback(e.target.value);
}

  const clickedEdit = ()=>{
    setedit(true);
  }

  const clickedSave = async()=>{
    setedit(false);
    
    try{
      const changeresponse = await fetch(`https://epimax-backend-rlhm.onrender.com/Task/updateTask/${TaskId}`,{
      method:"PUT",
      headers: {
        'Content-Type': 'application/json' 
    },
    body : JSON.stringify({feedback,statusvalue})
     })

     const changeresponsedata = await changeresponse.json();
  
     if(changeresponse.ok){
      changetask(feedback,statusvalue,SNo);
     }
  
     }catch(error){
      alert("something went wrong try again! ",error)
     }
  }

    
  return (
    <>
      <tr>
      <td>{SNo}</td>
      <td>{Task}</td>
      <td>{User}</td>
      <td><select id="status" value={statusvalue} onChange={(e)=>(setStatus(e.target.value))}>
      <option value="Start" name="status" id="Start" >Start</option>
      <option value="In Progress" name="status" id="In progress" >In Progress</option>
      <option value="End" name="status" id="End" >End</option>
      </select></td>
      <td>{Deadline}</td>
      </tr>
      <tr>
                <td colSpan="5">
                <h1 className="feedback">Feedback</h1>
                {edit ? <input type="text" placeholder="Enter the feedback of task" style={{ width: "90%" }} onChange={changefeedback} value={feedback}/> :
                <p>{feedback}</p> } 
                <div className="allbuttons"> 
                    <button onClick={clickedEdit} className="buttons">Edit Feedback</button>
                    <button onClick={clickedSave} className="buttons">Save All</button>
                    </div> 
                </td>
      </tr>
    </>
  )
}

export default ShowDetails
