import "react";

/* lets inline styles set CSS custom properties, e.g. style={{ "--c": "#17BEBB" }} */
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
