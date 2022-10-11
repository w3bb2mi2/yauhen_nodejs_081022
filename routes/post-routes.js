const express = require("express")
const router = express.Router()

const { getSinglePost, getPosts, getAddPost, addPost, editPost, deletePost, getEditPost, homePage } = require("../controllers/post-controller");


router.get("/", homePage);
router.get("/posts", getPosts);
router.get("/posts/:id", getSinglePost)
router.get("/edit/:id", getEditPost)
router.delete("/posts/:id", deletePost);
router.get("/add-post", getAddPost)
router.post("/add-post", addPost)
router.put("/edit/:id", editPost)

module.exports = router;