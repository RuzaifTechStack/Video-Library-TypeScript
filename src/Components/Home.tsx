import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContract } from "../Contracts/UserContract";
import axios from "axios";
import { AdminLogin } from "./Admin-Login";
import { AdminContract } from "../Contracts/AdminContract";


function RegisterLink(){
  return(
    <div>
      <Link to='/register' className="btn btn-danger mt-3">Account Not Found - Register Now</Link>
    </div>
  )
}

export function Home(){
    
    const [Admin, SetAdmin] = useState<AdminContract[]>([]);
    const [Email, SetEmail] = useState<string>();
    const [UserError, SetUserError] = useState<any>();
    let navigate = useNavigate();
     
    function LoadUsers(){
      axios.get(`http://127.0.0.1:2200/getadmin`)
      .then(response=>{
        SetAdmin(response.data);
      })
    }
    useEffect(()=>{
       LoadUsers();
    },[])

    function handleEmailChange(e:any){
      SetEmail(e.target.value);
    }

    function handleGetStared(){
      var user = Admin.find(item => item.Email == Email);
      if(user==undefined){
         SetUserError(<RegisterLink />);
      }else{
         navigate('/adminlogin');
      }
    }


    return(
        <div className="container-fluid">
        <header className="d-flex justify-content-between flex-wrap p-2">
        <div>
            <h2 className="text-primary">Tech Videos Hub</h2>
          </div>
          <div>
            {/* <Link to='/register' className="btn btn-warning me-3"> New User Register</Link> */}
            <Link to='/login' className="btn btn-success me-3"> Existing User Login</Link>
            <Link to='/register' className="btn btn-danger">New User Register</Link>
          </div>
        </header>
        <section>
          <div className="text-center mt-3">
            <h3>Learn Coding</h3>
            <p>Web Technologies, ReactJs, NodeJs, ExpressJs MongoDB etc..</p>
          </div>
          <main className="d-flex justify-content-center align-items-center">
            <div>
            <div className="input-group mt-3">
              <input onChange={handleEmailChange} type="email" name="email" placeholder="Enter Email/adminLogin" className="form-control" />
              <button onClick={handleGetStared} className="btn btn-danger">Get Started <span className="bi bi-arrow-right"></span></button>
             </div>
             <div>
                <b className="text-danger">{UserError}</b>
               </div>
            </div>
          </main>
        </section>
        </div>
    )
}