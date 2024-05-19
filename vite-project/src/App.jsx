import { useState } from "react";
import "./App.css";

function App() {
  const [openform, setopenform] = useState(false);
  const[error,seterror] = useState("")
  const[formdata,setformdata] = useState({username:"",email:"",phone:"" ,dob:""})
const handeclose = ()=>{
  setopenform(false);
  seterror("")
}
const handlechange = (e)=>{
const {name,value} = e.target ;
console.log(name,value);
setformdata((prevdata)=>({...prevdata ,[name]:value}))

}
const handleSubmit = (event)=>{
  event.preventDefault()
  if (!formdata.username || !formdata.email || !formdata.phone || !formdata.dob) {
    seterror("Please fill out all fields.");
    return;
  }
  if ( !formdata.email.includes("@")) {
    seterror("Invalid email. Please check your email address.");
    return;
  }
  if (!/^\d{10}$/.test(formdata.phone)) {
    seterror(
      "Invalid phone number. Please enter a 10-digit phone number."
    );
    return;
  }
  const currentDate = new Date();
  const dobDate = new Date(formdata.dob);

if(dobDate>currentDate)
  {
    seterror("Invalid Date of Birth. Please enter a valid date.");
    return;
  }

  setformdata({username:"",email:"",phone:"" ,dob:""})


handeclose();
  
}
  return (
    <>
      <div className="first"  onClick={handeclose}>
        <h1>User Details Modal</h1>
        <button onClick={(e) =>  {e.stopPropagation(),setopenform(true)}}>Open form</button>
      </div>
      {
        openform &&
      <div className="modal" onClick={handeclose}>
        <div className="modal-content">
          <form className="form"   onSubmit={handleSubmit}   onClick={(e) =>  e.stopPropagation()}>
            <label htmlFor="username">Username:</label>
            <input name="username" onChange={handlechange} type="text" id="username" />
            <label  htmlFor="email">Email:</label>
            <input onChange={handlechange}  name="email" type="email" id="email" />
            <label htmlFor="phone">Phone:</label>
            <input onChange={handlechange}  name="phone"  type="tel" id="phone" />
            <label htmlFor="dob">Date of Birth:</label>
            <input onChange={handlechange}  name="dob" type="date" id="dob" />
            <button onChange={handlechange}  type="submit" className="submit-button">
              Submit
            </button>
            {error && <p className="error-msg">{error}</p>}
          </form>
        </div>
      </div>
}
    </>
  );
}

export default App;
