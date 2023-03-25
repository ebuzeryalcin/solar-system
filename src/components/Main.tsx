import styled from "styled-components";
import Hero from "./Hero";
import Planets from "./Planets";
import mainBg from "../assets/bg.jpeg";

const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: white;
  background: url(${mainBg});
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  /* Media queries for responsiveness */
  @media (max-width: 768px) {
    height: unset;
  }

  @media (max-width: 576px) {
    background-size: cover;
  }
`;

const Main = () => {
  return (
    <Container>
      <Hero />
      <Planets />
    </Container>
  );
};

export default Main;
