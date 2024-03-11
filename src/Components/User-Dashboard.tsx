import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { VideoContract } from "../Contracts/VideoContract";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Store from "../Store/Store";
import { Home } from "./Home";

export function UserHome(){

   const [cookie, setcookie, removecookie] = useCookies(['username']);
   const [Videos, SetVideos] = useState<VideoContract[]>([]);
   
   let navigate = useNavigate();

    
   useEffect(()=>{

    axios.get(`http://127.0.0.1:2200/getvideos`)
    .then(response=>{
      SetVideos(response.data);
    });

   },[]);

   function handleLogout(){
    removecookie('username');
    navigate('/login');
    window.location.reload();
   }
    
    
    return(
        <div className="container-fluid">
           <div className="text-white d-flex justify-content-between">
             <h4>User Dashboard</h4>
             <div className="d-flex justify-content-between">
             <span className=" me-3 text-info fs-4">
                {
                    cookie['username']
                }
              </span>
              <span>
                <button onClick={handleLogout} className="btn btn-danger">SignOut</button>
              </span>
             </div>
           </div>
           <div className="bg-dark text-white">
           <div className="d-flex justify-content-between flex-wrap mt-2">
            {
              Videos.map(Video=>
                <div className="card m-1">
                  <div className="card-header">
                  <h4 className="text-center text-primary">{Video.Title}</h4>
                  </div>
                  <div className="card-body">
                  <iframe src={Video.Url} width="100%" height="100%" className="card-img-top"></iframe>
                  </div>
                  <div className="card-footer">
                     <button className="btn btn-light w-100">Watch Later</button>
                     <p><span className="bi bi-heart"></span> {Video.Likes}</p>
                     <b>{Video.Views} <span>Views</span></b>
                     <p><span>Comments: </span> {Video.Comments}</p>
                  </div>
                </div>
                )
            }
           </div>
           </div>
        </div>
    )
}