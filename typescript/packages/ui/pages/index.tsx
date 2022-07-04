import { createElement } from "react";
import { setup } from "goober";

export const ButtonBoop = () => {
  return <button>Boop</button>;
};

export function getLowo() {
  return "Oyelowo L'uomo Universale!";
}

setup(createElement);

// export {Button, TextField, CardTailWindExample} from "./components"
// export * from "../components/CardTailWindExample";
// export * from "../components/HelloWorld";
// export * from "../components/TextField";
// export * from "../components/Page";
export * from "../components/Button";
export * from "../hooks/useInterval";
