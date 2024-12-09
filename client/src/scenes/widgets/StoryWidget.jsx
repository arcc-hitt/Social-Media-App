import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  Pause,
  PlayArrow,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme, useMediaQuery, CardMedia, LinearProgress, linearProgressClasses } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { useDispatch, useSelector } from "react-redux";
import { setStory } from "state";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const StoryWidget = ({
  storyId,
  storyUserId,
  userName,
  name,
  description,
  location,
  picturePath,
  videoPath,
  userPicturePath,
  likes,
  comments,
  createdAt,
  modalOpen,
  userStoryCount,
}) => {
  // const [isComments, setIsComments] = useState(false);
  // const [newComment, setNewComment] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  // const likeCount = Object.keys(likes).length;
  const [videoLoaded, setVideoLoaded] = useState(false);

  const { palette } = useTheme();
  const primary = palette.primary.main;

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const theme = useTheme();
  const isSmallLaptop = useMediaQuery(theme.breakpoints.only('md'));

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

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false); 
  const timerRef = useRef(null);

  useEffect(() => {
    // Start the progress timer when the component mounts
    if (videoPath) {
      const video = document.createElement('video');
      video.src = `http://localhost:3001/assets/${videoPath}`;
      video.addEventListener('loadedmetadata', () => {
        const duration = Math.floor(video.duration);
        let currentTime = 0;
        timerRef.current = setInterval(() => {
          currentTime += 1;
          if (currentTime > duration) {
            clearInterval(timerRef.current);
          } else {
            setProgress((currentTime / duration) * 100);
          }
        }, 300);
      });
      return () => {
        video.removeEventListener('loadedmetadata', () => {});
      };
    } else {
      timerRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prevProgress + 5;
        });
      }, 300); // Update progress every second
      return () => {
        clearInterval(timerRef.current);
      };
    }
  }, [videoPath]);

  // useEffect(() => {
  //   // Set showProgress to true only for the first story
  //   setShowProgress(storyId === sortedStories[0]?._id);
  // }, [sortedStories, storyId]);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteUnmute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div>
      {isNonMobileScreens ? (
        // Desktop Devices
        <Box>
          {modalOpen ? (
            // Display the posted story images and clips
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
                  {/* Check if the story is an image or a video */}
                  {videoPath ? (
                    // Render video
                    <div style={{ position: "relative" }}>
                      <video
                        style={{
                          width: videoLoaded ? 'auto' : '0',
                          height: videoLoaded ? 'auto' : '0',
                          maxWidth: '400px',
                          maxHeight: '600px',
                          display: videoLoaded ? 'block' : 'none',
                        }}
                        disablePictureInPicture
                        autoPlay
                        ref={videoRef}
                        onLoadedData={() => setVideoLoaded(true)}
                      >
                        <source src={`http://localhost:3001/assets/${videoPath}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    // Render image
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
                  )}
                  {/* Username and Image */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      padding: "0.5rem",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "0.5rem",
                      width: "100%",
                      background: "rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Box onClick={() => navigate(`/profile/${storyUserId}`)}>
                      <UserImage
                        image={userPicturePath}
                        size="45px"
                      />
                    </Box>

                    <Typography
                      onClick={() => {
                        navigate(`/profile/${storyUserId}`);
                      }}
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

                    {videoPath && (
                      <Box
                        sx={{
                          flex: 1,
                          width: "100%",
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          style={{ color: "white" }}
                          onClick={handlePlayPause}
                        >
                          {isPlaying ? (
                            <Pause />
                          ) : (
                            <PlayArrow />
                          )}
                        </IconButton>
                        <IconButton
                          style={{ color: "white" }}
                          onClick={handleMuteUnmute}
                        >
                          {isMuted ? (
                            <VolumeOff />
                          ) : (
                            <VolumeUp />
                          )}
                        </IconButton>
                      </Box>
                    )}
                  </Box>

                  <Box
                  sx={{
                    width: '100%',
                    height: '4px',
                    maxHeight: '4px',
                    position: 'absolute',
                    top: 58,
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                  >
                    {/* Display linear progress bars for each story */}
                    {Array.from(Array(userStoryCount).keys()).map((index) => (
                      <LinearProgress
                        key={index}
                        variant="determinate"
                        value={progress}
                        sx={{
                          // Calculate width dynamically based on count
                          width: `${100 / userStoryCount}%`,
                          height: '4px',
                          marginRight: index < userStoryCount - 1 ? '2px' : '0',
                          [`&.${linearProgressClasses.colorPrimary}`]: {
                            backgroundColor: "#cacaca",
                          },
                          [`& .${linearProgressClasses.bar}`]: {
                            borderRadius: 5,
                            backgroundColor: '#fbfbfb',
                          },
                        }}
                      />
                    ))}
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
                padding: 0,
                borderRadius: "0.75rem",
                aspectRatio: '6/9',
                height: isSmallLaptop ? "130px" : "150px",
                "&:hover": {
                  boxShadow: "0 0 5px 5px rgba(0, 255, 255, 0.6)"
                },
              }}
            >
              {/* Story Image */}
              <Box>
                {picturePath && (
                  <img
                    alt="story"
                    style={{
                      aspectRatio: '6/9',
                      height: isSmallLaptop ? "130px" : "150px",
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
                  fontSize="0.9vw"
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