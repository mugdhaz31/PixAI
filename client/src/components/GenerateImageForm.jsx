import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import Button from "./buttons/button";
import TextInput from './Input/TextInput';
import { CreatePost, GenerateImageFromPrompt } from '../api';

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;

const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Actions = styled.div`
  display: flex;
  flex: 1;
  gap: 8px;
`;

const GenerateImageForm = ({
    createPostLoading,
    setcreatePostLoading,
    generateImageLoading,
    setGenerateImageLoading,
    post,
    setPost,
}) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const generateImage = async () => {
        setGenerateImageLoading(true);
        setError("");
        await GenerateImageFromPrompt({ prompt: post.prompt })
            .then((res) => {
                setPost({
                    ...post,
                    photo: `data:image/jpeg;base64,${res?.data?.photo}`,
                });
                setGenerateImageLoading(false);
            })
            .catch((error) => {
                setError(error?.response?.data?.message);
                setGenerateImageLoading(false);
            });
    };
    const createPost = async () => {
        setcreatePostLoading(true);
        setError("");
        await CreatePost(post)
            .then((res) => {
                navigate("/");
                setcreatePostLoading(false);
                console.log("Creating post with data:", post);
            })
            .catch((error) => {
                setError(error?.response?.data?.message);
                setcreatePostLoading(false);
            });
    };
    return (

        <Form>
            <Top>
                <Title>Create Stunning Images with Your Imagination</Title>
                <Desc>
                    Describe the image you envision — our AI will bring it to life for the community!
                </Desc>

            </Top>
            <Body>
                <TextInput
                    label="Author"
                    placeholder="Enter your name"
                    name="name"
                    value={post.name}
                    handelChange={(e) => setPost({ ...post, name: e.target.value })}
                />
                <TextInput
                    label="Image Prompt"
                    placeholder="Write a detailed prompt about the image"
                    name="prompt"
                    textArea
                    rows="8"
                    value={post.prompt}
                    handelChange={(e) => setPost({ ...post, prompt: e.target.value })}
                />
                 {error && <div style={{ color: "red" }}>{error}</div>}
                <Desc>Showcase your AI-generated image in the community!</Desc>
            </Body>
            <Actions>
                <Button
                    text="Generate Image"
                    leftIcon={<AutoAwesome />}
                    flex
                    isLoading={generateImageLoading}
                    isDisabled={post.prompt === ""}
                    onClick={(e) => generateImage()}
                />
                <Button
                    text="Post Image"
                    leftIcon={<CreateRounded />}
                    type="secondary"
                    flex
                    isDisabled={
                        post.name === "" || post.photo === "" || post.prompt === ""
                    }
                    isLoading={createPostLoading}
                    onClick={() => createPost()}
                />
            </Actions>
        </Form>
    )
}

export default GenerateImageForm
