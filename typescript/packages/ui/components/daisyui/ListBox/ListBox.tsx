import { useListBox, useOption } from "@react-aria/listbox";
import { useListState, ListState } from "@react-stately/list";
import { Item } from "@react-stately/collections";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { DetailedHTMLProps, HTMLAttributes, ReactNode, RefObject, useRef } from "react";

// function ListBox(props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
type UseListStateProps = Parameters<typeof useListState>[0];
interface Props extends UseListStateProps {
  label: string;
}

// type Km = Pick<ReturnType<typeof useListState>, "collection">["collection"];

/**
 * The ListBox and Option components are used to show the list of options.
 * They can also be shared with other components like a ComboBox. See useListBox for more examples, including sections and more complex items.
 */
function ListBox(props: Props) {
  // Create state based on the incoming props
  let state = useListState(props);
  // Get props for the listbox element
  let ref = useRef<HTMLUListElement>(null);
  let { listBoxProps, labelProps } = useListBox(props, state, ref);

  return (
    <>
      <div {...labelProps}>{props.label}</div>
      <ul
        {...listBoxProps}
        ref={ref}
        style={{
          padding: 0,
          margin: "5px 0",
          listStyle: "none",
          border: "1px solid gray",
          maxWidth: 250,
        }}
      >
        {[...state.collection].map((item) => (
          <Option key={item.key} item={item} state={state} />
        ))}
      </ul>
    </>
  );
}

// function Option({ item, state }: { item: Node<object> }) {
function Option({
  item,
  state,
}: {
  item: { rendered: ReactNode; key: string | number };
  state: ListState<object>;
}) {
  // Get props for the option element
  let ref = useRef<HTMLLIElement>(null);
  let { optionProps, isSelected, isDisabled, isFocused } = useOption({ key: item.key }, state, ref);

  // Determine whether we should show a keyboard
  // focus ring for accessibility
  let { isFocusVisible, focusProps } = useFocusRing();

  let backgroundColor;
  let color = "black";

  if (isSelected) {
    backgroundColor = "blueviolet";
    color = "white";
  } else if (isFocused) {
    backgroundColor = "gray";
  } else if (isDisabled) {
    backgroundColor = "transparent";
    color = "gray";
  }

  return (
    <li
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      style={{
        background: backgroundColor,
        color,
        padding: "2px 5px",
        cursor: "pointer",
        outline: isFocusVisible ? "2px solid orange" : "none",
      }}
    >
      {item.rendered}
    </li>
  );
}
export default ListBox;

// ListBox.Option = Option;
ListBox.Option = Item;

// export function Lister() {
//   return (
//     <ListBox label="Choose an option" selectionMode="single">
//       <Item>One</Item>
//       <Item>Two</Item>
//       <Item>Three</Item>
//     </ListBox>
//   );
// }
