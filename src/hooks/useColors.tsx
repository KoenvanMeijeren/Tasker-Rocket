import { useColorModeValue } from '@chakra-ui/react';
import { Colors } from '../../theme.config';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';

export function useModeColors() {
	const backgroundColorSecondary = useColorModeValue(
		Colors.light.backgroundSecondary,
		Colors.dark.backgroundSecondary
	);

	const backgroundColorPrimary = useColorModeValue(
		Colors.light.backgroundPrimary,
		Colors.dark.backgroundPrimary
	);
	const fontColor = useColorModeValue(Colors.light.font, Colors.dark.font);

	const border = useColorModeValue(Colors.light.border, Colors.dark.border);
	const codeMirror = useColorModeValue(githubLight, githubDark);


	return { backgroundColorSecondary, backgroundColorPrimary, fontColor, border, codeMirror };
}
