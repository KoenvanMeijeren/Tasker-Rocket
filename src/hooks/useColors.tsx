import { useColorModeValue } from '@chakra-ui/react';
import { Colors } from '../../theme.config';

export function useModeColors() {
	const backgroundColor = useColorModeValue(
		Colors.light.backgroundSecondary,
		Colors.dark.backgroundSecondary
	);
	const fontColor = useColorModeValue(Colors.light.font, Colors.dark.font);

	const border = useColorModeValue(Colors.light.border, Colors.dark.border);

	return { backgroundColor, fontColor, border };
}
