import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ToastContext } from "./toast";

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState("");
  const [on, setOn] = useState(false);
  const hide = useRef(0);

  const toast = useCallback((text: string) => {
    setMsg(text);
    setOn(true);
    clearTimeout(hide.current);
    hide.current = window.setTimeout(() => setOn(false), 2200);
  }, []);
  useEffect(() => () => clearTimeout(hide.current), []);

  return (
    <ToastContext value={toast}>
      {children}
      <div className={`toast${on ? " is-on" : ""}`} role="status">{msg}</div>
    </ToastContext>
  );
}
