import {
  DeleteOutlined,
  Close,
  Add,
  ImageOutlined,
  VideoLibraryOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  Modal,
  Badge,
  useMediaQuery,
  Tooltip,
  tooltipClasses,
  ButtonBase,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStories } from "state";
import styled from "@emotion/styled";

const MyStoryWidget = ({ userName, picturePath, videoPath, userPicturePath, currentUserStory, onImageClick }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [file, setFile] = useState(null);
  const [story, setStory] = useState("");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const isSmallLaptop = useMediaQuery(theme.breakpoints.only('md'));

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
      marginBottom: '5px',
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleStory = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", story);

      if (isImage) {
        formData.append("picture", file);
        formData.append("picturePath", file.name);
      }
      if (isVideo) {
        formData.append("video", file);
        formData.append("videoPath", file.name);
      }

      const response = await fetch(`http://localhost:3001/stories`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const stories = await response.json();
      dispatch(setStories({ stories }));
      setFile(null);
      setStory("");
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to upload story. Please try again.");
    }
  };

  const handleUpload = (acceptedFiles, type) => {
    const allowedTypes = {
      image: [".jpg", ".jpeg", ".png"],
      video: [".mp4", ".mov", ".avi"],
    };

    const fileType = type === 'image' ? 'image' : 'video';

    const fileExtension = acceptedFiles[0].name.split('.').pop().toLowerCase();

    if (allowedTypes[fileType].includes(`.${fileExtension}`)) {
      setFile(acceptedFiles[0]);
      setIsImage(type === 'image');
      setIsVideo(type === 'video');
      setError(null);
    } else {
      setError("Invalid file type. Please upload a valid file.");
      console.error("Invalid file type. Please upload a valid file");
    }
  };

  const acceptedFilesByType = {
    image: ".jpg,.jpeg,.png",
    video: ".mp4,.mov,.avi",
  };

  const uploadOptions = [
    {
      onClick: () => { setIsImage(!isImage); setIsVideo(false) },
      icon: <ImageOutlined />,
      text: 'Image',
    },
    {
      onClick: () => { setIsVideo(!isVideo); setIsImage(false) },
      icon: <VideoLibraryOutlined />,
      text: 'Video',
    },
  ];

  return (
    <>
      {isNonMobileScreens ? (
        //Desktop devices
        <Box>
          {currentUserStory ? (
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
                aspectRatio: '6/9',
                height: isSmallLaptop ? "130px" : "150px",
                "&:hover": {
                  boxShadow: "0 0 5px 5px rgba(0, 255, 255, 0.6)",
                },
              }}
            >
              {/* Story Image */}
              <CustomTooltip title="Your story" placement="top">
                <Box
                  onClick={onImageClick}
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
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
              </CustomTooltip>

              {/* User Image */}
              <CustomTooltip title="Add another story" placement="top">
                <Box
                  onClick={handleOpen}
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
                  <Badge
                    variant="standard"
                    size="large"
                    badgeContent={<Add sx={{ fontSize: '1rem' }} />}
                    sx={{
                      '& .MuiBadge-standard': {
                        backgroundColor: palette.primary.main,
                        top: 10,
                        width: '20px',
                        height: '20px',
                        borderRadius: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    }}
                  >
                    <UserImage
                      image={userPicturePath}
                      size="55px"
                    />
                  </Badge>

                  <Typography
                    color="white"
                    variant="h6"
                    fontWeight="500"
                    fontSize="0.9vw"
                  >
                    {userName}
                  </Typography>
                </Box>
              </CustomTooltip>
            </Box>
          ) : (
            <CustomTooltip title="Add your story" placement="top">
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
                  aspectRatio: '6/9',
                  height: isSmallLaptop ? "130px" : "150px",
                  "&:hover": {
                    boxShadow: "0 0 5px 5px rgba(0, 255, 255, 0.6)",
                  },
                }}
                onClick={handleOpen}
              >
                {/* Story Image */}
                <Box
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {picturePath && (
                    <img
                      alt="story"
                      style={{
                        aspectRatio: '6/9',
                        height: isSmallLaptop ? "130px" : "150px",
                        borderRadius: "0.75rem",
                        filter: "blur(2px)",
                      }}
                      src={`http://localhost:3001/assets/${userPicturePath}`}
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
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.2rem",
                  }}
                >
                  <Badge
                    variant="standard"
                    size="large"
                    badgeContent={<Add sx={{ fontSize: '1rem' }} />}
                    sx={{
                      '& .MuiBadge-standard': {
                        backgroundColor: palette.primary.main,
                        top: 10,
                        width: '20px',
                        height: '20px',
                        borderRadius: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    }}
                  >
                    <UserImage
                      image={userPicturePath}
                      size="55px"
                    />
                  </Badge>

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
            </CustomTooltip>
          )}
        </Box >
      ) : (
        //Mobile devices
        <Box>
          {currentUserStory ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >

              {/* User Image */}
              <Box>
                <Badge
                  variant="standard"
                  size="large"
                  badgeContent={
                    <IconButton onClick={handleOpen}>
                      <Add sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  }
                  sx={{
                    '& .MuiBadge-standard': {
                      backgroundColor: palette.primary.main,
                      top: 10,
                      width: '20px',
                      height: '20px',
                      borderRadius: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  }}
                >
                  <Box onClick={onImageClick}>
                    <UserImage
                      image={userPicturePath}
                      size="55px"
                    />
                  </Box>
                </Badge>
              </Box>
            </Box>
          ) : (
            <Box
              onClick={handleOpen}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >

              {/* User Image */}
              <Box>
                <Badge
                  variant="standard"
                  size="large"
                  badgeContent={<Add sx={{ fontSize: '1rem' }} />}
                  sx={{
                    '& .MuiBadge-standard': {
                      backgroundColor: palette.primary.main,
                      top: 10,
                      width: '20px',
                      height: '20px',
                      borderRadius: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  }}
                >
                  <Box>
                    <UserImage
                      image={userPicturePath}
                      size="55px"
                    />
                  </Box>
                </Badge>
              </Box>
            </Box>
          )}
        </Box>
      )}

      {/* Modal to Add New Stories */}
      {
        isNonMobileScreens ? (
          // Desktop screens
          <Modal
            open={open}
            onClose={handleClose}
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
                backgroundColor: `${palette.background.alt}`,
                border: 'none',
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {file ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <FlexBetween
                    sx={{
                      flexDirection: 'column',
                      borderRadius: '0.75rem',
                      background: `linear-gradient(to bottom right, ${palette.neutral.light}, ${palette.neutral.dark})`,
                      width: '400px',
                    }}
                  >
                    {/* Display story image with caption */}
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
                      {isVideo ? (
                        // Render video
                        <video
                          style={{
                            width: 'auto',
                            height: 'auto',
                            maxWidth: '400px',
                            maxHeight: '600px',
                          }}
                          controls
                        >
                          <source src={URL.createObjectURL(file)} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
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
                          src={URL.createObjectURL(file)}
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
                      {story && (
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
                          {story}
                        </Typography>
                      )}
                    </Box>
                  </FlexBetween>

                  {/* Caption input, post button, delete icon */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      marginTop: '1rem'
                    }}
                  >
                    <InputBase
                      placeholder="What's on your mind..."
                      onChange={(e) => setStory(e.target.value)}
                      value={story}
                      sx={{
                        flexBasis: '95%',
                        // backgroundColor: palette.neutral.light,
                        border: `1px solid ${palette.neutral.light}`,
                        borderRadius: "1rem",
                        padding: "0.6rem",
                        marginRight: '1rem',
                      }}
                      endAdornment={(
                        <Button
                          onClick={handleStory}
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
                    <Tooltip title="Delete Image">
                      <IconButton
                        onClick={() => setFile(null)}
                        sx={{
                          flexBasis: '5%',
                        }}
                      >
                        <DeleteOutlined />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              ) : (
                (isImage || isVideo) && (
                  <Dropzone
                    acceptedFiles={acceptedFilesByType[isImage ? 'image' : 'video']}
                    multiple={false}
                    onDrop={(acceptedFiles) => handleUpload(acceptedFiles, isImage ? 'image' : 'video')}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <FlexBetween>
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          width="100%"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          <Typography variant="h5" >
                            Upload {isImage ? 'Image' : 'Video'} Here
                          </Typography>
                        </Box>
                      </FlexBetween>
                    )}
                  </Dropzone>
                )
              )}

              {error && (
                <Typography variant="subtitle" color="error" mt={1}>
                  {error}
                </Typography>
              )}

              {!file && (
                <FlexBetween gap={2} mt="1rem">
                  {uploadOptions.map((option) => (
                    <IconButton
                      color="primary"
                      aria-label={option.text}
                      onClick={option.onClick}
                      sx={{
                        width: '5vw',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: "0.5rem",
                        border: `1px solid ${palette.neutral.medium}`,
                        color: palette.neutral.medium,
                        '&:hover': {
                          border: `1px solid ${palette.neutral.dark}`,
                          color: palette.neutral.dark,
                          borderRadius: "0.5rem",
                          backgroundColor: "transparent",
                        },
                        '&:active': {
                          border: `1px solid ${palette.neutral.dark}`,
                          color: palette.neutral.dark,
                          borderRadius: "0.5rem",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      {option.icon}
                      <span>{option.text}</span>
                    </IconButton>
                  ))}
                </FlexBetween>
              )}

              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <Close />
              </IconButton>
            </Box>
          </Modal>
        ) : (
          // Mobile devices
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="image-modal"
            aria-describedby="image-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100vw',
                height: '100vh',
                bgcolor: `${palette.background.alt}`,
                border: 'none',
                boxShadow: 24,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {image ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <FlexBetween
                    sx={{
                      flexDirection: 'column',
                      borderRadius: '0.75rem',
                      background: `linear-gradient(to bottom right, ${palette.neutral.light}, ${palette.neutral.dark})`,
                      width: '100vw',
                    }}
                  >
                    {/* Display story image with caption */}
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
                      <img
                        src={URL.createObjectURL(image)}
                        alt="selectedStory"
                        style={{
                          width: 'auto',
                          height: 'auto',
                          maxWidth: '100vw',
                          maxHeight: '100vh',
                        }}
                        onLoad={(e) => {
                          const { naturalWidth, naturalHeight } = e.target;
                          const isLandscape = naturalWidth > naturalHeight;

                          if (isLandscape) {
                            e.target.style.width = '100vw';
                            e.target.style.height = 'auto';
                          } else {
                            e.target.style.width = 'auto';
                            e.target.style.height = '100vh';
                            e.target.style.borderRadius = '0.75rem';
                          }
                        }}
                      />
                      {story && (
                        <Typography
                          variant="subtitle"
                          component="Box"
                          sx={{
                            position: 'absolute',
                            bottom: '5rem',
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
                          {story}
                        </Typography>
                      )}

                      {/* Caption input, post button, delete icon */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '100%',
                          zIndex: 1000,
                          position: 'absolute',
                          bottom: '0.6rem',
                          right: '0.4rem',
                          left: '0.4rem',
                        }}
                      >
                        <InputBase
                          placeholder="What's on your mind..."
                          onChange={(e) => setStory(e.target.value)}
                          value={story}
                          sx={{
                            flexBasis: '80%',
                            // backgroundColor: palette.neutral.light,
                            border: `1px solid ${palette.neutral.light}`,
                            borderRadius: "1rem",
                            padding: "0.6rem",
                            // marginRight: '1rem',
                          }}
                          endAdornment={(
                            <Button
                              onClick={handleStory}
                              sx={{
                                color: palette.neutral.light,
                                borderRadius: "1rem",
                                whiteSpace: 'nowrap',
                              }}
                            >
                              POST
                            </Button>
                          )}
                        />
                        <IconButton
                          onClick={() => setImage(null)}
                          sx={{
                            flexBasis: '20%',
                          }}
                        >
                          <DeleteOutlined />
                        </IconButton>
                      </Box>
                    </Box>
                  </FlexBetween>
                </Box>
              ) : (
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                >
                  {({ getRootProps, getInputProps }) => (
                    <FlexBetween sx={{ justifyContent: "center" }}>
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        width="100%"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        <p>Add Image Here</p>
                      </Box>
                    </FlexBetween>
                  )}
                </Dropzone>
              )}

              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <Close />
              </IconButton>
            </Box>
          </Modal>
        )
      }
    </>
  );
};

export default MyStoryWidget;