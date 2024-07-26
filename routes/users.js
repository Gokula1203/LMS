const express = require("express");
const {users} = require("../data/users.json")

const router = express.Router();
/* 
ROUTE : /users
METHOD : GET
DESCRIPTION : to get all user details
ACCESS : public
PARAMETER : none
*/

router.get("/",(req,res)=>{
    res.status(200).send({
  Users : users
    }     
  )
  })
  /* 
  ROUTE : /users/:id
  METHOD : GET
  DESCRIPTION : to get user details by their id
  ACCESS : public
  PARAMETER : id
  */
  router.get("/:id",(req,res)=>{
    const {id}=req.params;
    const user = users.find((each)=>each.id===id);
    if(!user){
    return res.status(404).send({
        success:false,
        message : "Request Not Found"
      })
    }
    return res.status(200).send({
      success:true,
      users: user
    })
  
  })
  /* ROUTE : /users/
  METHOD : POST
  DESCRIPTION : to create new user
  ACCESS : public
  PARAMETER : none
  */
  
  router.post("/",(req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate} = req.body;
    const user = users.find((each)=> each.id===id);
    if(user){
       res.status(404).json({
        success : false,
        message : "User Already Exists"
      })
    }
    users.push({id,name,surname,email,subscriptionType,subscriptionDate})
     res.status(200).json({
      success: true,
      message : users
    })
  })
  /* ROUTE : /users/id
  METHOD : PUT
  DESCRIPTION : to edit the existing user by their id
  ACCESS : public
  PARAMETER : ID
  */
  router.put("/:id",(req,res)=>{
    const {id} = req.params;
    const {data}=req.body;
    const user = users.find((each)=> each.id===id);
  
    if(!user){
      return res.status(404).json({
          success:false,
          message : "Request Not Found"
        })
      }
      const updateUser = users.map((each)=>{
        if(each.id===id){
          return {
            ...each,
            ...data
          }
        }
        return each;
      })
      return res.status(200).json({
        success:true,
        data : updateUser
      })
  })
  
  
  /* 
  ROUTE : /users/id
  METHOD : DELETE
  DESCRIPTION : to delete user by their id 
  ACCESS : public
  PARAMETER : id
  */
  
  router.delete("/:id",(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=> each.id===id);
  
    if(!user){
      return res.status(404).json({
          success:false,
          message : "Request Not Found"
        })
      }
      const index = users.indexOf(user)
      users.splice(index,1)
      return res.status(200).json({
        success: true,
        data : users
      })
  })
  module.exports = router;

