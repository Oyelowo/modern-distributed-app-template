import { sayHello } from "@oyelowo/ui";

interface Props {
  name: string;
}

export const Hi = ({ name }: Props) => {
  return (
    <div>
      Hello {name}
      {/* <HelloWorld name="Guest" /> */}
      {sayHello()}
    </div>
  );
};
