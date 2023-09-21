import { useColorModeValue } from '@chakra-ui/react';
import { Colors } from '../../theme.config';

export function useColors() {
	const backgroundColor = useColorModeValue(
		Colors.light.backgroundSecondary,
		Colors.dark.backgroundSecondary
	);
	const fontColor = useColorModeValue(Colors.light.font, Colors.dark.font);

	return { backgroundColor, fontColor };
}
