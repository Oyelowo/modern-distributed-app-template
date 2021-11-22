import { css } from "@emotion/core";
import * as d3 from "d3";
import React, { StrictMode, useEffect, useState } from "react";

import { animated, useSpring } from "@react-spring/web";
import { RecoilRoot } from "recoil";
import LineChart from "./LineChart/LineChart";
import { useStuff } from "./recoil/Somethings";
import VoronoiHoverTracker from "./Voronoi/Voronoi";
import styled from "@emotion/styled";

const Divi = styled.div({
  background: "green",
  color: "white",
  padding: 10,
});

const MyD3Charts = (): JSX.Element => {
  return (
    <StrictMode>
      <RecoilRoot>
        <div
          style={{
            display: "grid",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <p
            css={css({
              color: "blue",
            })}
          >
            this
          </p>
          <Divi>Tool tip hovering with Voronoi Polygon</Divi>
          <VoronoiHoverTracker />
          <SpringPlay />
  {/*         <Somethings />
          <Gesture />
          <Spring />
          <Chart /> */}
          <br />
          <br />
          <br />
          <br />
          <br />
          <RandomCompo />
          <LineChart />
        </div>
      </RecoilRoot>
    </StrictMode>
  );
};

export default MyD3Charts;

export const SpringPlay = () => {
  const p = d3.line()([
    [10, 60],
    [40, 90],
    [60, 10],
    [190, 10],
  ]);
  const props = useSpring({
    testNumber: 1,
    from: { testNumber: 0 },
    config: { mass: 10, tension: 50, friction: 50, clamp: true },
  });
  console.log("fef", p, props);
  const { someX } = useSpring({
    someX: 400,
    from: { someX: 0 },
    // config: { mass: 10, tension: 50, friction: 50, },
  });
  return (
    /*  <animated.div>
      {props.testNumber.interpolate((val) => val.toFixed(2))}

     
    </animated.div> */
    <animated.svg stroke="red" fill="none">
      <path d={String(p)} strokeDashoffset={someX.to(val => val.toFixed(0)).get()} strokeDasharray={400} />
    </animated.svg>
  );
};

export const RandomCompo = () => {
  const [value, setValue] = useState("");
  const { addName } = useStuff(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const addSome = () => {
    addName();
    setValue("");
  };

  useEffect(() => {
    const click = (e: KeyboardEvent) => {
      switch (e.key) {
        case "enter":
          addSome();
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", click);
    return () => {
      document.removeEventListener("keydown", click);
    };
  });

  console.log("renders");
  return (
    <div>
      <input type="text" value={value} onChange={handleChange} name="" id="" />
      <button onClick={addSome}>Add name</button>
    </div>
  );
};

export const useEvent = (event: DocumentEventMap) => {};
