import { useColorModeValue } from '@chakra-ui/react';
import { Colors } from '../../theme.config';

export function useModeColors() {
	const backgroundColorSecondary: string = useColorModeValue(
		Colors.light.backgroundSecondary,
		Colors.dark.backgroundSecondary,
	);

	const backgroundColorPrimary: string = useColorModeValue(
		Colors.light.backgroundPrimary,
		Colors.dark.backgroundPrimary,
	);
	const fontColor: string = useColorModeValue(
		Colors.light.font,
		Colors.dark.font,
	);

	const border: string = useColorModeValue(
		Colors.light.border,
		Colors.dark.border,
	);

	return {
		backgroundColorSecondary,
		backgroundColorPrimary,
		fontColor,
		border,
	};
}
