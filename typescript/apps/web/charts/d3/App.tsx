import * as d3 from 'd3';
import { animated, useSpring } from '@react-spring/web';

export const SquareRoot = () => {
  const props = useSpring({
    testNumber: 1,
    from: { testNumber: 0 },
    config: { mass: 10, tension: 50, friction: 50, clamp: true },
  });
  const { someX } = useSpring({
    someX: 400,
    from: { someX: 0 },
    // config: { mass: 10, tension: 50, friction: 50, },
  });
  const p = d3.line()([
    [10, 60],
    [40, 90],
    [60, 10],
    [190, 10],
  ]);

  return (
    <>
      <animated.div>{props.testNumber.to((val) => val.toFixed(2))}</animated.div> */
      <animated.svg stroke="red" fill="none">
        <path
          d={String(p)}
          strokeDashoffset={someX.to((val) => val.toFixed(0)).get()}
          strokeDasharray={400}
        />
      </animated.svg>
    </>
  );
};
