import React from 'react'
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  flex: 1;
  padding: 16px;
  border: 2px dashed rgba(255, 215, 0, 0.56);
  color: rgba(128, 128, 0, 0.5);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.black + 50};
  border-radius: 18px;
  object-fit: cover;`;

const GeneratedImageCard = ({ src, loading }) => {
  return (
    <Container>
        {loading ? (
        <>
          <CircularProgress
            sx={{ color: "inherit", width: "24px", height: "24px" }}
          />
          Generating Your Image . . .
        </>
      ) : src ? (
        <Image src={src} />
      ) : (
        <>Write a prompt to generate image</>
      )}
    </Container>
  )
}

export default GeneratedImageCard
