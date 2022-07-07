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
import { Data, ToggleContext, useToggleContext } from "./Popup";

export type PopoverProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  // item?: ReactNode;
  hover?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
};
// & { ref: React.RefObject<HTMLElement> };

/**
* The Popover component is used to contain the popup listbox for the Select. 
* It can be shared between many other components, including ComboBox, Menu, Dialog, and others. See useOverlayTrigger for more examples of popovers.
*/
export const Popover = forwardRef<HTMLElement, PopoverProps>(
  ({ title, children, isOpen, onClose, ...otherProps }, ref) => {
    // Handle interacting outside the dialog and pressing
    // the Escape key to close the modal.
    let { overlayProps } = useOverlay(
      {
        onClose,
        isOpen,
        isDismissable: true,
      },
      ref as RefObject<HTMLElement>
    );

    // Hide content outside the modal from screen readers.
    let { modalProps } = useModal();

    // Get props for the dialog and its title
    let { dialogProps, titleProps } = useDialog({}, ref as Parameters<typeof useDialog>[1]);

    return (
      <FocusScope restoreFocus>
        <div
          {...mergeProps(overlayProps, dialogProps, otherProps, modalProps)}
          ref={ref as RefObject<HTMLDivElement>}
        >
          {/* <h3 {...titleProps} style={{ marginTop: 0 }}>
            {title}
          </h3> */}
          {children}
          <DismissButton onDismiss={onClose} />
        </div>
      </FocusScope>
    );
  }
);
