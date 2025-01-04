import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

const StoryProgressBar = ({ userStories, currentStoryIndex, onStoryEnd }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onStoryEnd();
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentStoryIndex, onStoryEnd]);

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
