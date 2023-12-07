import CodeIcon from '@/components/icons/CodeIcon';
import FileIcon from '@/components/icons/FileIcon';
import FolderIcon from '@/components/icons/FolderIcon';
import ImageIcon from '@/components/icons/ImageIcon';
import MarkdownIcon from '@/components/icons/MarkdownIcon';
import VideoIcon from '@/components/icons/VideoIcon';
import { useModeColors } from '@/hooks/useModeColors';
import {
    getParentFromUrl,
    nameToLogo,
    urlToFileExtension,
} from '@/lib/utility/formatters';
import { FileType, findFileInfo } from '@/types/extensions';
import { GithubTreeMenuItem } from '@/types/gitHubData';
import { NavSize } from '@/types/navSize';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Collapse, Flex, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import { CSSProperties, useMemo } from 'react';
import { colorConfig } from '../../../../theme.config';
import Heading from '../../textStyles/Heading';

const chevronBoxSize = 20;
const chevronBoxSizePx = `${chevronBoxSize}px`;

const horizontalPadding = 6;
const horizontalPaddingPx = `${horizontalPadding}px`;
const tabSize = `${chevronBoxSize + horizontalPadding}px`;
const fontSize = 13;

interface NavItemProps {
    treeItem: GithubTreeMenuItem;
    navSize: NavSize;
    root?: boolean;
}

const Title = ({ name }: { name: string }) => {
    const { fontColor } = useModeColors();
    return (
        <Heading
            color={fontColor}
            display="flex"
            fontSize={fontSize}
            noOfLines={1}
        >
            {name}
        </Heading>
    );
};

const Logo = ({ name }: { name: string }) => {
    const { backgroundColorPrimary } = useModeColors();
    return (
        <Flex
            alignItems="center"
            aspectRatio={1}
            backgroundColor={backgroundColorPrimary}
            borderRadius={4}
            height={`${chevronBoxSize + horizontalPadding * 2 - 4}px`}
            justifyContent="center"
            my="2px"
            opacity={0.8}
        >
            <Title name={nameToLogo(name).toUpperCase()} />
        </Flex>
    );
};

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
    navSize,
    root = false,
}: NavItemProps) {
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
        if (!treeItem) return null;
        const getFileInfo = () => {
            const extension = urlToFileExtension(treeItem.name);
            return findFileInfo(extension);
        };
        return getFileInfo();
    }, [treeItem]);

    const renderTitle = useMemo(() => {
        // eslint-disable-next-line react/display-name
        return () => {
            return navSize === NavSize.Large ? (
                <Title name={treeItem.name} />
            ) : null;
        };
    }, [navSize, treeItem]);

    if (!treeItem || !fileInfo) return null;

    if (navSize === NavSize.Small) {
        return <Logo name={treeItem.name} />;
    }

    if (treeItem.tree.length > 0) {
        return (
            <Box
                alignItems="flex-start"
                marginLeft={root ? 0 : tabSize}
                width="100%"
            >
                <Flex _hover={hover} onClick={onToggle} style={containerStyle}>
                    <ChevronDownIcon
                        boxSize={chevronBoxSizePx}
                        color={colorConfig.iconGrey}
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
            <Link
                href={`${url}?file=${treeItem.name}`}
                style={{ width: '100%' }}
            >
                <Flex
                    _hover={hover}
                    marginLeft={root ? 0 : tabSize}
                    onClick={onToggle}
                    style={containerStyle}
                >
                    {getFileIcon(fileInfo.type)}
                    {renderTitle()}
                </Flex>
            </Link>
        );
    }
}
