import React from "react";
import styled from "styled-components";
import Button from "./buttons/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AddRounded, WebRounded, Brightness4 } from "@mui/icons-material";

const Container = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.menu_primary_text};
  font-weight: bold;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  @media only screen and (max-width: 600px) {
    padding: 10px 12px;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: bold;

  &:hover {
    opacity: 0.85;
  }
`;

const Navbar = ({ toggleTheme, theme }) => {
  const navigate = useNavigate();
  const location = useLocation();

  let path = location.pathname.split("/");

  const gotoCreatePost = () => {
    navigate("/post");
  };
  const gotoHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <Logo to="/">PixAI</Logo>
      <div style={{ display: "flex", alignItems: "center" }}>
        {path[1] === "post" ? (
          <Button
            text="Explore Posts"
            leftIcon={<WebRounded style={{ fontSize: "18px" }} />}
            onClick={gotoHome}
            type="secondary"
          />
        ) : (
          <Button
            text="Create new post"
            leftIcon={<AddRounded style={{ fontSize: "18px" }} />}
            onClick={gotoCreatePost}
          />
        )}
        <Brightness4 
          style={{ cursor: "pointer", marginLeft: "20px", fontSize: "28px" }}
          onClick={toggleTheme}
        />
      </div>
    </Container>
  );
};

export default Navbar;
