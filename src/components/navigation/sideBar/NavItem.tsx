import { Center, Divider } from '@chakra-ui/layout';
import { Box, Collapse, Flex, Link, useDisclosure } from '@chakra-ui/react';

import CodeIcon from '@/components/icons/CodeIcon';
import FileIcon from '@/components/icons/FileIcon';
import FolderIcon from '@/components/icons/FolderIcon';
import ImageIcon from '@/components/icons/ImageIcon';
import MarkdownIcon from '@/components/icons/MarkdownIcon';
import VideoIcon from '@/components/icons/VideoIcon';
import { useModeColors } from '@/hooks/useColors';
import {
    getParentFromUrl,
    nameToLogo,
    urlToFileExtension,
} from '@/lib/utility/formatters';
import { FileType, findFileInfo } from '@/types/extensions';
import { NavSize } from '@/types/navSize';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Heading from '../../textStyles/Heading';
import { GithubTreeMenuItem } from './SideBar';

interface NavItemProps {
    treeItem: GithubTreeMenuItem;
    active?: boolean;
    navSize: NavSize;
}

const tabSize = 8;
const horizontalPadding = 2;

export const VertDivider = () => {
    const { border } = useModeColors();

    return (
        <Flex justifyContent="flex-start">
            <Center boxSize={tabSize} zIndex={1}>
                <Divider
                    borderColor={border}
                    borderWidth={1}
                    opacity={0.8}
                    orientation="vertical"
                    zIndex={0}
                />
            </Center>
        </Flex>
    );
};

const Logo = ({ name }: { name: string }) => (
    <Flex height={tabSize}>
        <Heading opacity={0.8}>{nameToLogo(name).toUpperCase()}</Heading>
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
}: NavItemProps) {
    const { isOpen, onToggle } = useDisclosure();
    const rotate = isOpen ? 'rotate(-180deg)' : 'rotate(0)';
    const bg = 'rgba(41, 236, 172, 0.3)';

    if (navSize === NavSize.Small) {
        return <Logo name={treeItem.name} />;
    }
    const extension = urlToFileExtension(treeItem.name);
    const fileInfo = findFileInfo(extension);

    if (treeItem.tree.length > 0) {
        return (
            <Box alignItems="flex-start" marginLeft={tabSize}>
                <Flex
                    _hover={{
                        backgroundColor: bg,
                        opacity: 1,
                    }}
                    alignItems="center"
                    backgroundColor={active ? bg : undefined}
                    borderRadius={8}
                    cursor="pointer"
                    gap={horizontalPadding}
                    onClick={onToggle}
                    opacity={0.8}
                    paddingRight={horizontalPadding}
                >
                    <ChevronDownIcon
                        boxSize={tabSize}
                        color="white"
                        transform={rotate}
                        transition="all 0.2s linear"
                    />

                    <FolderIcon />

                    {/* TITLE */}
                    {navSize === NavSize.Large ? (
                        <Heading display="flex" noOfLines={1}>
                            {treeItem.name}
                        </Heading>
                    ) : null}
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
                        backgroundColor: bg,
                        opacity: 1,
                    }}
                    alignItems="center"
                    backgroundColor={active ? bg : undefined}
                    borderRadius={8}
                    cursor="pointer"
                    height={tabSize}
                    marginLeft={tabSize}
                    onClick={onToggle}
                    opacity={0.8}
                    px={horizontalPadding}
                    w={navSize == NavSize.Large ? '100%' : undefined}
                >
                    <>{getFileIcon(fileInfo.type)}</>

                    {/* TITLE */}
                    {navSize === NavSize.Large ? (
                        <Heading
                            display="flex"
                            ml={horizontalPadding}
                            noOfLines={1}
                        >
                            {treeItem.name}
                        </Heading>
                    ) : null}
                </Flex>
            </Link>
        );
    }
}
