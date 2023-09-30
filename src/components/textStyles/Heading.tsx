import { Text as ChakraText, TextProps } from "@chakra-ui/react";

export default ({ children, ...props }: TextProps) =>
    <ChakraText fontFamily="heading" {...props}>{children}</ChakraText>

