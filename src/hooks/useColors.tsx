import { useColorModeValue } from '@chakra-ui/react';
import { colorConfig } from '../../theme.config';

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

	const border = useColorModeValue<string, string>(
		colorConfig.light.border,
		colorConfig.dark.border,
	);

	return {
		backgroundColorSecondary,
		backgroundColorPrimary,
		fontColor,
		border,
	};
}
