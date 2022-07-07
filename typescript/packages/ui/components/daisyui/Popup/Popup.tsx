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
import { useMount, useEffectOnce, useUpdateEffect } from "react-use";
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
import { Data, ToggleContext, useToggleContext } from "./context";
import { Trigger } from "./Trigger";
import { Content } from "./Content";

export function Popup(
  props: ComponentProps<typeof OverlayProvider> & { onOpen?: (isOpen: boolean) => void }
) {
  let overlayTriggerState = useOverlayTriggerState({});
  let triggerRef: MutableRefObject<null> = useRef() as MutableRefObject<null>;
  let overlayRef = useRef(null);
  let overlayTrigger = useOverlayTrigger({ type: "dialog" }, overlayTriggerState, triggerRef);

  useUpdateEffect(() => {
    props?.onOpen?.(overlayTriggerState.isOpen);
  }, [overlayTriggerState.isOpen]);

  const data = useMemo<Data>(
    () => ({
      overlayTriggerState,
      triggerRef,
      overlayRef,
      overlayTrigger,
    }),
    [overlayTriggerState, triggerRef, overlayRef, overlayTrigger]
  );

  // Get props for the trigger and overlay. This also handles
  // hiding the overlay when a parent element of the trigger scrolls
  // (which invalidates the popover positioning).
  return (
    <ToggleContext.Provider value={data}>
      {/* 
        Application must be wrapped in an OverlayProvider so that it can be
        hidden from screen readers when an overlay opens.
        */}
      <OverlayProvider>{props.children}</OverlayProvider>
    </ToggleContext.Provider>
  );
}

Popup.Trigger = Trigger;
Popup.Content = Content;
