import { useColorModeValue } from '@chakra-ui/react';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import { colorConfig } from '../../theme.config';

export function useModeColors() {
    const backgroundColorSecondary = useColorModeValue(
        colorConfig.light.backgroundSecondary,
        colorConfig.dark.backgroundSecondary
    );

    const backgroundColorPrimary = useColorModeValue(
        colorConfig.light.backgroundPrimary,
        colorConfig.dark.backgroundPrimary
    );
    const fontColor = useColorModeValue(
        colorConfig.light.font,
        colorConfig.dark.font
    );

    const border = useColorModeValue(
        colorConfig.light.border,
        colorConfig.dark.border
    );
    const codeMirror = useColorModeValue(githubLight, githubDark);
    const menuBackground = useColorModeValue(
        colorConfig.light.menuBackground,
        colorConfig.dark.menuBackground
    );

    const title = useColorModeValue(
        colorConfig.light.title,
        colorConfig.dark.title
    );

    const tint = useColorModeValue(
        colorConfig.light.tint,
        colorConfig.dark.tint
    );
    const hoverBackground = useColorModeValue(
        colorConfig.light.hoverBackground,
        colorConfig.dark.hoverBackground
    );

    return {
        backgroundColorSecondary,
        backgroundColorPrimary,
        fontColor,
        border,
        codeMirror,
        menuBackground,
        title,
        tint,
        hoverBackground,
    };
}
