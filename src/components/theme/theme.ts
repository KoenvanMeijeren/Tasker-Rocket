import { extendTheme, theme as base } from '@chakra-ui/react';

const fonts = {
	heading: `'Satoshi Bold', ${base.fonts?.heading}, sans-serif`,
	text: `'Satoshi Regular', ${base.fonts?.heading}, sans-serif`,
};

const theme = extendTheme({ fonts });

export default theme;
