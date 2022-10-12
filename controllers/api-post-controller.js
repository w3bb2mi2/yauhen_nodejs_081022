const Post = require("../models/post")

const handleError = (res, error) => {
    console.log(error);
    res.status(500).send(error)
}
const homePage = (req, res) => {
    
  }

const getSinglePost = (req, res) => {
    Post
        .findById(req.params.id)
        .then(post=>res.status(200).json(post))
        .catch((error) => handleError(res, error))
}

const getPosts = (req, res) => {
    console.log(req)
    Post
        .find()
        .sort({ createdAt: -1 })
        .then(posts=>res.status(200).json(posts))
        .catch((error) => handleError(res, error))
}

const addPost = (req, res) => {
    console.log("route addPost")
    const { title, author, text } = req.body;
    const post = new Post({ title, author, text })
    post
        .save()
        .then(post=>res.status(200).json(post))
        .catch((error) => handleError(res, error))
}
const editPost = (req, res) => {
    console.log({req})
    const { title, author, text } = req.body;
    const { id } = req.params;
    Post
        .findByIdAndUpdate(`${id}`, { title, author, text }, {new: true})
        .then(post=>res.status(200).json(post))
        .catch((error) => handleError(res, error))

}
const deletePost = (req, res) => {
    console.log("deleted post")
    Post
        .findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json(req.params.id))
        .catch((error) => handleError(res, error))
}


module.exports = {
    getSinglePost, getPosts,  addPost, editPost, deletePost,  homePage
}