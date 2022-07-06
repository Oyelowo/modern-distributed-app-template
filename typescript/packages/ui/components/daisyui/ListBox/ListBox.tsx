import { useListBox, useOption } from "@react-aria/listbox";
import { useListState, ListState } from "@react-stately/list";
import { Item } from "@react-stately/collections";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { DetailedHTMLProps, HTMLAttributes, RefObject, useRef } from "react";

// function ListBox(props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
type UseListStateProps = Parameters<typeof useListState>[0];
interface Props extends UseListStateProps {
  label: string;
}

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
function Option({ item, state }: { item: any; state: ListState<object> }) {
  // Get props for the option element
  let ref = useRef<HTMLLIElement>(null);
  let { optionProps, isSelected, isDisabled } = useOption({ key: item.key }, state, ref);

  // Determine whether we should show a keyboard
  // focus ring for accessibility
  let { isFocusVisible, focusProps } = useFocusRing();

  return (
    <li
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      style={{
        background: isSelected ? "blueviolet" : "transparent",
        color: isSelected ? "white" : "",
        padding: "2px 5px",
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



function List() {
  return (
    <ListBox label="Choose an option" selectionMode="single">
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </ListBox>
  );
}
