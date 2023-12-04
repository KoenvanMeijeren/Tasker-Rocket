import { useModeColors } from '@/hooks/useModeColors';
import { GitHubTreeItem } from '@/types/gitHubData';
import { Card, CardBody } from '@chakra-ui/card';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Collapse, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import { colorConfig } from '../../theme.config';
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
    const { backgroundColorSecondary, backgroundColorPrimary, tint } =
        useModeColors();

    return (
        <Box
            backgroundColor={backgroundColorSecondary}
            boxShadow="0px 4px 10px -3px rgba(0, 0, 0, 0.07)"
            pos="sticky"
            px={6}
            py={1}
            top={0}
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
                    color={colorConfig.iconGrey}
                    transform={rotate}
                    transition="all 0.2s linear"
                />
            </Box>

            {/* Content */}
            <Collapse in={isOpen}>
                <Box
                    css={{
                        '&::-webkit-scrollbar': {
                            height: '6px',
                            width: '10%',
                        },

                        '&::-webkit-scrollbar-thumb': {
                            background: tint,
                            borderRadius: '24px',
                        },
                    }}
                    display="flex"
                    gap={4}
                    overflowX="auto"
                    py={3}
                >
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
