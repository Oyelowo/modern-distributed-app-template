import React, { FC, ReactElement } from "react";
import { queries, render, RenderOptions } from "@testing-library/react";
import * as customQueries from "./custom-queries";

const AllTheProviders: FC = ({ children }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) =>
  render(ui, {
    wrapper: AllTheProviders,
    queries: { ...queries, ...customQueries },
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };

/*     // You can then use your custom queries as you would any other query:

const {getByDataCy} = render(<div />)

expect(getByDataCy('my-component')).toHaveTextContent('Hello') */
