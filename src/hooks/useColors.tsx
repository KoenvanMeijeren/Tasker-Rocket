import { useColorModeValue } from '@chakra-ui/react';
import { Colors } from '../../theme.config';

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

	return { backgroundColorSecondary,backgroundColorPrimary, fontColor, border };
}
