import { useModeColors } from '@/hooks/useColors';
import { GitHubTreeItem } from '@/types/gitHubData';
import { Card, CardBody } from '@chakra-ui/card';
import { CheckCircleIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Collapse, Icon, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import Heading from '../textStyles/Heading';
import Text from '../textStyles/Text';
import { useEffect, useState } from 'react';
import { RiTodoFill } from 'react-icons/ri';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/lib/store';

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
    const { backgroundColorSecondary, backgroundColorPrimary, fontColor } =
        useModeColors();

    const [folders, setFolders] = useState<GitHubTreeFolder[]>([]);

    useEffect(() => {
        setFolders(
            data.map((item: GitHubTreeItem) => {
                return {
                    name: item.name,
                    url: item.url,
                    unique_key: item.unique_key,
                    path: item.path,
                    completed: store.gitHubItems.isFolderCompleted(
                        item.unique_key ?? ''
                    ),
                } as GitHubTreeFolder;
            })
        );
    }, [data, store.gitHubItems]);

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

            {/* Content */}
            <Collapse in={isOpen}>
                <Box display="flex" gap={4} overflowX="auto" py={3}>
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
                                            ) : null}
                                            {!item.completed ? (
                                                <Icon
                                                    as={RiTodoFill}
                                                    color="blue"
                                                />
                                            ) : null}
                                            <Text fontWeight="medium">
                                                {item.name}
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
