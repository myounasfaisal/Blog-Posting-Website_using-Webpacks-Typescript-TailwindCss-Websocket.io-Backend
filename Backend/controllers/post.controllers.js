import { Like } from "../models/like.model.js";
import { Comment } from "../models/comment.model.js";
import { Blog } from "../models/blog.model.js";
import { apiErrors } from "../utils/apiErrors.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

//Start
const postBlog = asyncWrapper(async (req, res) => {
  try {
    const { blog } = req.body;

    if (!blog) {
      throw new apiErrors("blog Can't br Empty", 400);
    }

    const { user } = req;

    if (!user) {
      throw new apiErrors("Not Authenticated User", 400);
    }

    const blogPost = await Blog.create({
      blog,
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

//start
const getAllBlogs = asyncWrapper(async (req, res) => {
  try {
    // Fetch all blogs with author details
    const blogs = await Blog.find().populate(
      "author_id",
      "avatar username name email"
    );

    if (!blogs || blogs.length === 0) {
      throw new apiErrors("No blogs found", 404);
    }

    // Adding likes and comments count to each blog
    const blogsWithStats = await Promise.all(
      blogs.map(async (blog) => {
        // Count the number of likes with status true
        const likesCount = await Like.countDocuments({
          likedBlog: blog._id,
          status: true,
        });

        // Count the number of comments for the blog
        const commentsCount = await Comment.countDocuments({
          blog_id: blog._id,
        });

        return {
          ...blog._doc, // Spread the original blog document
          likesCount,
          commentsCount,
        };
      })
    );

    res
      .status(200)
      .json(
        new apiResponse(
          "Blogs fetched successfully with like and comment counts",
          200,
          blogsWithStats
        )
      );
  } catch (error) {
    console.error("Error : ", error);
    res.status(500).json(new apiErrors(error.message, error.statusCode || 500));
  }
});
//end

//start
const getSingleBlog = asyncWrapper(async (req, res) => {
  try {
    const { _id } = req.params;

    if (!_id) {
      throw new apiErrors("Id required", 404);
    }

    const blogDetails = await Blog.findById(_id).populate(
      "author_id",
      "avatar username name email"
    );

    if (!blogDetails) {
      throw new apiErrors("Blog Not Found", 404);
    }

    res.status(200).json(new apiResponse("Blog Found", 200, blogDetails));
  } catch (error) {
    console.error("Error : ", error);
  }
});

export { postBlog, editBlog, getSingleBlog, getAllBlogs };
