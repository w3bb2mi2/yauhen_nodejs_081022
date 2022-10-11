const express = require("express")
const router = express.Router()

const { getSinglePost, getPosts,  addPost, editPost, deletePost  } = require("../controllers/api-post-controller");

router.get("/api/posts", getPosts)
router.post("/api/post", addPost)
router.get("/api/post/:id", getSinglePost)
router.delete("api/post/:id", deletePost);
router.put("api/edit/:id", editPost)


module.exports = router;