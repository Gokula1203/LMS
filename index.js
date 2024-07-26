
const express = require("express");
const port = 8081;
const lms = express();
const {users} = require("./data/users.json");

// routes folder for users
const userRoutes = require("./routes/users");
const booksRoutes = require("./routes/books");
lms.use(express.json());

lms.all("/",(req,res)=>{
  res.status(200).send(
  "server is running"
  )
})
lms.use("/users",userRoutes);
lms.use("/books",booksRoutes)

lms.all("*",(req,res)=>{
    res.status(500).send(
    "Incorrect Path"
    )
})

.listen(port,()=>{

})