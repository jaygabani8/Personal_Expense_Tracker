import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  // Initialize the navigate function
  const navigate = useNavigate();

  // Function to navigate to the Summary page
  const handleSummaryClick = () => {
    navigate("/summary");
  };
  // Function to navigate to the home page
  const handleTitleClick = () => {
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          onClick={handleTitleClick}
          style={{
            color: "#ffffff",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Personal Expense Tracker
          </Typography>
        </Button>

        <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          <Button
            variant="outlined"
            onClick={handleSummaryClick}
            style={{
              color: isDarkMode ? "#fff" : "#000",
              borderColor: isDarkMode ? "#fff" : "#000",
              marginRight: "20px",
            }}
          >
            Summary
          </Button>
          {/* Switch to toggle between dark mode and light mode */}
          <FormControlLabel
            control={
              <Switch
                checked={isDarkMode}
                onChange={toggleTheme}
                color="default"
              />
            }
            label={isDarkMode ? "Dark Mode" : "Light Mode"}
            style={{ color: "#ffffff" }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
