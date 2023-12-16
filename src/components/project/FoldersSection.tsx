import { useModeColors } from '@/hooks/useModeColors';
import { GitHubTreeItem } from '@/types/gitHubData';
import { Card, CardBody } from '@chakra-ui/card';
import { CheckCircleIcon, ChevronDownIcon, Icon } from '@chakra-ui/icons';
import { Box, Collapse, Flex, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import { colorConfig } from '../../../theme.config';
import { FaFolderOpen } from 'react-icons/fa6';
import Heading from '../textStyles/Heading';
import Text from '../textStyles/Text';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { RiTodoFill } from 'react-icons/ri';
import { gitHubConfig } from '@/lib/repository/gitHubRepository';

type GitHubTreeFolder = {
    name: string;
    url: string;
    unique_key: string;
    path: string;
    completed: boolean;
};

type Props = {
    data: GitHubTreeItem[];
    label: string;
};

const FoldersSection = observer(({ data, label }: Props) => {
    const store = useStore();
    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
    const rotate = isOpen ? 'rotate(-180deg)' : 'rotate(0)';
    const { backgroundColorSecondary, backgroundColorPrimary, tint } =
        useModeColors();

    const [folders, setFolders] = useState<GitHubTreeFolder[]>([]);

    useEffect(() => {
        const repository = gitHubConfig.content_repository;
        const newFolders = data.map((item: GitHubTreeItem) => {
            return {
                name: item.name,
                url: item.url,
                unique_key: item.unique_key,
                path: item.path,
                completed: store.gitHubItems.isFolderCompleted(
                    repository,
                    item.unique_key ?? ''
                ),
            } as GitHubTreeFolder;
        });

        setFolders(newFolders);
    }, [data, store.gitHubItems]);

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
                    {folders.map((item: GitHubTreeFolder) => {
                        return (
                            <Link
                                href={`/${encodeURIComponent(item.path)}`}
                                key={item.url}
                                style={{ flexShrink: 0 }}
                            >
                                <Card backgroundColor={backgroundColorPrimary}>
                                    <CardBody py={3}>
                                        <Box
                                            alignItems="center"
                                            display="flex"
                                            gap="8px"
                                        >
                                            {item.completed ? (
                                                <CheckCircleIcon color="green" />
                                            ) : (
                                                <Icon
                                                    as={RiTodoFill}
                                                    color="blue"
                                                />
                                            )}
                                            <Text>
                                                <Flex align="center">
                                                    <FaFolderOpen />
                                                    <Text ml={1}>
                                                        {item.name}
                                                    </Text>
                                                </Flex>
                                            </Text>
                                        </Box>
                                    </CardBody>
                                </Card>
                            </Link>
                        );
                    })}
                </Box>
            </Collapse>
        </Box>
    );
});

FoldersSection.displayName = 'FoldersSection';
export default FoldersSection;
