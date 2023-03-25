import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Planet } from "../redux/planets/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { showPlanet } from "../redux/planets/planetsSlice";
import earth from "../assets/worldwide.png";
import venus from "../assets/venus.png";
import mars from "../assets/mars.png";
import mercury from "../assets/mercury.png";
import saturn from "../assets/saturn.png";
import neptune from "../assets/neptune.png";
import jupiter from "../assets/jupiter.png";
import uranus from "../assets/uranus.png";
import Filter from './Filter';

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
  position: relative;
  color: black;
  font-size: 14px;
  font-weight: 300;
`;

const Container = styled.div`
  margin-top: 6rem;
  width: 75rem;
  height: 35rem;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;
const MainPlanets = styled.div`
  position: relative;
  top: 0;
  left: 0;
  color: pink;
  width: 0px;
  white-space: nowrap;
`;

const TextPlanet = styled.div`
  font-size: 30px;
  line-height: 3.5rem;
  color: pink;
  a {
    border: 1px solid #fff;
  }
`;

const PlanetNum = styled.div`
  color: red;
`;

const NavLinkContainer = styled.div`
  text-decoration: none;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 768px) {
    padding: 20px;
    justify-content: center;
  }
`;

const List = styled.ul`
  list-style: none;
  display: block;
  flex-direction: column;
  gap: 20px;
`;

const ListItem = styled.li`
  font-size: 20px;
  line-height: 1rem;
  font-weight: bold;
  cursor: pointer;
  color: transparent;
  -webkit-text-stroke: 1px white;
  position: relative;

  @media only screen and (max-width: 768px) {
    font-size: 24px;
    color: white;
    -webkit-text-stroke: 0px;
  }

  ::after {
    position: absolute;
    top: 0;
    left: 0;
    color: pink;
    width: 0px;
    overflow: hidden;
    white-space: nowrap;
  }

  &:hover {
    ::after {
      animation: moveText 0.5s linear both;

      @keyframes moveText {
        to {
          width: 100%;
        }
      }
    }
  }
`;

const Right = styled.div`
  flex: 1;
`;
const ButtonSortByMoons = styled.button`
  width: 2wv;
  padding: 1rem;
  background-color: #da4ea2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 2px;
`;
const FilterButton = styled.button`
  width: 1wv;
  padding-right: 1rem;
  padding-left: 1rem;
  padding-top: .83rem;
  padding-bottom: .83rem;
  background-color: #da4ea2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: text;
  margin: 2px;
`;



const Planets: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");
  const dispatch = useDispatch();
  const planets = useSelector((state: RootState) => state.planets.planets);

  const filteredPlanets = planets
    .filter((planet: Planet) => {
      return (
        planet.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
      );
    })
    .sort((a: Planet, b: Planet) => {
      const moonsA = a.moons?.length ?? 0;
      const moonsB = b.moons?.length ?? 0;
      if (sortBy === "asc") {
          return moonsA - moonsB;
      } else {
          return moonsB - moonsA;
      }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleFilter = () => {
    console.log("Filter button clicked");
  };

  const handleSortByMoons = () => {
    setSortBy(sortBy === "asc" ? "desc" : "asc");
  };

  const FiltereadPlanets = () => {
    return (
      <>
        {filteredPlanets.map((planet) => (
          <NavLinkContainer>
            <NavLink
              key={planet.id}
              to="/Details"
              className="navLink"
              style={{ textDecoration: "none" }}
            >
              {planetData.map((data) => {
                if (planet.id === data.id) {
                  return (
                    <div key={data.id}>
                      <PlanetNum>
                        {planet.moons !== null ? planet.moons.length : 0}
                      </PlanetNum>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </NavLink>
          </NavLinkContainer>
        ))}
      </>
    );
  };

  const planetData = [
    { id: "uranus", name: "Uranus", image: uranus },
    { id: "terre", name: "Earth", image: earth },
    { id: "venus", name: "Venus", image: venus },
    { id: "mars", name: "Mars", image: mars },
    { id: "jupiter", name: "Jupiter", image: jupiter },
    { id: "neptune", name: "Neptune", image: neptune },
    { id: "saturne", name: "Saturn", image: saturn },
    { id: "mercure", name: "Mercury", image: mercury },
  ];
  return (
    <Section>
      <Container>
        <Left>
          <List>
            <ButtonSortByMoons type="button" onClick={handleSortByMoons}>
              {sortBy === "asc" ? "Moon (asc)" : "Moon (desc)"}
            </ButtonSortByMoons>
            <FilterButton>
                <Filter
                  searchInput={searchInput}
                  handleChange={handleChange}
                  handleFilter={handleFilter}
                /></FilterButton>
              {filteredPlanets.map((planet) => (
              <ListItem key={planet.id}>
                <NavLinkContainer>
                  <NavLink
                    key={planet.id}
                    to="/Details"
                    className="navLink"
                    style={{ textDecoration: "none" }}
                  >
                    {planetData.map((data) => {
                      if (planet.id === data.id) {
                        return (
                          <div key={data.id}>
                            <MainPlanets>
                              <TextPlanet
                                onClick={() => dispatch(showPlanet(planet.id))}
                              >
                                {data.name +
                                  " " +
                                  (planet.moons !== null
                                    ? planet.moons.length
                                    : 0)}
                              </TextPlanet>
                            </MainPlanets>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </NavLink>
                </NavLinkContainer>
            </ListItem>
              ))}
          </List>
        </Left>

        <Right>
        </Right>
      </Container>
    </Section>
  );
};

export default Planets;
