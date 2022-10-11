const express = require("express")
const router = express.Router()

const methodOverride = require("method-override");
const { getSinglePost, getPosts, getAddPost, addPost, editPost, deletePost, getEditPost } = require("../controllers/post-controller");

router.use(methodOverride("_method"))

router.get("/", (req, res) => {
    res.render(createPath("index"))
});

router.get("/posts", getPosts);

router.get("/posts/:id", getSinglePost)
router.get("/edit/:id", getEditPost)
router.delete("/posts/:id", deletePost);
router.get("/add-post", getAddPost)
router.post("/add-post", addPost)
router.put("/edit/:id", editPost)

module.exports = router;