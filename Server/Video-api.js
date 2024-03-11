var express = require("express");
var cors = require("cors");
const { click } = require("@testing-library/user-event/dist/click");
var mongoClient = require("mongodb").MongoClient;

var app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

var ConStr = "mongodb://127.0.0.1:27017";

app.get("/getadmin",(request, response)=>{
    mongoClient.connect(ConStr)
    .then(clientObject=>{
        var database = clientObject.db("videolibrary");
        database.collection("tbladmin").find({}).toArray()
        .then(documents=>{
            response.send(documents);
            response.end();
        })
    })
})

app.get("/getuser", (request, response)=>{
    mongoClient.connect(ConStr)
    .then(clientObject=>{
        var database = clientObject.db("videolibrary");
        database.collection("tblusers").find({}).toArray()
        .then(documents=>{
            response.send(documents);
            response.end();
        })
    })
})

app.post("/register-user", (request, response)=>{
    var user = {
        "UserId": request.body.UserId,
        "UserName" : request.body.UserName,
        "Password": request.body.Password,
        "Email": request.body.Email,
        "Mobile": request.body.Mobile
    }
    mongoClient.connect(ConStr)
    .then(clientObject=>{
        var database = clientObject.db("videolibrary");
        database.collection("tblusers").insertOne(user).then(()=>{
            console.log("Register Successfully");
            response.end();
        });
    });
});

app.get("/getcategories", (request, response)=>{
    mongoClient.connect(ConStr)
    .then(clientObject=>{
        var database = clientObject.db("videolibrary");
        database.collection("tblcategories").find({}).toArray()
        .then(documents=>{
            response.send(documents);
            response.end();
        });
    });
});

app.post("/addcategory",(request, response)=>{
    var category = {
        "CategoryId": parseInt(request.body.CategoryId),
        "CategoryName": request.body.CategoryName
    }
    mongoClient.connect(ConStr)
    .then(clientObject=>{
        var database = clientObject.db("videolibrary");
        database.collection("tblcategories").insertOne(category)
        .then(()=>{
            console.log("Category Added");
            response.end();
        });
    });
});

app.get("/getvideos", (request, response)=>{
    mongoClient.connect(ConStr)
    .then(clientObject=>{
        var database = clientObject.db("videolibrary");
        database.collection("tblvideos").find({}).toArray()
        .then(documents=>{
            response.send(documents);
            response.end();
        })
    })
})
app.get("/getvideo/:id", (request, response)=>{
    var id = parseInt(request.params.id)
    mongoClient.connect(ConStr)
    .then(clientObject=>{
        var database = clientObject.db("videolibrary");
        database.collection("tblvideos").find({VideoId:id}).toArray()
        .then(documents=>{
            response.send(documents);
            response.end();
        });
    });
});

app.post("/addvideo", (request, response)=>{
    var video = {
        "VideoId":parseInt(request.body.VideoId),
        "Title": request.body.Title,
        "Url" : request.body.Url,
        "Description": request.body.Description,
        "Likes": parseInt(request.body.Likes),
        "Dislikes": parseInt(request.body.Dislikes),
        "Views": parseInt(request.body.Views),
        "Comments": [request.body.Comments],
        "CategoryId":parseInt(request.body.CategoryId)
    }
    mongoClient.connect(ConStr)
    .then(clientObject=>{
        var database = clientObject.db("videolibrary");
        database.collection("tblvideos").insertOne(video)
        .then(()=>{
            console.log("Video Added");
            response.end();
        });
    });
});

app.put("/updatevideo/:id", (request, response)=>{
    var id = parseInt(request.params.id);
     mongoClient.connect(ConStr)
     .then(clientObject=>{
        var database = clientObject.db("videolibrary");
        database.collection("tblvideos").updateOne({VideoId:id},{$set: 
         {VideoId:parseInt(request.body.VideoId),
         Title: request.body.Title,
         Url: request.body.Url,
         Likes: parseInt(request.body.Likes),
         Dislikes: parseInt(request.body.Dislikes),
         Description: request.body.Description,
         Views: parseInt(request.body.Views),
         Comments: [request.body.Comments],
         CategoryId: parseInt(request.body.CategoryId)
        }
        })
        .then(()=>{
            console.log("Video Updated");
            response.end();
        });
     });
});

app.delete("/deletevideo/:id", (request, response)=>{
    var id = parseInt(request.params.id);

    mongoClient.connect(ConStr)
    .then(clientObject=>{
        var database = clientObject.db("videolibrary");
        database.collection("tblvideos").deleteOne({VideoId:id})
        .then(()=>{
            console.log("video Deleted");
            response.end();
        })
    })
})

app.listen(2200);
console.log("Server started http://127.0.0.1:2200");