import axios from "axios";
import { Field, Formik, useFormik, Form, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup';

export function UserRegister(){

    let navigate = useNavigate();

    return(
        <div className="container-fluid form">
          <div className="container-fluid text-white d-flex ">
          <div className="bg-dark p-3">
            <Formik initialValues={{
                UserId:'',
                UserName:'',
                Password:'',
                Mobile:'',
                Email:''
            }}
            validationSchema={yup.object({
                UserId: yup.string().required('UserId Required'),
                UserName: yup.string().required('User Name Required').min(4,'Name too short min 4 chars'),
                Password: yup.string().required('Password Required'),
                Mobile: yup.string().matches(/\+91\d{10}/, 'Invalid Mobile +91 9959833410').required('Mobile Required'),
                Email: yup.string().required('Email Required')
            })}
            onSubmit={(user)=>{
                axios.post(`http://127.0.0.1:2200/register-user`, user);
                alert("Registered Successfully..");
                navigate('/login');
            }} >
              {
                form =>
                <Form>
                     <h2 className="text-danger bi bi-person-add"> Register User</h2>
                <dl>
                    <dt>User Id</dt>
                    <dd> <Field type="text" name="UserId" className='form-control'></Field></dd>
                    <dd className="text-danger"><ErrorMessage name="UserId" /></dd>
                    <dt>User Name</dt>
                    <dd><Field type="text" name="UserName" className='form-control'></Field></dd>
                    <dd className="text-danger"><ErrorMessage name="UserName" /></dd>
                    <dt>Password</dt>
                    <dd> <Field type="password" name="Password" className='form-control'></Field></dd>
                    <dd className="text-danger"><ErrorMessage name="Password" /></dd>
                    <dt>Mobile</dt>
                    <dd><Field type="text" name="Mobile" className='form-control'></Field></dd>
                    <dd className="text-danger"><ErrorMessage name="Mobile" /></dd>
                    <dt>Email</dt>
                    <dd><Field type="email" name="Email" className='form-control'></Field></dd>
                    <dd className="text-danger"><ErrorMessage name="Email" /></dd>
                </dl>
                <button disabled={(form.isValid)?false:true} type="submit" className="btn btn-primary w-100">Register</button>
                <Link to='/login' className="btn btn-warning w-100 mt-1">Existing User Login</Link>
                </Form>
              }
            </Formik>
          </div>
        </div>
        </div>
    )
}