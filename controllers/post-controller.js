const Post = require("../models/post")
const createPath = require("../helpers/create-path");
const handleError = (res, error) => {
    console.log(error);
    res.render(createPath("error"))
}

const getSinglePost = (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => res.render(createPath("post"), { post }))
        .catch((error) => handleError(res, error))
}

const getPosts = (req, res) => {
    Post
        .find()
        .sort({ createdAt: -1 })
        .then(posts => res.render(createPath("posts"), { posts }))
        .catch((error) => handleError(res, error))
}

const getAddPost = (req, res) => {
    res.render(createPath("add-post"))
}

const addPost = (req, res) => {
    const { title, author, text } = req.body;
    const post = new Post({ title, author, text })
    post
        .save()
        .then(() => res.redirect("/posts"))
        .catch((error) => handleError(res, error))
}
const editPost = (req, res) => {
    const { title, author, text } = req.body;
    const { id } = req.params;
    Post
        .findByIdAndUpdate(`${id}`, { title, author, text })
        .then(() => res.redirect(`/posts/${id}`))
        .catch((error) => handleError(res, error))

}
const deletePost = (req, res) => {
    Post
        .findByIdAndDelete(req.params.id)
        .then(result => res.status(200))
        .catch((error) => handleError(res, error))
}
const getEditPost = (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => res.render(createPath("edit-post"), { post }))
        .catch((error) => handleError(res, error))
}

module.exports = {
    getSinglePost, getPosts, getAddPost, addPost, editPost, deletePost, getEditPost
}