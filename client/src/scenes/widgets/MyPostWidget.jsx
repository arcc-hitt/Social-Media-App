import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
  MoreHorizOutlined,
  VideoLibraryOutlined,
  DescriptionOutlined,
  AudiotrackOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const [isDocument, setIsDocument] = useState(false);
  const [file, setFile] = useState(null);
  const [post, setPost] = useState("");
  const [error, setError] = useState(null);

  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);

    // Check if file exists before appending it to formData
    if (isImage) {
      formData.append("picture", file);
      formData.append("picturePath", file.name);
    }
    if (isVideo) {
      formData.append("video", file);
      formData.append("videoPath", file.name);
    }
    if (isDocument) {
      formData.append("document", file);
      formData.append("documentPath", file.name);
    }
    if (isAudio) {
      formData.append("audio", file);
      formData.append("audioPath", file.name);
    }

    try {
      const response = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      const posts = await response.json();
      dispatch(setPosts({ posts }));
      setFile(null);
      setPost("");
    } catch (error) {
      console.error("Error creating post:", error.message);
      setError("Something went wrong!!");
    }
  };

  const postOptionStyles = {
    color: medium,
    borderRadius: "5px",
    py: "0.2rem",
    px: "0.3rem",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: palette.neutral.light,
      py: "0.2rem",
      px: "0.3rem",
      color: palette.neutral.dark,
    },
  };

  const handleUpload = (acceptedFiles, type) => {
    const allowedTypes = {
      image: [".jpg", ".jpeg", ".png"],
      video: [".mp4", ".mov", ".avi"],
      audio: [".mp3", ".wav", ".m4a"],
      document: [".pdf", ".doc", ".docx", ".xls", ".xlsx"],
    };

    const fileType = type === 'image' ? 'image' : type === 'video' ? 'video' : type === 'audio' ? 'audio' : 'document';

    const fileExtension = acceptedFiles[0].name.split('.').pop().toLowerCase();

    if (allowedTypes[fileType].includes(`.${fileExtension}`)) {
      setFile(acceptedFiles[0]);
      setIsImage(type === 'image');
      setIsVideo(type === 'video');
      setIsAudio(type === 'audio');
      setIsDocument(type === 'document');
      setError(null);
    } else {
      setError("Invalid file type. Please upload a valid file.");
    }
  };

  const acceptedFilesByType = {
    image: ".jpg,.jpeg,.png",
    video: ".mp4,.mov,.avi",
    audio: ".mp3,.wav",
    document: ".pdf,.doc,.docx,.xls,.xlsx",
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            border: `1px solid ${palette.neutral.light}`,
            borderRadius: "1rem",
            padding: "1rem 1rem",
          }}
        />
      </FlexBetween>
      {(isImage || isVideo || isAudio || isDocument) && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles={acceptedFilesByType[isImage ? 'image' : isVideo ? 'video' : isAudio ? 'audio' : 'document']}
            multiple={false}
            onDrop={(acceptedFiles) => handleUpload(acceptedFiles, isImage ? 'image' : isVideo ? 'video' : isAudio ? 'audio' : 'document')}
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
                  {!file ? (
                    <Typography variant="h5" >
                      Upload {isImage ? 'Image' : isVideo ? 'Video' : isAudio ? 'Audio' : 'Document'} Here
                    </Typography>
                  ) : (
                    <FlexBetween>
                      <Typography>{file.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {file && (
                  <IconButton
                    onClick={() => setFile(null)}
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

      {error && (
        <Typography variant="subtitle" color="error" mt={1}>
          {error}
        </Typography>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween
          gap="0.25rem"
          onClick={() => {
            setIsImage(!isImage);
            setIsVideo(false);
            setIsAudio(false);
            setIsDocument(false);
          }}
          sx={postOptionStyles}>
          <ImageOutlined />
          <Typography> Image </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween
              gap="0.25rem"
              onClick={() => {
                setIsImage(false);
                setIsVideo(!isVideo);
                setIsAudio(false);
                setIsDocument(false);
              }}
              sx={postOptionStyles}
            >
              <VideoLibraryOutlined />
              <Typography>Clip</Typography>
            </FlexBetween>

            <FlexBetween
              gap="0.25rem"
              onClick={() => {
                setIsImage(false);
                setIsVideo(false);
                setIsAudio(false);
                setIsDocument(!isDocument);
              }}
              sx={postOptionStyles}
            >
              <DescriptionOutlined />
              <Typography>Document</Typography>
            </FlexBetween>

            <FlexBetween
              gap="0.25rem"
              onClick={() => {
                setIsImage(false);
                setIsVideo(false);
                setIsAudio(!isAudio);
                setIsDocument(false);
              }}
              sx={postOptionStyles}
            >
              <AudiotrackOutlined />
              <Typography>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.neutral.light,
            backgroundColor: palette.primary.main,
            borderRadius: "1rem",
            '&:hover': {
              color: palette.neutral.dark,
              backgroundColor: palette.primary.light,
            }
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;