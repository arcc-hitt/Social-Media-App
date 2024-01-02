import { Stack, Box, IconButton, Slide, Modal } from '@mui/material';
import { NavigateBefore, NavigateNext, Close } from '@mui/icons-material';
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStories } from "state";
import WidgetWrapper from "components/WidgetWrapper";
import StoryWidget from "./StoryWidget";
import MyStoryWidget from './MyStoryWidget';
import StoryModal from './StoryModal';


const StoriesWidget = ({ userId, isProfile = false, picturePath }) => {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories);
  const token = useSelector((state) => state.token);

  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState("left");
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUserId, setModalUserId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleModalOpen = (userId) => {
    setModalOpen(true);
    setModalUserId(userId);
    // setSelectedUserId(userId);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  
  const uniqueUserStories = Object.values(
    stories.reduce((acc, story) => {
      if (!acc[story.userId]) {
        acc[story.userId] = story;
      }
      return acc;
    }, {})
  );

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

  const storiesPerPage = 3;
  const totalPages = Math.ceil(uniqueUserStories.length / storiesPerPage);

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

  return (
    <>
    <WidgetWrapper m="2rem 0">
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
              zIndex: "1000",
            }}
          >
            <NavigateBefore />
          </IconButton>

          <Stack
            direction="row"
            spacing={1}
            width="100%"
          >
            <Box>
              <MyStoryWidget picturePath={picturePath}/>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: "row",
                width: "100%",
              }}
              ref={containerRef}
            >
              {uniqueUserStories.slice(startIdx, endIdx).map(
                (story, index) => (
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
                      spacing={1}
                      style={{ width: `${100 / storiesPerPage}%` }}
                      onClick={ () => handleModalOpen(story.userId)}
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
                      />
                    </Stack>
                  </Slide>
                )
              )}
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
      </WidgetWrapper>
      {modalOpen && (
        <StoryModal
          stories={stories}
          open={modalOpen}
          onClose={handleModalClose}
          // selectedUserId={selectedUserId}
          initialUserId={modalUserId}
      />
      )}
      
    </>
  );
};

export default StoriesWidget;