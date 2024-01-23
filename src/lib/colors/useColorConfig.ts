import { useColorMode } from '@chakra-ui/react';
import { ColorConfig, colorConfig } from '../../../theme.config';

export const useColorConfig = (): ColorConfig => {
    const theme = useColorMode();

    if (theme.colorMode === 'dark') {
        return colorConfig.dark;
    }

    return colorConfig.light;
};
