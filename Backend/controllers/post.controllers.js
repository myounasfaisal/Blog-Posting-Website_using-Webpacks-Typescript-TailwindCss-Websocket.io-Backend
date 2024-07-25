import { Blog } from "../models/blog.model.js";
import { apiErrors } from "../utils/apiErrors.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

//Start
const postBlog = asyncWrapper(async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title && !content) {
      throw new apiErrors("Please provide title and content", 400);
    }

    const { user } = req;

    if (!user) {
      throw new apiErrors("Not Authenticated User", 400);
    }

    const blogPost = await Blog.create({
      title,
      content,
      tags,
      author_id: user._id,
    });

    if (!blogPost) {
      throw new apiErrors("Failed To Create Blog", 400);
    }

    return res
      .status(200)
      .json(new apiResponse("Blog Created Successfully", 200, blogPost));
  } catch (error) {
    console.error("Error : ", error);
    return res
      .status(error.statusCode || 500)
      .json(new apiErrors(error.message, error.statusCode));
  }

  //end
});

//Start

const editBlog = asyncWrapper(async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      throw new apiErrors("Not Authenticated User", 400);
    }

    const { body } = req.body;

    const editedBlog = await Blog.findOneAndUpdate(
      { _id: _id },
      {
        $set: body,
      },
      {
        new: true,
      }
    );

    if (!editedBlog) {
      throw new apiErrors("Failed To Edit The Blog");
    }

    res
      .status(200)
      .json(new apiResponse("Blog Edited Successfully", 200, editedBlog));
  } catch (error) {
    console.error("Error : ", error);

    res.status(500).json(new apiErrors(error.message, error.statusCode || 500));
  }

  // End
});

export { postBlog, editBlog };
