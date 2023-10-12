import { useModeColors } from '@/hooks/useColors';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { Card, CardBody } from '@chakra-ui/card';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Collapse, Input, InputGroup, InputLeftElement, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import Heading from './textStyles/Heading';
import Text from './textStyles/Text';
import { useState } from 'react';

export const FoldersSection = ({
	data,
	label,
}: {
	data: GitHubTreeItem[];
	label: string;
}) => {
	const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
	const rotate = isOpen ? 'rotate(-180deg)' : 'rotate(0)';

	const [inputValue, setInputValue] = useState('');
	const handleChange = (e) => {
		setInputValue(e.target.value);
	};	  
	const filteredData = data ? data.filter((item) => item.name.toLowerCase().includes(inputValue.toLocaleLowerCase())) : [];

	const { backgroundColorSecondary, backgroundColorPrimary, fontColor } =
		useModeColors();

	return (
		<Box
			backgroundColor={backgroundColorSecondary}
			boxShadow="0px 4px 10px -3px rgba(0, 0, 0, 0.07)"
			px={6}
			py={1}
			transition="background-color 0.5s ease"
		>
			{/* header -> collapsible */}
			<Box
				alignItems="center"
				cursor="pointer"
				display="flex"
				justifyContent="space-between"
				onClick={onToggle}
			>
				<Heading className="noselect">{label}</Heading>
				<ChevronDownIcon
					boxSize={10}
					color={fontColor}
					transform={rotate}
					transition="all 0.2s linear"
				/>
			</Box>
			<InputGroup>
				<InputLeftElement
					className="InputLeft"
					pointerEvents="none"
					children={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>}
				/>
				<Input onChange={handleChange} className="Input" variant="outline" placeholder="Search" />
			</InputGroup>

			{/* Content */}
			<Collapse in={isOpen}>
				<Box display="flex" gap={4} overflowX="auto" py={3}>
					{filteredData.map((item: GitHubTreeItem) => {
						return (
							<Link
								href={`/${encodeURIComponent(item.path)}`}
								key={item.url}
								style={{ flexShrink: 0 }}
							>
								<Card backgroundColor={backgroundColorPrimary}>
									<CardBody py={3}>
										<Text>{item.name}</Text>
									</CardBody>
								</Card>
							</Link>
						);
					})}
				</Box>
			</Collapse>
		</Box>
	);
};
