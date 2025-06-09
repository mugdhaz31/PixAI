import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from './utils/Themes';
import Home from "./pages/Home.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Navbar from "./components/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from './styles/GlobalStyle'; // Import global styles

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 3;
`;

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle /> 
      <Container>
        <Wrapper>
          <BrowserRouter>
            <Navbar toggleTheme={toggleTheme} theme={theme} />
            <Routes>
              <Route path="/" element={<Home />} exact />
              <Route path="/post" element={<CreatePost />} exact />
            </Routes>
          </BrowserRouter>
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
