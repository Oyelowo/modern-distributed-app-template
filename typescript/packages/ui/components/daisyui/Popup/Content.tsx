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
import { useToggleContext } from "./context";
import { Popover } from "./Popover";

type ContentProps = ComponentProps<typeof OverlayContainer>;
type ContentRef = React.ElementRef<typeof OverlayContainer>;
// children: ReactElement < SelectOptionProps < T >> [];

export const Content = forwardRef<ContentRef, ContentProps>((props, ref) => {
  const { triggerRef, overlayRef, overlayTriggerState, overlayTrigger } = useToggleContext();
  console.log("overlayTriggerState", overlayTriggerState);
  // Get popover positioning props relative to the trigger
  let { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: "top right",
    offset: 5,
    isOpen: overlayTriggerState.isOpen,
  });

  return (
    <>
      {overlayTriggerState.isOpen && (
        <OverlayContainer>
          <Popover
            {...overlayTrigger}
            {...positionProps}
            ref={overlayRef}
            title="Popover title"
            isOpen={overlayTriggerState.isOpen}
            onClose={overlayTriggerState.close}
            {...props}
          >
            This is the content of the popover.
          </Popover>
        </OverlayContainer>
      )}
    </>
  );
});
