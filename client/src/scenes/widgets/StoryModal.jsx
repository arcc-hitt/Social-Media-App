import {
    ChatBubbleOutlineOutlined,
    ChatBubbleOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    Close,
    NavigateBefore,
    NavigateNext,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, TextField, Button, Modal, useTheme, Slide, Stack } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import UserImage from "components/UserImage";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useRef, useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setStory } from "state";
  import moment from "moment";
  import StoryWidget from "./StoryWidget";
  
  const StoryModal = ({
    stories,
    open,
    onClose,
    selectedUserId,
    initialUserId,
  }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [slideDirection, setSlideDirection] = useState("left");
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);

    // useEffect(() => {
    //   if (selectedUserId) {
    //     // Find the index of the first story of the selected user
    //     const index = stories.findIndex((story) => story.userId === selectedUserId);
    //     if (index !== -1) {
    //       // Set the current page based on the index
    //       setCurrentPage(Math.floor(index / storiesPerPage));
    //     }
    //   }
    // }, [selectedUserId, stories]);

    const initialUserIndex = stories.findIndex((story) => story.userId === initialUserId);
    const reorderedStories = [
      ...stories.slice(initialUserIndex),
      ...stories.slice(0, initialUserIndex),
    ];

    const handleNextPage = () => {
      setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
      setSlideDirection("left");
    };
    
    const storiesPerPage = 1;
    const totalPages = Math.ceil(stories.length / storiesPerPage);

    const handlePrevPage = () => {
      setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
      setSlideDirection("right");
    };
  
    return (
      <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="image-modal"
        aria-describedby="image-modal-description"
      >
        <Box
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
          <IconButton
            onClick={handlePrevPage}
            sx={{
              visibility: isHovered ? "visible" : "hidden",
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: "1000",
            }}
          >
            <NavigateBefore />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              flexDirection: "row",
              width: "100%",
              alignItems: 'center',
              justifyContent: 'center',
            }}
            ref={containerRef}
            >
              {reorderedStories
              .slice(currentPage * storiesPerPage, (currentPage + 1) * storiesPerPage)
              .map((story) => (
                <Slide
                  key={story._id}
                  direction={slideDirection}
                  in={true}
                  container={containerRef.current}
                >
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <StoryWidget
                      storyId={story._id}
                      storyUserId={story.userId}
                      name={`${story.firstName} ${story.lastName}`}
                      description={story.description}
                      location={story.location}
                      picturePath={story.picturePath}
                      userPicturePath={story.userPicturePath}
                      likes={story.likes}
                      comments={story.comments}
                      createdAt={story.createdAt}
                      modalOpen={open}
                    />
                  </Stack>
                </Slide>
              ))}
              </Box>
              <IconButton
                onClick={handleNextPage}
                sx={{
                  visibility: isHovered ? "visible" : "hidden",
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <NavigateNext />
              </IconButton>
            
            {/* Close Button */}
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{ position: "absolute", top: 0, right: 0 }}
            >
              <Close />
            </IconButton>
          </Box>
      </Modal>
    </>
    );
  };
  
  export default StoryModal;
