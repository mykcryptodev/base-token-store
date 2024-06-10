import { type ReactNode,useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode
}

export const Portal = (props: PortalProps) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  
  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal")
    setMounted(true)
  }, []);

  return (mounted && ref.current) ? createPortal(<div>{props.children}</div>, ref.current) : null
}