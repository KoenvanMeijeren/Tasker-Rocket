import CodeIcon from '@/components/icons/CodeIcon';
import FileIcon from '@/components/icons/FileIcon';
import FolderIcon from '@/components/icons/FolderIcon';
import ImageIcon from '@/components/icons/ImageIcon';
import MarkdownIcon from '@/components/icons/MarkdownIcon';
import VideoIcon from '@/components/icons/VideoIcon';
import {
    getParentFromUrl,
    nameToLogo,
    urlToFileExtension,
} from '@/lib/utility/formatters';
import { FileType, findFileInfo } from '@/types/extensions';
import { NavSize } from '@/types/navSize';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Collapse, Flex, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import { colorConfig } from '../../../../theme.config';
import Heading from '../../textStyles/Heading';
import { GithubTreeMenuItem } from './SideBar';

const chevronBoxSize = 20;
const chevronBoxSizePx = `${chevronBoxSize}px`;

const horizontalPadding = 6;
const horizontalPaddingPx = `${horizontalPadding}px`;
const tabSize = `${chevronBoxSize + horizontalPadding}px`;
const fontSize = 13;

interface NavItemProps {
    treeItem: GithubTreeMenuItem;
    active?: boolean;
    navSize: NavSize;
    root?: boolean;
}
const Title = ({ name }: { name: string }) => (
    <Heading
        color={colorConfig.dark.font}
        display="flex"
        fontSize={fontSize}
        noOfLines={1}
    >
        {name}
    </Heading>
);

const Logo = ({ name }: { name: string }) => (
    <Flex
        alignItems="center"
        aspectRatio={1}
        backgroundColor={colorConfig.dark.backgroundSecondary}
        borderRadius={4}
        height={`${chevronBoxSize + horizontalPadding * 2 - 4}px`}
        justifyContent="center"
        my="2px"
        opacity={0.8}
    >
        <Title name={nameToLogo(name).toUpperCase()} />
    </Flex>
);

const getFileIcon = (fileType: FileType) => {
    switch (fileType) {
        case FileType.Code:
            return <CodeIcon />;
        case FileType.Image:
            return <ImageIcon />;
        case FileType.Markdown:
            return <MarkdownIcon />;
        case FileType.Video:
            return <VideoIcon />;
        default:
            return <FileIcon />;
    }
};

export default function NavItem({
    treeItem,
    active = false,
    navSize,
    root = false,
}: NavItemProps) {
    const { isOpen, onToggle } = useDisclosure();
    const rotate = isOpen ? 'rotate(-180deg)' : 'rotate(0)';
    const hoverBackground = 'rgba(41, 236, 172, 0.3)';

    if (navSize === NavSize.Small) {
        return <Logo name={treeItem.name} />;
    }
    const extension = urlToFileExtension(treeItem.name);
    const fileInfo = findFileInfo(extension);

    const renderTitle = () =>
        navSize === NavSize.Large ? <Title name={treeItem.name} /> : null;

    if (treeItem.tree.length > 0) {
        return (
            <Box
                alignItems="flex-start"
                marginLeft={root ? 0 : tabSize}
                width="100%"
            >
                <Flex
                    _hover={{
                        backgroundColor: hoverBackground,
                        opacity: 1,
                    }}
                    alignItems="center"
                    borderRadius={4}
                    cursor="pointer"
                    gap={horizontalPaddingPx}
                    onClick={onToggle}
                    opacity={0.8}
                    p={horizontalPaddingPx}
                >
                    <ChevronDownIcon
                        boxSize={chevronBoxSizePx}
                        color="white"
                        transform={rotate}
                        transition="all 0.2s linear"
                    />
                    <FolderIcon />
                    {renderTitle()}
                </Flex>

                <Collapse in={isOpen}>
                    {treeItem.tree.map((item) => (
                        <NavItem
                            key={item.path}
                            navSize={navSize}
                            treeItem={item}
                        />
                    ))}
                </Collapse>
            </Box>
        );
    } else {
        const parent = getParentFromUrl(treeItem.path);
        const url = `/${encodeURIComponent(parent)}`;

        return (
            <Link href={`${url}?file=${treeItem.name}`}>
                <Flex
                    _hover={{
                        backgroundColor: hoverBackground,
                        opacity: 1,
                    }}
                    alignItems="center"
                    backgroundColor={active ? hoverBackground : undefined}
                    borderRadius={4}
                    cursor="pointer"
                    gap={horizontalPaddingPx}
                    marginLeft={root ? 0 : tabSize}
                    onClick={onToggle}
                    opacity={0.8}
                    p={horizontalPaddingPx}
                    w="100%"
                >
                    <>{getFileIcon(fileInfo.type)}</>

                    {renderTitle()}
                </Flex>
            </Link>
        );
    }
}
