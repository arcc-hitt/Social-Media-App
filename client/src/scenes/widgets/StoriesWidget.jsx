import { Stack, Box, IconButton, Slide, useMediaQuery } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSwipeable } from 'react-swipeable';
import { setStories } from "state";
import WidgetWrapper from "components/WidgetWrapper";
import StoryWidget from "./StoryWidget";
import MyStoryWidget from './MyStoryWidget';
import StoryModal from './StoryModal';
import { useTheme } from '@emotion/react';

const StoriesWidget = ({ userId, isProfile, userPicturePath }) => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.user);
  const stories = useSelector((state) => state.stories);
  const token = useSelector((state) => state.token);

  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState("left");
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUserId, setModalUserId] = useState(null);

  const handleModalOpen = (userId) => {
    setModalOpen(true);
    setModalUserId(userId);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const uniqueUserStories = Array.isArray(stories)
    ? Object.values(
        stories.reduce((acc, story) => {
          if (!acc[story.userId]) {
            acc[story.userId] = [];
          }
          acc[story.userId].push(story);
          return acc;
        }, {})
      )
    : [];

  uniqueUserStories.forEach((userStories) => {
    userStories.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  });

  const earliestUserStories = uniqueUserStories.map(userStories => userStories[0]);

  const currentUserStory = earliestUserStories.some((story) => story.userId === userId);
  
  const getStories = async () => {
    const response = await fetch("http://localhost:3001/stories", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    dispatch(setStories({ stories: data }));
  };

  const getUserStories = async () => {
    const response = await fetch(
      `http://localhost:3001/stories/${userId}/stories`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setStories({ stories: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserStories();
    } else {
      getStories();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const theme = useTheme();
  const isSmallLaptop = useMediaQuery(theme.breakpoints.only('md'));
  const isSmallMobile = useMediaQuery("(width: 320px)");

  const cardsPerPage = { md: isSmallLaptop || isSmallMobile ? 4 : 5 };

  const storiesPerPage = cardsPerPage.md - 1;

  const totalPages = Math.round(earliestUserStories.length / storiesPerPage);

  const startIdx = currentPage * storiesPerPage;
  const endIdx = startIdx + storiesPerPage;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    setSlideDirection("left");
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    setSlideDirection("right");
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextPage(),
    onSwipedRight: () => handlePrevPage(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <>
      {/* Story Cards Carousel*/}
      <WidgetWrapper mb="2rem">
        <div {...handlers}>
          <Box
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
              display: 'flex',
              flexDirection: "row",
              position: "relative",
            }}
          >
            <IconButton
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              sx={{
                visibility: isHovered ? "visible" : "hidden",
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: "10",
              }}
            >
              <NavigateBefore />
            </IconButton>

            <Stack
              direction="row"
              width="100%"
              ref={containerRef}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                {/* Render MyStoryWidget component */}
                {!currentUserStory ? (
                  userId && (
                    <Slide
                      direction={slideDirection}
                      in={true}
                      container={containerRef.current}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        style={{ width: `${100 / cardsPerPage}%` }}
                      >
                        <MyStoryWidget
                          userName={userName}
                          picturePath={userPicturePath}
                          userPicturePath={userPicturePath}
                          currentUserStory={currentUserStory}
                        />
                      </Stack>
                    </Slide>
                  )
                ) : (
                  earliestUserStories
                    .filter((story) => story.userId === userId)
                    .map((story) => (
                      <Slide
                        key={story._id}
                        direction={slideDirection}
                        in={true}
                        container={containerRef.current}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-around"
                          alignItems="center"
                          style={{ width: `${100 / cardsPerPage}%` }}
                        >
                          <MyStoryWidget
                            userName={story.userName}
                            picturePath={story.picturePath}
                            videoPath={story.videoPath}
                            userPicturePath={story.userPicturePath}
                            currentUserStory={currentUserStory}
                            onImageClick={() => handleModalOpen(story.userId)}
                          />
                        </Stack>
                      </Slide>
                    ))
                )}

                {/* Render other StoryWidget components */}
                {earliestUserStories
                  .filter((story) => story.userId !== userId)
                  .slice(startIdx, endIdx)
                  .map((story) => (
                    <Slide
                      key={story._id}
                      direction={slideDirection}
                      in={true}
                      container={containerRef.current}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        spacing='1'
                        style={{ width: `${100 / storiesPerPage}%` }}
                        onClick={() => handleModalOpen(story.userId)}
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
                        />
                      </Stack>
                    </Slide>
                  ))
                }
              </Box>
            </Stack>

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
          </Box>
        </div>
      </WidgetWrapper>
      {modalOpen && currentUserStory && (
        <StoryModal
          // stories={stories}
          stories={modalUserId === userId ? stories.filter(story => story.userId === userId) : stories.filter(story => story.userId !== userId)}
          open={modalOpen}
          onClose={handleModalClose}
          initialUserId={modalUserId}
        />
      )}
    </>
  );
};

export default StoriesWidget;
