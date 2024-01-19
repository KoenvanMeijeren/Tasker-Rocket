import CodeIcon from '@/components/icons/CodeIcon';
import FileIcon from '@/components/icons/FileIcon';
import FolderIcon from '@/components/icons/FolderIcon';
import ImageIcon from '@/components/icons/ImageIcon';
import MarkdownIcon from '@/components/icons/MarkdownIcon';
import VideoIcon from '@/components/icons/VideoIcon';
import { useModeColors } from '@/hooks/useModeColors';
import { getParentFromUrl, urlToFileExtension } from '@/lib/utility/formatters';
import { FileType, findFileInfo } from '@/types/extensions';
import { GithubTreeMenuItem } from '@/types/gitHubData';
import { NavSize } from '@/types/navSize';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Collapse, Flex, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import { CSSProperties, useMemo } from 'react';
import { colorConfig } from '../../../../theme.config';
import NavItemTitle from '@/components/navigation/sideBar/NavItemTitle';

const chevronBoxSize = 20;
const chevronBoxSizePx = `${chevronBoxSize}px`;

const horizontalPadding = 6;
const horizontalPaddingPx = `${horizontalPadding}px`;
const tabSize = `${chevronBoxSize + horizontalPadding}px`;

interface ExpandableNavItemProps {
    menuItems: GithubTreeMenuItem;
    navSize: NavSize;
    root?: boolean;
}

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

export default function ExpandableNavItem({
    menuItems,
    navSize,
    root = false,
}: ExpandableNavItemProps) {
    const { isOpen, onToggle } = useDisclosure();
    const rotate = useMemo(
        () => (isOpen ? 'rotate(-180deg)' : 'rotate(0)'),
        [isOpen]
    );

    const { hoverBackground } = useModeColors();

    const containerStyle: CSSProperties = {
        alignItems: 'center',
        borderRadius: '4px',
        cursor: 'pointer',
        gap: horizontalPaddingPx,
        opacity: 0.8,
        padding: horizontalPaddingPx,
    };

    const hover = {
        backgroundColor: hoverBackground,
        opacity: 1,
    };

    const fileInfo = useMemo(() => {
        const extension = urlToFileExtension(menuItems.name);
        return findFileInfo(extension);
    }, [menuItems]);

    if (!fileInfo) return null;

    if (menuItems.tree.length > 0) {
        return (
            <Box alignItems="flex-start" marginLeft={root ? 0 : tabSize}>
                <Flex _hover={hover} onClick={onToggle} style={containerStyle}>
                    <ChevronDownIcon
                        boxSize={chevronBoxSizePx}
                        color={colorConfig.iconGrey}
                        transform={rotate}
                        transition="all 0.2s linear"
                    />
                    <FolderIcon />

                    <NavItemTitle name={menuItems.name} />
                </Flex>

                <Collapse in={isOpen}>
                    {menuItems.tree.map((item) => (
                        <ExpandableNavItem
                            key={item.path}
                            menuItems={item}
                            navSize={navSize}
                        />
                    ))}
                </Collapse>
            </Box>
        );
    } else {
        const parent = getParentFromUrl(menuItems.path);
        const url = `/${encodeURIComponent(parent)}`;

        return (
            <Link
                href={`${url}?file=${menuItems.name}`}
                style={{ width: '100%' }}
            >
                <Flex
                    _hover={hover}
                    marginLeft={root ? 0 : tabSize}
                    onClick={onToggle}
                    style={containerStyle}
                >
                    {getFileIcon(fileInfo.type)}

                    <NavItemTitle name={menuItems.name} />
                </Flex>
            </Link>
        );
    }
}
