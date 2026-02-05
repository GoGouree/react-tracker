// src/components/Hero.tsx
import styled from "styled-components";

type HeroProps = {
  bgColor?: string;
};

const HeroSection = styled.section<HeroProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: ${({ bgColor }) => bgColor || "#f5f5f5"};

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: #eeafe3;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #ee5ee7;
  }
`;

export const Hero = () => (
  <HeroSection bgColor="#e0f7fa">
    <HeroTitle>Welcome to MyApp</HeroTitle>
    <p>Build scalable apps with ease.</p>
    <HeroButton>Get Started</HeroButton>
  </HeroSection>
);