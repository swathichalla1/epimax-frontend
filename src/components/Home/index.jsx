import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'
import ShowDetails from '../ShowDetails'

const Home =()=>{

    const [task,settask] = useState("");
    const [deadline,setDeadline] = useState("");
    const [status,setstatus] = useState("Start");
    const [user,setuser] = useState("Team A");
    const [feedback,setFeedback] = useState("");
    const [allTasks,setallTasks] = useState([]);
    const [startcount,setstartcount] = useState(0);
    const [inprogresscount,setinprogresscount] = useState(0);
    const [endcount,setendcount] = useState(0);

    useEffect(()=>{
      const getvaluesofstatus = () => {
        let startCount = 0;
        let inProgressCount = 0;
        let endCount = 0;
      
        for (let eachone of allTasks) {
          if (eachone.Status === "Start") {
            startCount++;
          } else if (eachone.Status === "In Progress") {
            inProgressCount++;
          } else if (eachone.Status === "End") {
            endCount++;
          }
        }
      
        setstartcount(startCount);
        setinprogresscount(inProgressCount);
        setendcount(endCount);
      };
      getvaluesofstatus();
      
    },[allTasks])

    

    useEffect(()=>{
        
        async function getAllTasks(){
    
          try{
            const Tasksresponse = await fetch("https://epimax-backend-rlhm.onrender.com/Task/AllTasks");
          const Tasksdata = await Tasksresponse.json();
          
          if(Tasksresponse.ok){
            
            setallTasks(Tasksdata.allTasks);
          }
    
          }catch(error){
            alert("something went wrong try again! ",error)
            
          }
          
        }
    
        getAllTasks()
      },[])

      const changetask = (feedback,status,SNo)=>{

        

        const updatedtasks = allTasks.map((task)=>{
          if(task.SNo === SNo){
               task.Feedback = feedback,
               task.Status = status
          }
          return task
        })
       
        setallTasks(updatedtasks);

      }

    const onSubmitTask = async(event)=>{
        event.preventDefault();
        const newTask = {
            SNo : allTasks.length+1,
            Task : task,
            Deadline : deadline,
            Status : status,
            Feedback:feedback,
            User : user
        }
        

        try{
            const options = {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json' 
                },
                body:JSON.stringify(newTask)
            }
            const response = await fetch("https://epimax-backend-rlhm.onrender.com/Task/AddTask",options);
            const data = await response.json();

            if (response.ok){
                alert("Task Added sucesfully");
            }
            

        }catch(error){
          alert("something went wrong try again! ",error)
        }
        const updatedTaskList = [...allTasks,newTask];
        
        setallTasks(updatedTaskList);
        setDeadline("");
        settask("");

    }

   

    return(
        <div className="container">
         <Header/>
         <form  onSubmit={onSubmitTask} className="form-container">
           <div className="eachcontainer">
            <label className="label" htmlFor="task">Task</label>
            <input type="text" value={task} id="task" onChange={(e)=>(settask(e.target.value))} required/>
           </div>

           <div className="eachcontainer">
            <label className="label" htmlFor="Deadline">Deadline</label>
            <input type="date" value={deadline} id="Deadline" onChange={(e)=>(setDeadline(e.target.value))} required/>
           </div>

           <div className="eachcontainer">
           <label className="label" htmlFor="status">Status</label>
           <div className="inputfields">
           <div className="eachcontainer">
           <label className="label" htmlFor="Start">Start</label>
           <input type="radio" name="status" value="Start" id="Start" checked={status === "Start"}  onChange={(e)=>(setstatus(e.target.value))}/>
           </div>
           <div className="eachcontainer">
           <label className="label" htmlFor="Inprogress">In progress</label>
           <input type="radio" name="status" value="In Progress" id="Inprogress" checked={status === "In Progress"}  onChange={(e)=>(setstatus(e.target.value))}/>
           </div>
            </div>
            <label className="label" id="Assign">Assign task to : </label>
            <select id="Assignment" value={user} onChange={(e)=>(setuser(e.target.value))}>
            <option value="Team A" name="Assign" id="Team A" >Team A</option>
            <option value="Team B" name="Assign" id="Team B" >Team B</option>
            <option value="Team C" name="Assign" id="Team C" >Team C</option>
            </select>
            <button type="submit" className="submitButton">Add Task</button>
           </div>

         </form>

         <hr/>

         <h1 className="heading">Assigned Tasks List</h1>
         <table className="table">
         <thead>
      <tr>
      <th>S.No</th>
      <th>Task</th>
      <th>User</th>
      <th>Status</th>
      <th>Deadline</th>
      </tr>
      </thead>
      <tbody>

         {allTasks.map((each)=>(
          
            <ShowDetails  key={each.SNo} details={each} changetask={changetask}/>
         ))}
         </tbody>
        
        </table>

        <Link to={`/summary/${startcount}/${inprogresscount}/${endcount}`} className="link"  ><h1>View Task Summary</h1></Link>
        </div>
    )
    
    
}

export default Home