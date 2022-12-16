import React from "react";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 6px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Container = styled.div`
  display: none;
  align-items: center;
  gap: 30px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  justify-content: space-around;

  @media (max-width: 768px) {
    display: flex;
  }
`;
const Mobile = ({ darkMode, setDarkMode }) => {
  return (
    <Container>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Item>
          <HomeIcon />
          Home
        </Item>
      </Link>
      <Link to="/subs" style={{ textDecoration: "none", color: "inherit" }}>
        <Item>
          <SubscriptionsOutlinedIcon />
          Subscriptions
        </Item>
      </Link>
      <Link to="/random" style={{ textDecoration: "none", color: "inherit" }}>
        <Item>
          <ExploreOutlinedIcon />
          Explore
        </Item>
      </Link>
      <Item onClick={() => setDarkMode(!darkMode)}>
        <SettingsBrightnessOutlinedIcon />
      </Item>
    </Container>
  );
};

export default Mobile;
