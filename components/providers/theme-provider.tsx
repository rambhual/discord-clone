"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

/**
 * A React component that wraps the `ThemeProvider` component from the `next-themes` library.
 * It handles the initialization of the client and renders the `ThemeProvider` component once the client is ready.
 *
 * @param children - The child components to be rendered within the `ThemeProvider`.
 * @param props - Additional props that can be passed to the underlying `ThemeProvider` component from the `next-themes` library.
 * @returns The rendered `ThemeProvider` component from the `next-themes` library, with the `props` and `children` passed to it.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [client, setClient] = React.useState(false);

  React.useEffect(() => {
    setClient(true);
  }, []);

  return client ? <NextThemesProvider {...props}>{children}</NextThemesProvider> : null;
}
