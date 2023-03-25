import React, { useEffect, useState, useMemo } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removePlanet } from "../redux/planets/planetsSlice";
import terre from "../assets/worldwide.png";
import venus from "../assets/venus.png";
import mars from "../assets/mars.png";
import mercure from "../assets/mercury.png";
import saturne from "../assets/saturn.png";
import neptune from "../assets/neptune.png";
import jupiter from "../assets/jupiter.png";
import uranus from "../assets/uranus.png";
import { getMoonsDataX } from "../utils/api";
import { Moon, Mission } from "../redux/planets/types";
import styled from "styled-components";
import mainBg from "../assets/bg.jpeg";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  background: url(${mainBg});
`;

const ContainerTop = styled.div`
  height: 100vh;
  flex-grow: 2;
  color: pink;
`;

const ContainerBottom = styled.div`
  padding: 5rem;
  flex-grow: 1;
  color: white;
`;

const ButtonBack = styled.button`
  width: 3rem;
  margin-top: 2rem;
  margin-left: 2rem;
  padding: 10px;
  background-color: #3c005a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const Img = styled.img`
  width: 30rem;
  height: 30rem;
  object-fit: contain;
  position: absolute;
  top: 4rem;
  bottom: 0;
  left: 25rem;
  right: 0;
  margin: auto;
  animation: animate 2s infinite ease alternate;

  @media only screen and (max-width: 768px) {
    width: 15rem;
    height: 15rem;
  }

  @keyframes animate {
    to {
      transform: translateY(20px);
    }
  }
`;

const MoonName = styled.h1`
  width: 30rem;
  height: 30rem;
  font-size: 5rem;
  object-fit: contain;
  position: absolute;
  top: 27rem;
  bottom: 0;
  left: -30rem;
  right: 0;
  margin: auto;

  @media only screen and (max-width: 768px) {
    width: 15rem;
    height: 15rem;
  }

  @keyframes animate {
    to {
      transform: translateY(20px);
    }
  }
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

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #ddd;
  }

  tbody tr {
    &:nth-child(even) {
      background-color: #f2f2f2;
    }

    &:hover {
      background-color: #ddd;
    }
  }
`;

const TableTh = styled.th`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #4b0082;
  color: white;
`;
const TableTd = styled.td`
  padding: 8px;
  background-color: #3c005a;
  text-align: center;
`;

const MoonsNumber = styled.div`
  text-align: Left;
  font-size: 2rem;
`;

interface RootState {
  planets: {
    planets: Mission[];
  };
}

const ids: Record<string, string> = {
  terre,
  venus,
  uranus,
  mars,
  mercure,
  saturne,
  neptune,
  jupiter,
};

const Details: React.FC = () => {
  const planets = useSelector((state: RootState) => state.planets.planets);
  const dispatch = useDispatch();

  const [moons, setMoons] = useState<Moon[]>([]);

  const reservedMissions = useMemo(() => {
    return planets.filter((mission) => mission.details);
  }, [planets]);

  useEffect(() => {
    const fetchMoons = async () => {
      const planetID = reservedMissions[0].id;
      const moonsData = await getMoonsDataX(planetID);
      setMoons(moonsData);
    };
    fetchMoons();
  }, [reservedMissions]);

  return (
    <>
      <Section>
        <ContainerTop>
          <div>
            {reservedMissions.length === 0 ? (
              <p>Loading...</p>
            ) : (
              <>
                <div>
                  <NavLink to="/" className="navLink">
                    <ButtonBack
                      onClick={() =>
                        dispatch(removePlanet(reservedMissions[0].id))
                      }
                    >
                      &#60;
                    </ButtonBack>
                  </NavLink>
                  <div>
                    {planets && (
                      <div>
                        {reservedMissions.map((mission) => (
                          <div key={mission.id}>
                            <>
                              <div>
                                {mission.id && <Img src={ids[mission.id]} />}
                                <div>
                                  <Left>
                                    <MoonName>{mission.name}</MoonName>
                                  </Left>
                                </div>
                              </div>
                            </>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </ContainerTop>
        <ContainerBottom>
          <div>
            <div>
              {planets && (
                <div>
                  {reservedMissions.map((mission) => (
                    <div key={mission.id}>
                      <>
                        <div>
                          <MoonsNumber>
                            {mission.moons !== null ? mission.moons.length : 0}{" "}
                            Moons
                          </MoonsNumber>
                          {mission.moons === null ? (
                            <div>
                              <p>No moons</p>
                            </div>
                          ) : (
                            <Table>
                              <tbody>
                                <tr>
                                  <TableTh>Moons</TableTh>
                                  <TableTh>Gravity</TableTh>
                                  <TableTh>Density</TableTh>
                                </tr>
                                {moons.map((moon) => (
                                  <tr key={nanoid()}>
                                    <TableTd>{moon.name}</TableTd>
                                    <TableTd>{moon.gravity}</TableTd>
                                    <TableTd>{moon.density}</TableTd>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          )}
                        </div>
                      </>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ContainerBottom>
      </Section>
    </>
  );
};

export default Details;
