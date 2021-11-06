"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.greetMe = void 0;
const hooks_1 = require("@oyelowo/hooks");
// export const HelloWorld = ({ name }: Props) => {
//   return <div>Good day Mr Lowo {name}</div>;
// };
const greetMe = () => {
    const k = (0, hooks_1.sayHello)();
    return "rerere";
};
exports.greetMe = greetMe;
