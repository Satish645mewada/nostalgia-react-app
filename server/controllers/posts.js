import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();
    console.log(postMessage);
    res.status(200).json(postMessage);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.meesage });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );

  res.json(updatedPost);
};


export const deletePost = async (req, res) => {
  const { id } = req.params;
  

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await PostMessage.findByIdAndUpdate(
    id);
   

  res.json({ message: 'post deleted succesfully'});
};

 
export const likePost = async (req, res) => {
  const { id } = req.params;

  const post =await PostMessage.findById(id);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  
  const updatedPost = await PostMessage.findByIdAndUpdate(id,
    { likeCount:post.likeCount+1},
    { new: true }
  );

  res.json(updatedPost);
};
