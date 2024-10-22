// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, MantineProvider } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { AnimatePresence } from 'framer-motion';

const theme = createTheme({
  primaryColor: 'blue',
});

export default function App({ Component, pageProps }: AppProps) {
  const { height, width } = useViewportSize();

  return (
    <MantineProvider theme={theme}>
      <AnimatePresence
        mode='wait'
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps}
          height={height}
          width={width}
        />
      </AnimatePresence>
    </MantineProvider>
  )
}
