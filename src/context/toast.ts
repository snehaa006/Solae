import { createContext, use } from "react";

export const ToastContext = createContext<(msg: string) => void>(() => {});

/** show a short message in the pill at the bottom of the screen */
export const useToast = () => use(ToastContext);
