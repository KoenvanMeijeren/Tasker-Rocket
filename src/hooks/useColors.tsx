import { useColorModeValue } from '@chakra-ui/react';
import { Colors } from '../../theme.config';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';

export function useModeColors() {
	const backgroundColorSecondary = useColorModeValue<string, string>(
		colorConfig.light.backgroundSecondary,
		colorConfig.dark.backgroundSecondary,
	);

	const backgroundColorPrimary = useColorModeValue<string, string>(
		colorConfig.light.backgroundPrimary,
		colorConfig.dark.backgroundPrimary,
	);
	const fontColor = useColorModeValue<string, string>(
		colorConfig.light.font,
		colorConfig.dark.font,
	);

	const border = useColorModeValue(Colors.light.border, Colors.dark.border);
	const codeMirror = useColorModeValue(githubLight, githubDark);


	return { backgroundColorSecondary, backgroundColorPrimary, fontColor, border, codeMirror };
}
