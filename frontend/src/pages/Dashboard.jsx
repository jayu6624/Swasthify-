import {
  CircularProgress, Switch, Drawer, List, ListItem, ListItemIcon, ListItemText,
  Box, AppBar, Toolbar, Button, IconButton, Card, Typography
} from "@mui/material";
import { 
  ArrowDropDown, ChevronLeft, ChevronRight, FitnessCenter, 
  LocalDrink, Restaurant, Bed, MonitorWeight, Add, Menu as MenuIcon,
  Chat, Camera, Person
} from "@mui/icons-material";
import { format, subDays } from "date-fns";
import { useState, useRef } from 'react';

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "dd-MM"));
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrollRef = useRef(null);
  const cardsScrollRef = useRef(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDateClick = (date) => {
    setSelectedDate(format(new Date(date), "dd-MM"));
    setIsOpen(false);
  };

  const dates = [...Array(120)].map((_, i) => {
    const date = subDays(new Date(), i);
    return {
      fullDate: format(date, "yyyy-MM-dd"),
      day: format(date, "EEE"),
      dateNum: format(date, "dd"),
    };
  }).reverse();

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" });

  const progressData = [
    { name: "Food", icon: <Restaurant fontSize="large" />, progress: 70 },
    { name: "Weight", icon: <MonitorWeight fontSize="large" />, progress: 50 },
    { name: "Exercise", icon: <FitnessCenter fontSize="large" />, progress: 80 },
    { name: "Sleep", icon: <Bed fontSize="large" />, progress: 60 },
    { name: "Water", icon: <LocalDrink fontSize="large" />, progress: 90 },
  ];

  const navItems = [
    { label: 'Dashboard', icon: <MonitorWeight /> },
    { label: 'Chat', icon: <Chat /> },
    { label: 'Snap', icon: <Camera /> },
    { label: 'Profile', icon: <Person /> },
    { 
      label: darkMode ? 'Light Mode' : 'Dark Mode', 
      icon: <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
    }
  ];

  const foodCard = progressData.find(item => item.name === "Food");
  const otherCards = progressData.filter(item => item.name !== "Food");

  const scrollOneCard = (direction) => {
    const container = cardsScrollRef.current;
    if (!container) return;
    
    const cardWidth = 200;
    const gap = 24;
    const scrollDistance = cardWidth + gap;
    
    container.scrollBy({ 
      left: direction === 'left' ? -scrollDistance : scrollDistance, 
      behavior: 'smooth' 
    });
  };

  return (
    <Box
      sx={{
        bgcolor: darkMode ? "#121212" : "#f5f5f5",
        minHeight: "100vh",
        color: darkMode ? "white" : "black",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        maxWidth: "100%"
      }}
    >
      {/* AppBar */}
      <AppBar
        position="sticky"
        sx={{
          bgcolor: darkMode ? "black" : "#ffffff",
          color: darkMode ? "white" : "black",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          position: "relative",
          width: "100%",
          left: 0,
          transform: "none",
          px: 0
        }}
        elevation={1}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            px: { xs: 2, sm: 3 }
          }}
        >
          <Button
            variant="contained"
            endIcon={<ArrowDropDown />}
            onClick={() => setIsOpen(!isOpen)}
            sx={{
              fontSize: 18,
              fontWeight: "bold",
              background: darkMode ? "#b30000" : "#007acc",
              color: "white",
              borderRadius: 5,
              px: 2,
              py: 1,
              "&:hover": {
                background: darkMode ? "#cc0000" : "#0088cc",
                borderColor: darkMode ? "#ff4d4d" : "#007acc"
              },
              "&.MuiButton-contained": {
                border: `2px solid ${darkMode ? "#ff4d4d" : "#007acc"}`
              }
            }}
          >
            {selectedDate === format(new Date(), "dd-MM") ? "Today" : selectedDate}
          </Button>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{
              color: darkMode ? "#ff4d4d" : "#007acc",
              bgcolor: darkMode ? "rgba(255,77,77,0.1)" : "rgba(0,122,204,0.1)",
              "&:hover": {
                bgcolor: darkMode ? "rgba(255,77,77,0.2)" : "rgba(0,122,204,0.2)"
              }
            }}
          >
            <MenuIcon fontSize="medium" />
          </IconButton>

          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            sx={{
              "& .MuiDrawer-paper": {
                width: 240,
                bgcolor: darkMode ? "#1e1e1e" : "white",
                color: darkMode ? "white" : "black",
                boxShadow: "-4px 0 8px rgba(0,0,0,0.1)"
              }
            }}
          >
            <List sx={{ pt: 2 }}>
              {navItems.map((item) => (
                <ListItem
                  key={item.label}
                  button
                  onClick={item.onClick || handleDrawerToggle}
                  sx={{
                    py: 1.5,
                    "&:hover": {
                      bgcolor: darkMode ? "rgba(255,77,77,0.1)" : "rgba(0,122,204,0.1)"
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: darkMode ? "#ff4d4d" : "#007acc",
                      minWidth: 40
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{
                      "& .MuiTypography-root": {
                        fontWeight: 500,
                        fontSize: "1rem"
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>

      <Box>
        {/* Date Selection */}
        <Box sx={{ p: 3 }}>
          {isOpen && (
            <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
              <IconButton onClick={scrollLeft} sx={{ color: darkMode ? "#ff4d4d" : "#007acc" }}>
                <ChevronLeft />
              </IconButton>

              <Box
                ref={scrollRef}
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  scrollBehavior: "smooth",
                  whiteSpace: "nowrap",
                  gap: 2,
                  px: 1,
                  "&::-webkit-scrollbar": { display: "none" },
                  msOverflowStyle: "none",
                  scrollbarWidth: "none"
                }}
              >
                {dates.map(({ fullDate, day, dateNum }) => (
                  <Button
                    key={fullDate}
                    onClick={() => handleDateClick(fullDate)}
                    variant={selectedDate === format(new Date(fullDate), "dd-MM") ? "contained" : "outlined"}
                    sx={{
                      minWidth: 90,
                      flexDirection: "column",
                      alignItems: "center",
                      fontWeight: "bold",
                      py: 1,
                      color: selectedDate === format(new Date(fullDate), "dd-MM") ? "white" : darkMode ? "#ff4d4d" : "#007acc",
                      borderColor: darkMode ? "#ff4d4d" : "#007acc",
                      bgcolor: selectedDate === format(new Date(fullDate), "dd-MM") ? (darkMode ? "#b30000" : "#007acc") : "transparent"
                    }}
                  >
                    <Typography variant="body1" sx={{ fontSize: 24 }}>{dateNum}</Typography>
                    <Typography variant="caption" sx={{ fontSize: 12 }}>{day}</Typography>
                  </Button>
                ))}
              </Box>

              <IconButton onClick={scrollRight} sx={{ color: darkMode ? "#ff4d4d" : "#007acc" }}>
                <ChevronRight />
              </IconButton>
            </Box>
          )}
        </Box>

        {/* Food Card */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center",
          mt: 4,
          mb: 4
        }}>
          <Card
            sx={{
              p: 3,
              textAlign: "center",
              position: "relative",
              bgcolor: darkMode ? "#2a2a2a" : "#f8f8f8",
              color: darkMode ? "white" : "black",
              boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
              width: "300px",
              transform: "scale(1.2)",
              "&:hover": { transform: "scale(1.22)", transition: "0.3s" }
            }}
          >
            {/* Main Food Progress */}
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <CircularProgress
                variant="determinate"
                value={100}
                size={100}
                thickness={7}
                sx={{ 
                  color: darkMode ? "rgba(255, 77, 77, 0.2)" : "rgba(0, 122, 204, 0.2)",
                  position: "absolute",
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round'
                  }
                }}
              />
              <CircularProgress
                variant="determinate"
                value={foodCard.progress}
                size={100}
                thickness={7}
                sx={{ 
                  color: darkMode ? "#ff4d4d" : "#007acc",
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round'
                  }
                }}
              />
              <Box sx={{ 
                position: "absolute", 
                top: "50%", 
                left: "50%", 
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.5
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: darkMode ? "#ff4d4d" : "#007acc",
                    lineHeight: 1
                  }}
                >
                  2348
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontSize: "0.7rem",
                    color: darkMode ? "#ff4d4d" : "#007acc",
                    opacity: 0.9,
                    lineHeight: 1
                  }}
                >
                  kcal left
                </Typography>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, mt: 2 }}>
              {foodCard.name}
            </Typography>

            {/* Nutritional Progress */}
            <Box sx={{ 
              display: "flex", 
              justifyContent: "space-around",
              alignItems: "flex-start",
              mt: 2,
              mb: 1,
              gap: 2
            }}>
              {/* Protein */}
              <Box sx={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center",
                gap: 0.5
              }}>
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={40}
                    thickness={7}
                    sx={{ 
                      color: darkMode ? "rgba(255, 77, 77, 0.2)" : "rgba(0, 122, 204, 0.2)",
                      position: "absolute",
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round'
                      }
                    }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={75}
                    size={40}
                    thickness={7}
                    sx={{ 
                      color: darkMode ? "#ff4d4d" : "#007acc",
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round'
                      }
                    }}
                  />
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontSize: "0.75rem",
                    fontWeight: "medium",
                    color: darkMode ? "#ff4d4d" : "#007acc"
                  }}
                >
                  Protein
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: darkMode ? "#ff4d4d" : "#007acc",
                    opacity: 0.9
                  }}
                >
                  112/150g
                </Typography>
              </Box>

              {/* Carbs */}
              <Box sx={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center",
                gap: 0.5
              }}>
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={40}
                    thickness={7}
                    sx={{ 
                      color: darkMode ? "rgba(255, 77, 77, 0.2)" : "rgba(0, 122, 204, 0.2)",
                      position: "absolute",
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round'
                      }
                    }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={60}
                    size={40}
                    thickness={7}
                    sx={{ 
                      color: darkMode ? "#ff4d4d" : "#007acc",
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round'
                      }
                    }}
                  />
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontSize: "0.75rem",
                    fontWeight: "medium",
                    color: darkMode ? "#ff4d4d" : "#007acc"
                  }}
                >
                  Carbs
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: darkMode ? "#ff4d4d" : "#007acc",
                    opacity: 0.9
                  }}
                >
                  180/300g
                </Typography>
              </Box>

              {/* Fats */}
              <Box sx={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center",
                gap: 0.5
              }}>
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={40}
                    thickness={7}
                    sx={{ 
                      color: darkMode ? "rgba(255, 77, 77, 0.2)" : "rgba(0, 122, 204, 0.2)",
                      position: "absolute",
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round'
                      }
                    }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={45}
                    size={40}
                    thickness={7}
                    sx={{ 
                      color: darkMode ? "#ff4d4d" : "#007acc",
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round'
                      }
                    }}
                  />
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontSize: "0.75rem",
                    fontWeight: "medium",
                    color: darkMode ? "#ff4d4d" : "#007acc"
                  }}
                >
                  Fats
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: darkMode ? "#ff4d4d" : "#007acc",
                    opacity: 0.9
                  }}
                >
                  29/65g
                </Typography>
              </Box>
            </Box>

            <IconButton 
              sx={{ 
                position: "absolute", 
                bottom: 10, 
                right: 10, 
                color: darkMode ? "#ff4d4d" : "#007acc",
                bgcolor: darkMode ? "rgba(255,77,77,0.1)" : "rgba(0,122,204,0.1)",
                "&:hover": {
                  bgcolor: darkMode ? "rgba(255,77,77,0.2)" : "rgba(0,122,204,0.2)"
                }
              }}
            >
              <Add />
            </IconButton>
          </Card>
        </Box>

        {/* Other Cards */}
        <Box sx={{ 
          position: "relative",
          display: "flex",
          alignItems: "center",
          px: 2
        }}>
          <IconButton 
            onClick={() => scrollOneCard('left')}
            sx={{ 
              position: "absolute",
              left: 0,
              zIndex: 2,
              color: darkMode ? "white" : "black",
              bgcolor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
              "&:hover": {
                bgcolor: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"
              }
            }}
          >
            <ChevronLeft />
          </IconButton>

          <Box 
            ref={cardsScrollRef}
            sx={{ 
              display: "flex",
              overflowX: "auto",
              gap: 3,
              py: 2,
              px: 6,
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              scrollSnapType: "x mandatory"
            }}
          >
            {otherCards.map(({ name, icon, progress }) => (
              <Card
                key={name}
                sx={{
                  p: 2,
                  textAlign: "center",
                  position: "relative",
                  bgcolor: darkMode ? "#1e1e1e" : "white",
                  color: darkMode ? "white" : "black",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  minWidth: "200px",
                  flex: "0 0 auto",
                  scrollSnapAlign: "start",
                  "&:hover": { transform: "scale(1.05)", transition: "0.3s" }
                }}
              >
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={70}
                    thickness={7}
                    sx={{ 
                      color: darkMode ? "rgba(255, 77, 77, 0.2)" : "rgba(0, 122, 204, 0.2)",
                      position: "absolute",
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round'
                      }
                    }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={70}
                    thickness={7}
                    sx={{ 
                      color: darkMode ? "#ff4d4d" : "#007acc",
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round'
                      }
                    }}
                  />
                  <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    {icon}
                  </Box>
                </Box>
                <Typography variant="h6" sx={{ mt: 1 }}>{progress}%</Typography>
                <Typography variant="caption" sx={{ fontSize: 14, fontWeight: "bold" }}>{name}</Typography>
                <IconButton 
                  sx={{ 
                    position: "absolute", 
                    bottom: 5, 
                    right: 5, 
                    color: darkMode ? "#ff4d4d" : "#007acc",
                    "&:hover": {
                      bgcolor: darkMode ? "rgba(255,77,77,0.1)" : "rgba(0,122,204,0.1)"
                    }
                  }}
                >
                  <Add />
                </IconButton>
              </Card>
            ))}
          </Box>

          <IconButton 
            onClick={() => scrollOneCard('right')}
            sx={{ 
              position: "absolute",
              right: 0,
              zIndex: 2,
              color: darkMode ? "white" : "black",
              bgcolor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
              "&:hover": {
                bgcolor: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"
              }
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}