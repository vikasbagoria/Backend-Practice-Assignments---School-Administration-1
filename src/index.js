const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
var Student = require('./InitialData');
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

app.get("/api/student",(req,res)=>{
    res.send(Student)
})
app.get("/api/student/:id",(req,res)=>{
    var id = req.params.id;  
    var stud = Student.filter((stud)=>{
        return stud.id == id;
    })
    if(!stud[0])
    {
        res.send(404);
    }else{
        res.send(stud);
    }
})
app.post("/api/student",(req,res)=>{
    var obj = req.body;
    if(!obj.name && !obj.currentClass && !obj.division)
    {
        res.send(400);
    }else
    {
        obj.id = Student[Student.length-1].id+1;  
        Student.push(obj);
        res.send({id:obj.id});
    }
    // console.log(req.body)
})

app.put("/api/student/:id",(req,res)=>{
    var id = req.params.id;
    var obj = req.body;
    var stud = Student.filter((stud)=>{
        return stud.id==id;
    })
    if(!stud[0])
    {
        res.send(400);
    }else
    {
        if(obj.name == stud.name && obj.currentClass == stud.currentClass && obj.division == stud.division)
        {
            res.send(400)
        }else
        {

            
            if(obj.name!=stud.name && obj.currentClass == stud.currentClass && obj.division == stud.division)
            {
                res.send({name:obj.name});  
                
                Student.forEach((res)=>{
                    if(res.id==id)
                    {
                        res.currentClass = stud[0].currentClass;
                        res.division = stud[0].division;
                        res.name = obj.name;
                    }
                })
                // Student.push(obj);
            }else if(obj.currentClass != stud.currentClass && obj.name == stud.name && obj.division == stud.division)
            {
                res.send({currentClass:obj.currentClass});
                
                Student.forEach((res)=>{
                    if(res.id==id)
                    {
                        res.name = stud[0].name;
                        res.division = stud[0].division;
                        res.currentClass = obj.currentClass;
                    }
                })
                // Student.push(obj);
            }else if(obj.currentClass == stud.currentClass && obj.name == stud.name && obj.division != stud.division){
                res.send({division:obj.division});
                
                Student.forEach((res)=>{
                    if(res.id==id)
                    {
                        res.name = stud[0].name;
                        res.division = obj.division;
                        res.currentClass = stud[0].currentClass;
                    }
                })
                // Student.push(obj);
            }
            else{
                Student.forEach((res)=>{
                    if(res.id==id)
                    {
                        res.name = obj.name;
                        res.division = obj.division;
                        res.currentClass = obj.currentClass;
                    }
                })
                // Student.push(obj);
            }
        }
    }
})


app.delete("/api/student/:id",(req,res)=>{
    var id = req.params.id;
    // console.log(req.params.id);
    // console.log(Student.findIndex(id));
    var stud = Student.filter((stud)=>{
        return stud.id==id;
    })
    if(!stud[0])
    {
        res.send(404);
    }
    else
    {
        Student = Student.filter((stud)=>{
            return stud.id != id; 
        })
        // console.log(Student);
        
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   