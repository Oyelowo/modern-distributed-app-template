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

export interface Data {
  overlayTriggerState: ReturnType<typeof useOverlayTriggerState>;
  triggerRef: RefObject<HTMLElement>;
  overlayRef: RefObject<HTMLElement>;
  overlayTrigger: OverlayTriggerAria;
}

export const ToggleContext = createContext<Data | undefined>(undefined);

export function useToggleContext() {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error(`Toggle compound components cannot be rendered outside the Toggle component`);
  }
  return context;
}
