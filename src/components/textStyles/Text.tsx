import { Text as ChakraText, TextProps } from '@chakra-ui/react';

export default function Text({ children, ...props }: TextProps) {
	return (
		<ChakraText fontFamily="text" {...props}>
			{children}
		</ChakraText>
	);
}
