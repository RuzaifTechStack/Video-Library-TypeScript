import { useEffect, useState } from "react"
import { UserContract } from "../Contracts/UserContract";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useFormik } from "formik";
import axios from "axios";

export function UserLogin(){

   const [Users, SetUsers] = useState<UserContract[]>([]);
   const [cookie, setcookie, removecookie] = useCookies(['username']);
   let navigate = useNavigate();

   useEffect(()=>{
    axios.get(`http://127.0.0.1:2200/getuser`)
    .then(response=>{
      SetUsers(response.data);
    });
   },[]);
     
    const formik = useFormik({
      initialValues: {
        UserName:'',
        Password:''
      },
      onSubmit: (formdata) =>{
        var userdetails = Users.find(user=> user.UserName=== formdata.UserName);
        if(userdetails?.Password=== formdata.Password){
          setcookie('username', formdata.UserName);
          navigate('/userhome');
          window.location.reload();
        }else{
          navigate('/invalid');
        }
      }
    })

    return(
        <div className="container-fluid mt-4">
            <div className="d-flex justify-content-center align-items-center mt-4">
            <form onSubmit={formik.handleSubmit} className="border border-1 p-3 mt-4 mb-4 rounded">
                <h2 className="bi bi-person text-warning"> User Login</h2>
                <dl>
                    <dt>UserName</dt>
                    <dd><input type="text" name="UserName" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt>Password</dt>
                    <dd>
                        <input type="password" name="Password" className="form-control" onChange={formik.handleChange} />
                    </dd>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                    <Link to='/register' className="btn btn-warning w-100 mt-2">New User Register</Link>
                </dl>
            </form>
          </div>
        </div>
    )
}