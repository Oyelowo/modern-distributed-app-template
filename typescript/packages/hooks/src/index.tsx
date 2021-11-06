interface Props {
  name: string;
}

// export const HelloWorld = ({ name }: Props) => {
//   return <div>Good day Mr Lowo {name}</div>;
// };
export const sayHello = ({ name }: Props) => "Hello buioi: " + name;
