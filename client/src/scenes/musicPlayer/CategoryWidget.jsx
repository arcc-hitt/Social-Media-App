import { Box, Grid, useTheme } from "@mui/material";
import CategoryCard from 'components/CategoryCard';
import axios from 'axios';
import MusicWidgetTitle from 'components/MusicWidgetTitle';
import { useState, useEffect } from 'react';

const CategoryWidget = () => {
    // const [moods, setMoods] = useState([]);
    // const [genres, setGenres] = useState([]);

    function getRandomColor() {
        const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "black"];
        return colors[Math.floor(Math.random() * colors.length)];
      }

    const moods = [
        { category: "Fruit", color: getRandomColor() },
        { category: "Animal", color: getRandomColor() },
        { category: "Vehicle", color: getRandomColor() },
        { category: "Clothing", color: getRandomColor() },
        { category: "Food", color: getRandomColor() },
        { category: "Sport", color: getRandomColor() },
        { category: "Country", color: getRandomColor() },
        { category: "Instrument", color: getRandomColor() },
        { category: "Movie", color: getRandomColor() }
      ];

    const genres = [
        { category: "Cricket", color: getRandomColor() },
        { category: "City", color: getRandomColor() },
        { category: "Drink", color: getRandomColor() },
        { category: "Football", color: getRandomColor() },
        { category: "Game", color: getRandomColor() },
        { category: "Music Genre", color: getRandomColor() },
        { category: "Continent", color: getRandomColor() },
        { category: "Book Genre", color: getRandomColor() },
        { category: "Vegetable", color: getRandomColor() }
      ];

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:3001/music/home");
    //             const categoriesData = response.data.results.mood_and_genres;
    //             setMoods(categoriesData[0].gridRenderer.items);
    //             setGenres(categoriesData[1].gridRenderer.items);
    //             console.log(categoriesData);
    //         } catch (error) {
    //             console.error("Error fetching music data:", error);
    //         }
    //     };
    //     fetchCategories();
    // }, []);

    // const categories = [
    //     ...moods.slice(0, 4),
    //     genres[5],
    //     genres[8],
    //     genres[9],
    //     genres[15],
    //     genres[4]
    // ].filter(Boolean);

    const categories = [
        ...moods.slice(0, 4),
        ...genres.slice(0, 5),
    ];

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'space-between',
            }}
        >
            <MusicWidgetTitle title='Moods & Genres' />
            <Grid
                container
                spacing={3}
                alignItems='space-evenly'
                flex={1}
            >
                {categories.slice(0, 9).map((category, index) => (
                    <Grid key={index} item xs={6} sm={4}>
                        <CategoryCard
                            // title={category.musicNavigationButtonRenderer.buttonText.runs[0].text}
                            // color={category.musicNavigationButtonRenderer.solid.leftStripeColor}
                            title={category.category}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default CategoryWidget;
