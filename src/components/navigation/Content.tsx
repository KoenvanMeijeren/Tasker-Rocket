import { useModeColors } from '@/hooks/useModeColors';
import { Box } from '@chakra-ui/layout';
import type { AppProps } from 'next/app';
import { Header } from './Header';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Content = ({ Component, ...pageProps }: AppProps) => {
    const { backgroundColorPrimary } = useModeColors();
    return (
        <Box
            backgroundColor={backgroundColorPrimary}
            height="100%"
            overflow="auto"
            width="100%"
        >
            <Header />

            {/* content */}
            <Component {...pageProps} />
        </Box>
    );
};
