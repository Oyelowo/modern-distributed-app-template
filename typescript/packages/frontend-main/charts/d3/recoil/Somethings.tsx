import React from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const Somethings = () => {
  console.log("render somethings");
  const names = useRecoilValue(stuffState);
  return (
    <div>
      {names.map((name, i) => {
        return <div key={i}>{name}</div>;
      })}
    </div>
  );
};

export default Somethings;

export const stuffState = atom<string[]>({
  key: "stuff",
  default: [],
});

export const useStuff = (value: string) => {
  const setStuff = useSetRecoilState(stuffState);

  const addName = () => {
    setStuff((prev) => [...prev, value]);
  };
  return {
    addName,
  };
};
