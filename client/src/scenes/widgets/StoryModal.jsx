import {
  Close,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import { Box, IconButton, Modal, Slide, Stack, useMediaQuery, useTheme, } from "@mui/material";
import { useRef, useState } from "react";
import StoryWidget from "./StoryWidget";
import StoryProgressBar from "./StoryProgressBar";

const StoryModal = ({
  stories,
  open,
  onClose,
  initialUserId,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState("left");
  const [isHovered, setIsHovered] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const containerRef = useRef(null);
  const { palette } = useTheme();

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // Group stories by userId
  const groupedStories = stories.reduce((acc, story) => {
    if (!acc[story.userId]) {
      acc[story.userId] = [];
    }
    acc[story.userId].push(story);
    return acc;
  }, {});

  // Sort stories by userId and move stories of initialUserId to the front
  const sortedStories = [];
  Object.keys(groupedStories).forEach((userId) => {
    if (userId === initialUserId) {
      sortedStories.unshift(...groupedStories[userId]);
    } else {
      sortedStories.push(...groupedStories[userId]);
    }
  });

  const userStories = groupedStories[initialUserId] || [];

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

  const handleStoryEnd = () => {
    if (currentStoryIndex < userStories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      handleNextPage();
    } else {
      handleNextPage();
      setCurrentStoryIndex(0);
    }
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
              backgroundColor: `${palette.background.alt}`,
              border: 'none',
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
              {sortedStories
                .slice(currentPage * storiesPerPage, (currentPage + 1) * storiesPerPage)
                .map((story, index) => (
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
                        userName={story.userName}
                        name={`${story.firstName} ${story.lastName}`}
                        description={story.description}
                        location={story.location}
                        picturePath={story.picturePath}
                        videoPath={story.videoPath}
                        userPicturePath={story.userPicturePath}
                        likes={story.likes}
                        comments={story.comments}
                        createdAt={story.createdAt}
                        modalOpen={open}
                        currentStoryIndex={currentStoryIndex}
                        onStoryEnd={handleStoryEnd}
                        userStories={userStories}
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
              backgroundColor: `${palette.background.alt}`,
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
              {sortedStories
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
                        userName={story.userName}
                        name={`${story.firstName} ${story.lastName}`}
                        description={story.description}
                        location={story.location}
                        picturePath={story.picturePath}
                        videoPath={story.videoPath}
                        userPicturePath={story.userPicturePath}
                        likes={story.likes}
                        comments={story.comments}
                        createdAt={story.createdAt}
                        modalOpen={open}
                        currentStoryIndex={currentStoryIndex}
                        onStoryEnd={handleStoryEnd}
                      />
                    </Stack>
                  </Slide>
                ))}
            </Box>
            <StoryProgressBar
              userStories={userStories}
              currentStoryIndex={currentStoryIndex}
              onStoryEnd={handleStoryEnd}
            />
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
              sx={{ position: "absolute", top: 0, right: 0, zIndex: 1000 }}
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
