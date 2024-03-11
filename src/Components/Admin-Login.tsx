import { useEffect, useState } from "react"
import { AdminContract } from "../Contracts/AdminContract"
import { useCookies } from "react-cookie";
import { CookieContract } from "../Contracts/CookieContract";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";

export function AdminLogin(){

    const [Admin, SetAdmin] = useState<AdminContract[]>([]);
    const [Cookie, Setcookie, RemoveCookie] = useCookies(['admin']);

    let navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:2200/getadmin`)
        .then(response=>{
            SetAdmin(response.data);
        })
    },[])

    const formik = useFormik({
        initialValues:{
            UserName: '',
            Password:''
        },
        onSubmit: (formdata)=>{
            var AdminDetails = Admin.find(admin=> admin.UserName === formdata.UserName);
            if(AdminDetails?.Password === formdata.Password){
                Setcookie('admin',formdata.UserName);
                navigate('/adminhome');
                window.location.reload();
            }else{
                navigate('/invalid');
            }
        }
    })

    return(
        <div className="container-fluid">
          <div className="d-flex justify-content-center align-items-center mt-4">
            <form onSubmit={formik.handleSubmit} className="border border-1 p-3 rounded">
                <h2 className="bi bi-person text-warning"> Admin Login</h2>
                <dl>
                    <dt>UserName</dt>
                    <dd><input type="text" name="UserName" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt>Password</dt>
                    <dd>
                        <input type="password" name="Password" className="form-control" onChange={formik.handleChange} />
                    </dd>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </dl>
            </form>
          </div>
        </div>
    )
}