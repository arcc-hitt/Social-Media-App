import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  Close,
  Add,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  Modal,
  Badge,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStories } from "state";

const MyStoryWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [story, setStory] = useState("");
  const [open, setOpen] = useState(false);

  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const primaryMain = palette.primary.main;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleStory = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", story);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/stories`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const stories = await response.json();
    dispatch(setStories({ stories }));
    setImage(null);
    setStory("");
  };

  const storyOptionStyles = {
    color: medium,
    borderRadius: "5px",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: palette.neutral.light,
      padding: "0.5rem",
      color: palette.neutral.dark,
    },
  };

  return (
    <>
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
          "&:hover": {
            boxShadow: "0 0 20px 5px rgba(0, 255, 255, 0.8)",
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
              image={picturePath}
              size="55px"
            />
          </Badge>
        </Box>
      </Box>

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
          {image ? (
            <FlexBetween sx={{ flexDirection: 'column', alignItems: 'center' }}>
              <Box style={{ position: 'relative' }}>
                <img
                  src={URL.createObjectURL(image)}
                  alt="selectedStory"
                  style={{
                    width: '400px',
                    height: '600px',
                    borderRadius: '0.75rem',
                  }}
                />
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
              <Box sx={{ display: 'flex', width: '100%', marginTop: '1rem' }}>
                <InputBase
                  placeholder="What's on your mind..."
                  onChange={(e) => setStory(e.target.value)}
                  value={story}
                  sx={{
                    flex: 1,
                    backgroundColor: palette.neutral.light,
                    borderRadius: "1rem",
                    padding: "1rem",
                    marginRight: '1rem',
                  }}
                />
                <Button
                  disabled={!story}
                  onClick={handleStory}
                  sx={{
                    color: palette.neutral.light,
                    backgroundColor: palette.primary.main,
                    borderRadius: "1rem",
                    '&:hover': {
                      color: palette.neutral.dark,
                      backgroundColor: palette.primary.light,
                    },
                    whiteSpace: 'nowrap',
                  }}
                >
                  POST
                </Button>

                <IconButton onClick={() => setImage(null)}>
                  <DeleteOutlined />
                </IconButton>
              </Box>
            </FlexBetween>
          ) : (
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
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
                    <p>Add Image Here</p>
                  </Box>
                </FlexBetween>
              )}
            </Dropzone>
          )}
        </Box>

          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <Close />
          </IconButton>
        </Box>
      </Modal>
    </>
  );
};

export default MyStoryWidget;


      {/* <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setStory(e.target.value)}
          value={story}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "1rem",
            padding: "1rem 1rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
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
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween
          gap="0.25rem"
          onClick={() => setIsImage(!isImage)}
          sx={ storyOptionStyles }>
          <ImageOutlined />
          <Typography> Image </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem" sx={ storyOptionStyles }>
              <GifBoxOutlined />
              <Typography>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem" sx={ storyOptionStyles }>
              <AttachFileOutlined />
              <Typography>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem" sx={ storyOptionStyles }>
              <MicOutlined />
              <Typography>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!story}
          onClick={handleStory}
          sx={{
            color: palette.neutral.light,
            backgroundColor: palette.primary.main,
            borderRadius: "1rem",
            '&:hover' : {
              color: palette.neutral.dark,
              backgroundColor: palette.primary.light,
            }
          }}
        >
          POST
        </Button>
        </FlexBetween> */}