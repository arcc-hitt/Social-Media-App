import {
  Close,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import { Box, IconButton, Modal, Slide, Stack, useMediaQuery } from "@mui/material";
import { useRef, useState } from "react";
import StoryWidget from "./StoryWidget";

const StoryModal = ({
  stories,
  open,
  onClose,
  initialUserId,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState("left");
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

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
    {isNonMobileScreens ? (
      //Desktop devices
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
    ) : (
      //Mobile devices
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
            width: '100vw',
            height: '100vh',
            bgcolor: 'background.paper',
            border: 'none',
            boxShadow: 24,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconButton
            onClick={handlePrevPage}
            sx={{
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
            sx={{ position: "absolute", top: 0, right: 0, zIndex: 1000}}
          >
            <Close />
          </IconButton>
        </Box>
      </Modal>
    )}
    </>
  );
};

export default StoryModal;
