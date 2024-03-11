import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import { VideoContract } from "../Contracts/VideoContract";
import axios from "axios";
import { useFormik } from "formik";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function AdminHome(){
  
  const [Cookie, Setcookie, RemoveCookie] = useCookies(['admin']);
  const [Videos, SetVideos] = useState<VideoContract[]>([]);
  const [EditVideos, SetEditVideos] = useState<VideoContract[]>([{VideoId:0, Title:'', Url:'',Description:'',Likes:0, Dislikes:0, Views:0, Comments:[], CategoryId:0}]);
  let navigate = useNavigate();

  const [GetCategory, SetCategory] = useState<any>([{CategoryId:0, CategoryName:''}]);

   const [show, setShow] = useState(false);
   const [EditShow, SetEditShow] = useState(false);
   const [CategoryModal, SetCategoryModal] = useState(false);

  const handleClose = () => setShow(false);
  const handleEditClose = () => SetEditShow(false);
  const handlecategoryClose = () => SetCategoryModal(false);
  const handleShow = () => setShow(true);

  function handleOpenModal(){
    SetCategoryModal(true);
  }

   function handleLogout(){
    RemoveCookie('admin');
    navigate('/adminlogin');
    
   }

   const Categoryformik = useFormik({
    initialValues:{
      CategoryId:'',
      CategoryName:''
    },
    onSubmit: (formdata) =>{
      axios.post(`http://127.0.0.1:2200/addcategory`, formdata);
      alert('Category Added');
      window.location.reload();
    }
   })

   useEffect(()=>{
    axios.get(`http://127.0.0.1:2200/getvideos`)
    .then(response=>{
      SetVideos(response.data);
    });
   },[]);

   const formik = useFormik({
    initialValues: {
      VideoId:'',
      Title:'',
      Url:'',
      Description:'',
      Likes:'',
      Dislikes:'',
      Views:'',
      Comments:'',
      CategoryId:''
    },
    onSubmit: (Add)=>{
      axios.post(`http://127.0.0.1:2200/addvideo`, Add )
      alert("Video Added");
      window.location.reload();
    }
   })

   function handleEditClick(id:any){
     SetEditShow(true);
    axios.get(`http://127.0.0.1:2200/getvideo/${id}`)
    .then(response=>{
      SetEditVideos(response.data);
    });
   };

   const Editformik = useFormik({
    initialValues: {
    VideoId: EditVideos[0].VideoId,
    Title: EditVideos[0].Title,
    Url: EditVideos[0].Url,
    Description: EditVideos[0].Description,
    Likes: EditVideos[0].Likes,
    Dislikes: EditVideos[0].Dislikes,
    Views:EditVideos[0].Views,
    Comments: EditVideos[0].Comments,
    CategoryId: EditVideos[0].CategoryId
    },
    onSubmit:(Edit) =>{
      axios.put(`http://127.0.0.1:2200/updatevideo/${Edit.VideoId}`, Edit);
      alert('Video Edited');
      window.location.reload();
    },
    enableReinitialize:true
   })
    
   function handleDelete(e:any){
    axios.delete(`http://127.0.0.1:2200/deletevideo/${e.target.value}`)
    .then(()=>{
      alert("Video Deleted");
    });
    window.location.reload();
   }


    return(
        <div className="container-fluid">
         <div className="text-white d-flex justify-content-between">
             <h4 className="text-danger">Admin Dashboard</h4>
             <div className="d-flex justify-content-between">
             <span className=" me-3 text-info fs-4">
                {
                    Cookie['admin'].toUpperCase()
                }
              </span>
              <span>
                <button onClick={handleLogout} className="btn btn-danger">SignOut</button>
              </span>
             </div>
           </div>
           <section>
             <div>
              <div className="text-center mb-3">
              <Button variant="primary" onClick={handleShow}>Add Video</Button>
               <button onClick={handleOpenModal} className="btn btn-danger ms-2">Add Category</button>
              </div>
              <div>
              <Modal show={CategoryModal} onHide={handlecategoryClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={Categoryformik.handleSubmit}>
                    <dl>
                      <dt>Category Id</dt>
                      <dd>
                        <input type="text" onChange={Categoryformik.handleChange} className="form-control" name="CategoryId" />
                      </dd>
                      <dt>Category Name</dt>
                      <dd>
                        <input type="text" onChange={Categoryformik.handleChange} className="form-control" name="CategoryName" />
                      </dd>
                      <button className="btn btn-dark w-100">Submit</button>
                    </dl>
                  </form>
                </Modal.Body>
                </Modal>
              </div>
             <div>
             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                      <dl>
                          <dt>Video Id</dt>
                          <dd>
                              <input type="text" name="VideoId" required onChange={formik.handleChange} className="form-control" />
                          </dd>
                          <dt>Title</dt>
                          <dd>
                              <input type="text" name="Title" onChange={formik.handleChange} className="form-control" />
                          </dd>
                          <dt>Url</dt>
                          <dd>
                              <input type="text" name="Url" onChange={formik.handleChange} className="form-control" />
                          </dd>
                          <dt>Description</dt>
                          <dd>
                              <input type="text" name="Description" onChange={formik.handleChange} className="form-control" />
                          </dd>
                          <dt>Likes</dt>
                          <dd>
                              <input type="text" name="Likes" onChange={formik.handleChange} className="form-control" />
                          </dd>
                          <dt>Dislikes</dt>
                          <dd>
                              <input type="text" name="Dislikes" onChange={formik.handleChange} className="form-control" />
                          </dd>
                          <dt>Views</dt>
                          <dd>
                              <input type="text" name="Views" onChange={formik.handleChange} className="form-control" />
                          </dd>
                          <dt>Comment</dt>
                          <dd>
                              <input type="text" name="Comments" onChange={formik.handleChange} className="form-control" />
                          </dd>
                          <dt>Enter Category</dt>
                          <dd>
                              <input type="text" name="CategoryId" onChange={formik.handleChange} className="form-control" />
                          </dd>
                          
                      </dl>
                      <button type="submit" className="btn btn-warning w-100">Add</button>
                  </form>
                </Modal.Body>
              </Modal>
             </div>
             </div>
    
               <div>
                <table className="table table-hover">
                  <thead>
                    <tr className="text-center">
                        <th>Title</th>
                        <th>preview</th>
                        <th>Actions</th>
                    </tr>
                  </thead>
                  {
                    Videos.map(video=>
                        <tbody>
                            <tr>
                                <td>{video.Title}</td>
                                <td>
                                    <iframe src={video.Url} width='100%' height='200vh'></iframe>
                                </td>
                                <td>
                                    <button onClick={()=> handleEditClick(video.VideoId)}  className="btn btn-warning bi bi-pen-fill me-2 " value={video.VideoId}></button>
                                    <button onClick={handleDelete}  value={video.VideoId} className="btn btn-danger bi bi-trash-fill"></button>
                                </td>
                            </tr>
                        </tbody>
                        )
                  }
                </table>
              </div>
              <div>
              <Modal
                      show={EditShow}
                      onHide={handleEditClose}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title><h2 className="text-danger">Edit Video</h2></Modal.Title>
                      </Modal.Header>
                       <Modal.Body>
                            <form onSubmit={Editformik.handleSubmit}>
                               <dl>
                                <dt>VideoId</dt>
                                <dd>
                                    <input type="text" name="VideoId" value={Editformik.values.VideoId} onChange={Editformik.handleChange} className="form-control" />
                                </dd>
                                <dt>Title</dt>
                                <dd>
                                    <input type="text" name="Title" value={Editformik.values.Title} onChange={Editformik.handleChange} className="form-control" />
                                </dd>
                                <dt>Url</dt>
                                <dd>
                                    <input type="text" name="Url" value={Editformik.values.Url} onChange={Editformik.handleChange} className="form-control" />
                                </dd>
                                <dt>Description</dt>
                                <dd>
                                    <input type="text" name="Description" value={Editformik.values.Description} onChange={Editformik.handleChange} className="form-control" />
                                </dd>
                                <dt>Likes</dt>
                                <dd>
                                    <input type="text" name="Likes" value={Editformik.values.Likes} onChange={Editformik.handleChange} className="form-control" />
                                </dd>
                                <dt>Dislikes</dt>
                                <dd>
                                    <input type="text" name="Dislikes" value={Editformik.values.Dislikes} onChange={Editformik.handleChange} className="form-control" />
                                </dd>
                                <dt>Views</dt>
                                <dd>
                                    <input type="text" name="Views" value={Editformik.values.Views} onChange={Editformik.handleChange} className="form-control" />
                                </dd>
                                <dt>Category Id</dt>
                                <dd>
                                    <input type="text" name="CategoryId" value={Editformik.values.CategoryId} onChange={Editformik.handleChange} className="form-control" />
                                </dd>
                               </dl>
                               <button type="submit" className="btn btn-warning w-100">Save</button>
                            </form>

                      </Modal.Body>
                    </Modal>
              </div>
            
           </section>
        </div>
    )
}