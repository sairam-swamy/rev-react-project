import React, { useState } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    Button,
    Select,
    MenuItem,
    Card,
    CardContent,
    Grid,
} from "@mui/material";

const citiesList = ["New York", "London", "Mumbai", "Tokyo", "Sydney", "Dubai"];

const WeatherDashboard = () => {
    const [selectedCities, setSelectedCities] = useState([]);
    const [weatherData, setWeatherData] = useState([]);

    const handleCityChange = (event) => {
        const selected = event.target.value;
        if (selected.length <= 3) {
            setSelectedCities(selected);
        }
    };

    const fetchWeather = async () => {
        if (selectedCities.length < 3) {
            alert("Please select at least 3 cities.");
            return;
        }

        console.log("Sending request with cities:", selectedCities); // Debugging Log

        try {
            const response = await axios.post("http://localhost:5000/weather", {
                cities: selectedCities,
            });

            console.log("Response from backend:", response.data); // Debugging Log
            setWeatherData(response.data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };



    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Weather Tracking Dashboard
            </Typography>

            <Select
                multiple
                value={selectedCities}
                onChange={handleCityChange}
                displayEmpty
                fullWidth
            >
                {citiesList.map((city) => (
                    <MenuItem key={city} value={city}>
                        {city}
                    </MenuItem>
                ))}
            </Select>

            <Button
                variant="contained"
                color="primary"
                onClick={fetchWeather}
                disabled={selectedCities.length < 3}
                style={{ marginTop: "10px" }}
            >
                Get Weather Data
            </Button>

            <Grid container spacing={2} style={{ marginTop: "20px" }}>
                {weatherData.map((weather) => (
                    <Grid item xs={12} md={4} key={weather.city}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{weather.city}</Typography>
                                <Typography>🌡 Temperature: {weather.temperature}°C</Typography>
                                <Typography>💨 Wind Speed: {weather.wind_speed} m/s</Typography>
                                <Typography>💧 Humidity: {weather.humidity}%</Typography>
                                <Typography>⏲ Pressure: {weather.pressure} hPa</Typography>
                                <Typography>🌤 Condition: {weather.condition}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default WeatherDashboard;
