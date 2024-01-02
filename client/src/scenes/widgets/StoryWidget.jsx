import {
  ChatBubbleOutlineOutlined,
  ChatBubbleOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  Close,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, TextField, Button, Modal, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStory } from "state";
import moment from "moment";

const StoryWidget = ({
  storyId,
  storyUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  createdAt,
  modalOpen,
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
    const response = await fetch(`http://localhost:3001/stories/${storyId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedStory = await response.json();
    dispatch(setStory({ story: updatedStory }));
  };

  const handleAddComment = async () => {
    const response = await fetch(
      `http://localhost:3001/stories/${storyId}/comments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId, commentText: newComment }),
      }
    );
    const updatedStory = await response.json();
    dispatch(setStory({ story: updatedStory }));
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
    <div>
    {modalOpen ? (
      <Box>
      <FlexBetween sx={{ flexDirection: 'column' }}>
          <Box style={{ position: 'relative' }}>
            <img
              style={{
                width: '400px',
                height: '600px',
                borderRadius: '0.75rem',
              }}
              alt="story"
              src={`http://localhost:3001/assets/${picturePath}`}
            />

            {description && (
              <Typography
                variant="subtitle"
                component="Box"
                sx={{
                  position: 'absolute',
                  bottom: '4rem',
                  left: '0rem',
                  right: '0rem',
                  color: palette.neutral.dark,
                  maxWidth: '400px',
                  overflow: 'hidden',
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                  textOverflow: 'ellipsis',
                  backgroundColor: `${palette.neutral.light}AA`,
                  padding: '0.2rem',
                  textAlign: 'center',
                }}
              >
                {description}
              </Typography>
            )}
        </Box>

        <Box sx={{ display: 'flex', width: '100%', marginTop: '0.5rem', alignItems: 'center', justifyContent: 'flex-end' }}>
          <IconButton onClick={patchLike}>
            {isLiked ? (
              <FavoriteOutlined sx={{ color: primary }} />
            ) : (
              <FavoriteBorderOutlined />
            )}
          </IconButton>
          {/* <Typography>{likeCount}</Typography> */}
        </Box>
      </FlexBetween>
      </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            cursor: "pointer",
            padding: "0px",
            borderRadius: "0.75rem",
            "&:hover": {
              boxShadow: "0 0 20px 5px rgba(0, 255, 255, 0.8)",
            },
          }}
        >
          {/* Story Image */}
          <Box
            sx={{
              
            }}
          >
            {picturePath && (
              <img
                width="145px"
                height="220px"
                alt="story"
                style={{
                  borderRadius: "0.75rem",
                  filter: "blur(2px)", 
                }}
                src={`http://localhost:3001/assets/${picturePath}`}
              />
            )}
          </Box>
          
          {/* User Image */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              marginBottom: "0.75rem",
            }}
          >
            <UserImage
              image={userPicturePath}
              size="55px"
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default StoryWidget;
      
      {/* <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="image-modal"
        aria-describedby="image-modal-description"
      >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50rem',
          height: '100vh',
          bgcolor: 'background.paper',
          border: 'none',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <FlexBetween sx={{ flexDirection: 'column', alignItems: 'center' }}>
              <Box style={{ position: 'relative' }}>
                <img
                  style={{
                    width: '400px',
                    height: '600px',
                    borderRadius: '0.75rem',
                  }}
                  alt="story"
                  src={`http://localhost:3001/assets/${picturePath}`}
                />

                {description && (
                  <Typography
                    variant="subtitle"
                    component="Box"
                    sx={{
                      position: 'absolute',
                      bottom: '4rem',
                      left: '0rem',
                      right: '0rem',
                      color: palette.neutral.dark,
                      maxWidth: '400px',
                      overflow: 'hidden',
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                      textOverflow: 'ellipsis',
                      backgroundColor: `${palette.neutral.light}AA`,
                      padding: '0.2rem',
                      textAlign: 'center',
                    }}
                  >
                    {description}
                  </Typography>
                )}
            </Box>

            <Box sx={{ display: 'flex', width: '100%', marginTop: '0.5rem', alignItems: 'center', justifyContent: 'flex-end' }}>
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </Box>
          </FlexBetween>
          
          Close Button
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <Close />
          </IconButton>
        </Box>
      </Box>
    </Modal> */}

