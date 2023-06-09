const express= require("express");
const  bodyparser= require("body-parser");
const { log } = require("console");
const date= require(__dirname + "/date.js")



const app= express();


let items= ['study',"cook","sleep"];
let workItems= [];
const year=new Date().getFullYear();

app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req,res){

    let day= date.getDay ();

    res.render("list", {listTitle:day, newListItems:items});
});

app.post("/", function(req, res){
    let item= req.body.newItem;

    if(req.body.list==="work"){
        workItems.push(item);
        res.redirect("/work")
    } else{
        items.push(item);
        res.redirect("/");
    } 
})

app.get("/work", function(req,res){
    res.render("list", {listTitle:"work list", newListItems: workItems});
})

app.post("/work", function(req,res){
    let item= req.body.newItem;
    workItems.push(item);
    res.redirect("/work")
})

app.get("/about", function(req,res){
    res.render("about");
})



app.listen(3000, function(){
    console.log("we up and running on port 3000");
})