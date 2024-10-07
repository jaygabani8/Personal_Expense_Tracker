import React from "react";
import { motion } from "framer-motion";
import { Switch } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
const ThemeSwitch = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: "absolute", top: "20px", right: "20px" }}
    >
      <Switch
        checked={isDarkMode}
        onChange={toggleTheme}
        color="default"
        inputProps={{ "aria-label": "theme toggle" }}
      />
    </motion.div>
  );
};

export default ThemeSwitch;
