import { Box, Button, Show, Spacer, useColorMode, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useState } from 'react';
// import { FoldersSection } from '../FoldersSection';

export function DesktopHeader() {
	const { colorMode, toggleColorMode } = useColorMode();
	// const [inputValue, setInputValue] = useState('');

	// const handleChange = (e) => {
	// 	setInputValue(e.target.value);
	// };	  

	return (
		<Show above="md">
			{/* <InputGroup>
				<InputLeftElement
					className="InputLeft"
					pointerEvents="none"
					children={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>}
				/>
				<Input onChange={handleChange} className="Input" variant="outline" placeholder="Search" />
			</InputGroup> */}
			{/* <FoldersSection filterValue={inputValue} /> */}
			<Box p="2">
				<Breadcrumbs />
			</Box>
			<Spacer />
			<Button onClick={toggleColorMode}>
				{colorMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
			</Button>
		</Show>
	);
}
