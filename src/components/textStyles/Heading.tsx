import { Text as ChakraText, TextProps } from '@chakra-ui/react';

export default function Heading({ children, ...props }: TextProps) {
    return (
        <ChakraText fontFamily="heading" {...props}>
            {children}
        </ChakraText>
    );
}
