import { useModeColors } from '@/hooks/useColors';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { Card, CardBody } from '@chakra-ui/card';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Collapse, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import Heading from './textStyles/Heading';
import Text from './textStyles/Text';

export const FoldersSection = ({
	data,
	label,
}: {
	data: GitHubTreeItem[];
	label: string;
}) => {
	const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
	const rotate = isOpen ? 'rotate(-180deg)' : 'rotate(0)';
	const { backgroundColorSecondary, backgroundColorPrimary, fontColor } =
		useModeColors();

	if (!data || data.length <= 0) {
		return null;
	}

	return (
		<Box
			backgroundColor={backgroundColorSecondary}
			boxShadow="0px 4px 10px -3px rgba(0, 0, 0, 0.07)"
			px={6}
			py={1}
			transition="background-color 0.5s ease"
			zIndex={2}
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

			{/* Content */}
			<Collapse in={isOpen} onClick={onToggle}>
				<Box display="flex" gap={4} overflowX="auto" py={3}>
					{data.map((item: GitHubTreeItem) => {
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
