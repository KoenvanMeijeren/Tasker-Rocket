import { Text as ChakraText, TextProps } from "@chakra-ui/react";

export default ({ children, ...props }: TextProps) =>
    <ChakraText fontFamily="text" {...props}>{children}</ChakraText>

