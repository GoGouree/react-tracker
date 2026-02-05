// src/components/Navbar.tsx
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.25rem;
`;

const Links = styled.ul`
  display: flex;
  gap: 1.5rem;
  list-style: none;

  @media (max-width: 768px) {
    flex-direction: column;
    display: none; /* later toggle with state */
  }
`;

export const Navbar = () => (
  <Nav>
    <Logo>MyApp</Logo>
    <Links>
      <li><a href="#features">Features</a></li>
      <li><a href="#pricing">Pricing</a></li>
      <li><a href="#contact">Contact</a></li>
    </Links>
  </Nav>
);