// <WidgetWrapper m="2rem 0">
    //   <Friend
    //     friendId={storyUserId}
    //     name={name}
    //     subtitle={location}
    //     userPicturePath={userPicturePath}
    //   />

    //   <Typography color={main} sx={{ mt: "1rem" }}>
    //     {description}
    //   </Typography>
      
    //   {picturePath && (
    //     <img
    //       width="100%"
    //       height="auto"
    //       alt="story"
    //       style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
    //       src={`http://localhost:3001/assets/${picturePath}`}
    //     />
    //   )}
      
    //   <Typography
    //     color={medium}
    //     fontSize="0.75rem"
    //     display="flex"
    //     alignItems="end"
    //     justifyContent="flex-end"
    //     mt="0.25rem"
    //   >
    //     {formattedTime}
    //   </Typography>

    //   <FlexBetween mt="0.25rem">
    //     <FlexBetween gap="1rem">
    //       {/* like button and count */}
    //       <FlexBetween gap="0.3rem">
    //         <IconButton onClick={patchLike}>
    //           {isLiked ? (
    //             <FavoriteOutlined sx={{ color: primary }} />
    //           ) : (
    //             <FavoriteBorderOutlined />
    //           )}
    //         </IconButton>
    //         <Typography>{likeCount}</Typography>
    //       </FlexBetween>
          
    //       {/* comment button and count */}
    //       <FlexBetween gap="0.3rem">
    //         <IconButton onClick={() => setIsComments(!isComments)}>
    //         {isComments ? (
    //             <ChatBubbleOutlined sx={{ color: primary }} />
    //           ) : (
    //             <ChatBubbleOutlineOutlined />
    //           )}              
    //         </IconButton>
    //         <Typography>{comments.length}</Typography>
    //       </FlexBetween>
    //     </FlexBetween>

    //     {/* share button - functionality to be added */}
    //     <IconButton>
    //       <ShareOutlined />
    //     </IconButton>
    //   </FlexBetween>

    //   {isComments && (
    //     <Box>
    //       <Box mt="0.5rem">
    //         {comments.map((comment, i) => (
    //           <Box key={`${name}-${i}`}>
    //             <Divider />
    //             <Typography
    //               sx={{ color: main, m: "0.5rem 0 0.1rem 0", pl: "1rem", fontSize: "10px" }}
    //             >
    //               {comment.userName}
    //             </Typography>
    //             <Typography
    //               sx={{ color: main, m: "0 0 0.5rem 0", pl: "1rem" }}
    //             >
    //               {comment.commentText}
    //             </Typography>
    //           </Box>
    //         ))}
    //         <Divider />
    //       </Box>
    //       <FlexBetween mt="0.5rem" gap="1rem">
    //           <TextField
    //             label="Add a Comment"
    //             variant="standard"
    //             fullWidth
    //             // onBlur={handleBlur}
    //             onChange={(e) => setNewComment(e.target.value)}
    //             value={newComment}
    //             name="addcomment"
    //             // error={
    //             //   Boolean(touched.firstName) && Boolean(errors.firstName)
    //             // }
    //             // helperText={touched.firstName && errors.firstName}
    //             // sx={{
    //             //   gridColumn: "span 2",
    //             //   ...textFieldStyles,
    //             // }}
    //             // InputProps={{
    //             //   style: { color: colorTokens.login.txt },
    //             // }}
    //           />

    //           <Button
    //             onClick={handleAddComment}
    //             sx={{
    //               color: palette.background.alt,
    //               backgroundColor: palette.primary.main,
    //             }}
    //           >
    //             POST
    //           </Button>
    //       </FlexBetween>
    //     </Box>
    //   )}
    // </WidgetWrapper>