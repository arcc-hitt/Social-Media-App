import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

const StoryProgressBar = ({ userStories, currentStoryIndex, onStoryEnd, isPlaying, duration, currentProgress }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentProgress !== null) {
      setProgress(currentProgress);
    } else {
      setProgress(0);
    }
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onStoryEnd();
          return 100;
        }
        return prev + 1;
      });
    }, (duration * 1000) / 100); // Use duration for interval

    return () => clearInterval(interval);
  }, [currentStoryIndex, onStoryEnd, userStories, isPlaying, duration, currentProgress]);

  return (
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
      {userStories.map((_, index) => (
        <LinearProgress
          key={index}
          variant="determinate"
          value={index === currentStoryIndex ? progress : index < currentStoryIndex ? 100 : 0}
          style={{ flex: 1, margin: "0 2px" }}
        />
      ))}
    </Box>
  );
};

export default StoryProgressBar;
