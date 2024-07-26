const express = require("express");
const {books} = require("../data/books.json")
const {users} = require("../data/users.json")
const router = express.Router();
/* 
ROUTE : /books
METHOD : GET
DESCRIPTION : to get all books details
ACCESS : public
PARAMETER : none
*/

router.get("/",(req,res)=>{
    res.status(200).send({
  book : books
    }     
  )
  })
/* 
  ROUTE : /books/:id
  METHOD : GET
  DESCRIPTION : to get book details by their id
  ACCESS : public
  PARAMETER : id
  */
  router.get("/:id",(req,res)=>{
    const {id}=req.params;
    const book = books.find((each)=>each.id===id);
    if(!book){
    return res.status(404).send({
        success:false,
        message : "Request Not Found"
      })
    }
    return res.status(200).send({
      success:true,
      books: book
    })
  
  })
  /* ROUTE : /books/
  METHOD : POST
  DESCRIPTION : to create new books
  ACCESS : public
  PARAMETER : none
  */
  
  router.post("/",(req,res)=>{
    const {id,name,author,genre,price,publisher} = req.body;
    const book = books.find((each)=> each.id===id);
    if(book){
       res.status(404).json({
        success : false,
        message : "Book Already Exists"
      })
    }
    books.push({id,name,author,genre,price,publisher})
     res.status(200).json({
      success: true,
      message : books
    })
  })
  /* ROUTE : /books/id
  METHOD : PUT
  DESCRIPTION : to edit the existing books by their id
  ACCESS : public
  PARAMETER : ID
  */
  router.put("/:id",(req,res)=>{
    const {id} = req.params;
    const {data}=req.body;
    const book = books.find((each)=> each.id===id);
  
    if(!book){
      return res.status(404).json({
          success:false,
          message : "Request Not Found"
        })
      }
      const updateBook = books.map((each)=>{
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
        data : updateBook
      })
  })
  
  
  /* 
  ROUTE : /books/id
  METHOD : DELETE
  DESCRIPTION : to delete books by their id 
  ACCESS : public
  PARAMETER : id
  */
  
  router.delete("/:id",(req,res)=>{
    const {id} = req.params;
    const book = books.find((each)=> each.id===id);
  
    if(!book){
      return res.status(404).json({
          success:false,
          message : "Request Not Found"
        })
      }
      const index = books.indexOf(book)
      books.splice(index,1)
      return res.status(200).json({
        success: true,
        data : books
      })
  })
/* 
  ROUTE : /books/issued/userIssued
  METHOD : GET
  DESCRIPTION : to get details of issued books
  ACCESS : public
  PARAMETER : none
  */
  router.get("/issued/userIssued", (req, res) => {
    // Step 1: Find users who have issued books
    const usersWithIssuedBooks = users.filter((user) => user.issuedBook);
  
    // Step 2: Prepare an array to hold issued books information
    const issuedBooks = [];
  
    // Step 3: Loop through each user with issued books
    usersWithIssuedBooks.forEach((user) => {
      // Step 4: Find the corresponding book using its ID
      const book = books.find((book) => book.id === user.issuedBook);
  
      if (book) {
        // Step 5: Assign additional information to the book object
        book.issuedBy = user.name;
        book.issuedDate = user.issuedDate;
        book.returnDate = user.returnDate;
        
        // Step 6: Push the updated book object to the issuedBooks array
        issuedBooks.push(book);
      }
    });
  
    // Step 7: Check if any issued books were found
    if (issuedBooks.length === 0) {
      // Step 8: If no issued books found, return a 404 error response
      return res.status(404).json({
        success: false,
        message: "No issued books found"
      });
    }
  
    // Step 9: If issued books were found, return a success response with data
    return res.status(200).json({
      success: true,
      data: issuedBooks
    });
  });
  
module.exports = router;