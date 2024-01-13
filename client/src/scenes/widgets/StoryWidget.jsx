import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme, useMediaQuery, } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { useDispatch, useSelector } from "react-redux";
import { setStory } from "state";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const StoryWidget = ({
  storyId,
  storyUserId,
  userName,
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
  // const [isComments, setIsComments] = useState(false);
  // const [newComment, setNewComment] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  // const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const primary = palette.primary.main;

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

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

  // const handleAddComment = async () => {
  //   const response = await fetch(
  //     `http://localhost:3001/stories/${storyId}/comments`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ userId: loggedInUserId, commentText: newComment }),
  //     }
  //   );
  //   const updatedStory = await response.json();
  //   dispatch(setStory({ story: updatedStory }));
  //   setNewComment(""); // Clear the comment input after adding
  // };

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
      {isNonMobileScreens ? (
        // Desktop Devices
        <Box>
          {modalOpen ? (
            // Display the posted story images
            <Box>
              <FlexBetween
                sx={{
                  flexDirection: 'column',
                  borderRadius: '0.75rem',
                  background: `linear-gradient(to bottom right, ${palette.neutral.light}, ${palette.neutral.dark})`,
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '400px',
                    height: '600px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Story Image */}
                  <img
                    style={{
                      width: 'auto',
                      height: 'auto',
                      maxWidth: '400px',
                      maxHeight: '600px',
                    }}
                    alt="story"
                    src={`http://localhost:3001/assets/${picturePath}`}
                    onLoad={(e) => {
                      const { naturalWidth, naturalHeight } = e.target;
                      const isLandscape = naturalWidth > naturalHeight;

                      if (isLandscape) {
                        e.target.style.width = '400px';
                        e.target.style.height = 'auto';
                      } else {
                        e.target.style.width = 'auto';
                        e.target.style.height = '600px';
                        e.target.style.borderRadius = '0.75rem';
                      }
                    }}
                  />

                  {/* Username and Image */}
                  <Box
                    onClick={() => {
                      navigate(`/profile/${storyUserId}`);
                      navigate(0);
                    }}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      margin: "0.5rem",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <UserImage
                      image={userPicturePath}
                      size="45px"
                    />
                    <Typography
                      color={palette.neutral.dark}
                      variant="h5"
                      fontWeight="500"
                      sx={{
                        "&:hover": {
                          color: palette.primary.main,
                        },
                      }}
                    >
                      {userName}
                    </Typography>
                  </Box>

                  {/* Display Caption for the story */}
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

                  {/* Display the Like Button */}
                  <Box sx={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    right: '0rem',
                  }}>
                    <IconButton onClick={patchLike} >
                      {isLiked ? (
                        <FavoriteOutlined sx={{ color: primary, fontSize: "22px" }} />
                      ) : (
                        <FavoriteBorderOutlined sx={{ fontSize: "22px" }} />
                      )}
                    </IconButton>
                    {/* <Typography>{likeCount}</Typography> */}
                  </Box>
                </Box>
              </FlexBetween>
            </Box>
          ) : (
            // Display the story cards
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                cursor: "pointer",
                padding: "0px",
                borderRadius: "0.75rem",                
                width: "145px",
                height: "220px",
                "&:hover": {
                  boxShadow: `0 0 1px 1px rgba(255, 0, 0, 0.5),
                              0 0 2px 2px rgba(255, 165, 0, 0.5),
                              0 0 3px 3px rgba(255, 255, 0, 0.5),
                              0 0 4px 4px rgba(0, 128, 0, 0.5),
                              0 0 5px 5px rgba(0, 0, 255, 0.5),
                              0 0 6px 6px rgba(75, 0, 130, 0.5),
                              0 0 7px 7px rgba(189,33,255, 0.5)`
                },
              }}
            >
              {/* Story Image */}
              <Box>
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

              {/* Username and Image */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  marginBottom: "0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.2rem",
                }}
              >
                <UserImage
                  image={userPicturePath}
                  size="55px"
                />
                <Typography
                  color="white"
                  variant="h6"
                  fontWeight="500"
                >
                  {userName}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        // Mobile Devices
        <Box>
          {modalOpen ? (
            // Display the posted story images
            <Box>
              <FlexBetween
                sx={{
                  flexDirection: 'column',
                  borderRadius: '0.75rem',
                  background: `linear-gradient(to bottom right, ${palette.neutral.light}, ${palette.neutral.dark})`,
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Story Image */}
                  <img
                    style={{
                      width: 'auto',
                      height: 'auto',
                      maxWidth: '100vw',
                      maxHeight: '100vh',
                    }}
                    alt="story"
                    src={`http://localhost:3001/assets/${picturePath}`}
                    onLoad={(e) => {
                      const { naturalWidth, naturalHeight } = e.target;
                      const isLandscape = naturalWidth > naturalHeight;

                      if (isLandscape) {
                        e.target.style.width = '100vw';
                        e.target.style.height = 'auto';
                      } else {
                        e.target.style.width = 'auto';
                        e.target.style.height = '100vh';
                      }
                    }}
                  />

                  {/* Username and Image */}
                  <Box
                    onClick={() => {
                      navigate(`/profile/${storyUserId}`);
                      navigate(0);
                    }}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      margin: "0.5rem",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <UserImage
                      image={userPicturePath}
                      size="45px"
                    />
                    <Typography
                      color={palette.neutral.dark}
                      variant="h5"
                      fontWeight="500"
                      sx={{
                        "&:hover": {
                          color: palette.primary.main,
                        },
                      }}
                    >
                      {userName}
                    </Typography>
                  </Box>

                  {/* Display Caption for the story */}
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
                        maxWidth: '100vw',
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

                  {/* Display the Like Button */}
                  <Box sx={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    right: '0rem',
                  }}>
                    <IconButton onClick={patchLike} >
                      {isLiked ? (
                        <FavoriteOutlined sx={{ color: primary, fontSize: "22px" }} />
                      ) : (
                        <FavoriteBorderOutlined sx={{ fontSize: "22px" }} />
                      )}
                    </IconButton>
                    {/* <Typography>{likeCount}</Typography> */}
                  </Box>
                </Box>
              </FlexBetween>
            </Box>
          ) : (
            // Display the story cards
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {/* User Image */}
              <Box
                sx={{
                }}
              >
                <UserImage
                  image={userPicturePath}
                  size="55px"
                />
              </Box>
            </Box>
          )}
        </Box>
      )}
    </div>
  );
};

export default StoryWidget;