import {
  ChatBubbleOutlineOutlined,
  ChatBubbleOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, TextField, Button, useTheme, InputBase } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import moment from "moment";

const PostWidget = ({
  postId,
  postUserId,
  name,
  userName,
  description,
  location,
  picturePath,
  videoPath,
  documentPath,
  audioPath,
  userPicturePath,
  likes,
  comments,
  createdAt,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const medium = palette.neutral.medium;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleAddComment = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId, commentText: newComment }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setNewComment(""); // Clear the comment input after adding
  };

  const createdAtMoment = moment(createdAt);
  const currentMoment = moment();

  let formattedTime;

  const minutesAgo = currentMoment.diff(createdAtMoment, 'minutes');
  const hoursAgo = currentMoment.diff(createdAtMoment, 'hours');
  const secondsAgo = currentMoment.diff(createdAtMoment, 'seconds');

  if (hoursAgo > 24) {
    formattedTime = createdAtMoment.format("MMMM D, YYYY [at] h:mm A");
  } else if (hoursAgo >= 1) {
    formattedTime = `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutesAgo >= 1) {
    formattedTime = `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    formattedTime = `${secondsAgo} ${secondsAgo === 1 ? 'second' : 'seconds'} ago`;
  }

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        userName={userName}
        subtitle={location}
        userPicturePath={userPicturePath}
      />

      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: `1px solid ${palette.neutral.light}`,
          borderRadius: "0.75rem",
          marginTop: "0.75rem",
        }}
      >
        {picturePath && (
          <img
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
              borderRadius: "0.75rem",
            }}
            alt="post"
            src={`http://localhost:3001/assets/${picturePath}`}
            onLoad={(e) => {
              const { naturalWidth, naturalHeight } = e.target;
              const isLandscape = naturalWidth > naturalHeight;

              if (isLandscape) {
                e.target.style.width = '100%';
                e.target.style.height = 'auto';
              } else {
                e.target.style.width = '62%';
                e.target.style.height = 'auto';
              }
            }}
          />
        )}
        
        {/* Display video if videoPath exists */}
        {videoPath && (
          <video controls style={{ width: '100%', height: 'auto' }}>
            <source src={`http://localhost:3001/assets/${videoPath}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Display audio if audioPath exists */}
        {audioPath && (
          <audio controls style={{ width: '100%' }}>
            <source src={`http://localhost:3001/assets/${audioPath}`} type="audio/mp3" />
            Your browser does not support the audio tag.
          </audio>
        )}
        
        {/* Display document if documentPath exists */}
        {documentPath && (
          <iframe
          src={`http://localhost:3001/assets/${documentPath}`}
          title="Document Viewer"
          style={{ width: '100%', height: '500px', border: 'none' }}
        />
        )}
        </Box>
      <Typography
        color={medium}
        fontSize="0.75rem"
        display="flex"
        alignItems="end"
        justifyContent="flex-end"
        mt="0.25rem"
      >
        {formattedTime}
      </Typography>

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          {/* like button and count */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          {/* comment button and count */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              {isComments ? (
                <ChatBubbleOutlined sx={{ color: primary }} />
              ) : (
                <ChatBubbleOutlineOutlined />
              )}
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        {/* share button - functionality to be added */}
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      {isComments && (
        <Box>
          <Box mt="0.5rem">
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography
                  sx={{ color: main, m: "0.5rem 0 0.1rem 0", pl: "1rem", fontSize: "10px" }}
                >
                  {comment.userName}
                </Typography>
                <Typography
                  sx={{ color: main, m: "0 0 0.5rem 0", pl: "1rem" }}
                >
                  {comment.commentText}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
          <FlexBetween mt="0.5rem" gap="1rem">
            <InputBase
              placeholder="Add a Comment"
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
              sx={{
                // backgroundColor: palette.neutral.light,
                border: `1px solid ${palette.neutral.light}`,
                borderRadius: "1rem",
                padding: "0.6rem",
                width: "100%",
              }}
              endAdornment={(
                <Button
                  onClick={handleAddComment}
                  sx={{
                    color: palette.neutral.dark,
                    borderRadius: "1rem",
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: palette.neutral.light
                    }
                  }}
                >
                  POST
                </Button>
              )}
            />
          </FlexBetween>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
