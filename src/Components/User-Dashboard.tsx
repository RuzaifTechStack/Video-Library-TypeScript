import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { VideoContract } from "../Contracts/VideoContract";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Store from "../Store/Store";
import { AddToLibrary } from "../Slicers/Video-slicer";
import { Home } from "./Home";
import { useDispatch } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function UserHome(){

   const [cookie, setcookie, removecookie] = useCookies(['username']);
   const [Videos, SetVideos] = useState<VideoContract[]>([]);
   
   let navigate = useNavigate();
   
   const dispatch = useDispatch();

   const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function LoadVideos(){
    axios.get(`http://127.0.0.1:2200/getvideos`)
    .then(response=>{
      SetVideos(response.data);
    });
  }
    
   useEffect(()=>{

    LoadVideos();

   },[Store.getState().store.videoCount]);

   function handleLogout(){
    removecookie('username');
    navigate('/login');
    window.location.reload();
   }
    
   function handleSaveVideoClick(video:any){
      dispatch(AddToLibrary(video));
      alert('Video Add To Watch Later');
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
           <div className="w-25">
            <button onClick={handleShow} className="btn btn-warning w-100 position-relative bi bi-camera-fill"><span className="badge bg-danger position-absolute rounded rounded-circle"> {Store.getState().store.videoCount}</span></button>
                      <Modal show={show} onHide={handleClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Watch Later Videos</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="m-1">
                    {
                      Store.getState().store.MyVideoLibrary.map((Video: {Url:string, Title:string, Views:number, Comments:[], Likes:number})=>
                                <div className="card m-1">
                            <div className="card-header">
                            <h4 className="text-center text-primary">{Video.Title}</h4>
                            </div>
                            <div className="card-body">
                            <iframe src={Video.Url} width="100%" height="100%" className="card-img-top"></iframe>
                            </div>
                            <div className="card-footer">
                              <button onClick={()=> handleSaveVideoClick(Video)} className="btn btn-light w-100">Watch Later</button>
                              <p><span className="bi bi-heart"></span> {Video.Likes}</p>
                              <b>{Video.Views} <span>Views</span></b>
                              <p><span>Comments: </span> {Video.Comments}</p>
                            </div>
                          </div>
                        )
                    }
                    </div>
                  </Modal.Body>
                </Modal>
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
                     <button onClick={()=> handleSaveVideoClick(Video)} className="btn btn-light w-100">Watch Later</button>
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