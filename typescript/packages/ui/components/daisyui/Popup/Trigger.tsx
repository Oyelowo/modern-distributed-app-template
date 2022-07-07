import { useOverlayTriggerState } from "@react-stately/overlays";
import {
  DismissButton,
  OverlayContainer,
  OverlayProvider,
  OverlayTriggerAria,
  useModal,
  useOverlay,
  useOverlayPosition,
  useOverlayTrigger,
} from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { useButton } from "@react-aria/button";
import { mergeProps } from "@react-aria/utils";
import { atom, useAtom, Provider, useSetAtom, useAtomValue } from "jotai";
import { useMount, useEffectOnce } from "react-use";
import {
  ButtonHTMLAttributes,
  ComponentProps,
  createContext,
  DetailedHTMLProps,
  ElementRef,
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  MutableRefObject,
  RefAttributes,
  RefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useToggleContext } from "./Popup";
import { Button, ButtonProps } from "../button/button";

// type TriggerProps = ComponentProps<typeof button>;
export function Trigger(props: ButtonProps) {
  const { triggerRef, overlayRef, overlayTriggerState, overlayTrigger } = useToggleContext();

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // popover closes.
  let { buttonProps } = useButton(
    {
      onPress: () => overlayTriggerState?.open(),
    },
    triggerRef
  );
  return (
    <Button
      {...buttonProps}
      {...overlayTrigger?.triggerProps}
      className={props.className ?? ["btn-accent"]}
      ref={triggerRef as RefObject<HTMLButtonElement>}
    >
      {props.children}
    </Button>
  );
}
