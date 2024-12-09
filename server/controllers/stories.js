import Story from "../models/Story.js";
import User from "../models/User.js";

export const createStory = async (req, res) => {
  try {
    const { userId, description } = req.body;
    const user = await User.findById(userId);

    // Extract file paths from req.files
    const { picture, video } = req.files;
    const picturePath = picture ? picture[0].filename : null;
    const videoPath = video ? video[0].filename : null;

    const newStory = new Story({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      userName: user.userName,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      videoPath,
      likes: {},
      comments: [],
    });
    await newStory.save();

    const stories = await Story.find();
    res.status(201).json(stories);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getStories = async (req, res) => {
  try {
    const story = await Story.find();
    res.status(200).json(story);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserStories = async (req, res) => {
  try {
    const { userId } = req.params;
    const story = await Story.find({ userId });
    res.status(200).json(story);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likeStory = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const story = await Story.findById(id);
    const isLiked = story.likes.get(userId);

    if (isLiked) {
      story.likes.delete(userId);
    } else {
      story.likes.set(userId, true);
    }

    const updatedStory = await Story.findByIdAndUpdate(
      id,
      { likes: story.likes },
      { new: true }
    );

    res.status(200).json(updatedStory);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* CREATE COMMENT */
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, commentText } = req.body;

    const story = await Story.findById(id);
    const user = await User.findById(userId);

    const newComment = {
      userId,
      userName: `${user.userName}`,
      commentText,
    };

    story.comments.push(newComment);
    const updatedStory = await story.save();

    res.status(200).json(updatedStory);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
