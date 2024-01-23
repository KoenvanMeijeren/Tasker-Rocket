import CodeIcon from '@/components/icons/CodeIcon';
import FileIcon from '@/components/icons/FileIcon';
import FolderIcon from '@/components/icons/FolderIcon';
import ImageIcon from '@/components/icons/ImageIcon';
import MarkdownIcon from '@/components/icons/MarkdownIcon';
import VideoIcon from '@/components/icons/VideoIcon';
import { useModeColors } from '@/hooks/useModeColors';
import { getParentFromUrl, urlToFileExtension } from '@/lib/utility/formatters';
import { FileType, findFileInfo } from '@/types/extensions';
import { GitHubParentTree, GithubTreeMenuItem } from '@/types/gitHubData';
import { NavSize } from '@/types/navSize';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Collapse, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { CSSProperties, useMemo } from 'react';
import { colorConfig } from '../../../../theme.config';
import NavItemTitle from '@/components/navigation/sideBar/NavItemTitle';
import { buildUri } from '@/lib/utility/uri';
import { useNavItemActiveHandler } from '@/lib/navigation/useNavItemActiveHandler';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { observer } from 'mobx-react-lite';

const chevronBoxSize = 20;
const chevronBoxSizePx = `${chevronBoxSize}px`;

const horizontalPadding = 6;
const horizontalPaddingPx = `${horizontalPadding}px`;
const tabSize = `${chevronBoxSize + horizontalPadding}px`;

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

interface Props {
    menuItem: GithubTreeMenuItem;
    parenTree: GitHubParentTree | undefined;
    navSize: NavSize;
    root?: boolean;
}

export const ExpandableNavItem = observer((props: Props) => {
    const { menuItem, parenTree, navSize, root } = props;
    const store = useStore();
    const searchParams = useSearchParams();
    const { isActive, isActiveFile, isActiveInTree } = useNavItemActiveHandler(
        store,
        menuItem,
        parenTree
    );
    const isOpen = store.menuTree.isItemActive(menuItem);

    const { fontColor, hoverBackground, menuItemActiveBackground } =
        useModeColors();

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
        const extension = urlToFileExtension(menuItem.name);
        return findFileInfo(extension);
    }, [menuItem]);

    if (!fileInfo) return null;

    if (menuItem.tree.length > 0) {
        return (
            <Box alignItems="flex-start" marginLeft={root ? 0 : tabSize}>
                <Flex
                    _hover={hover}
                    backgroundColor={
                        isActive ? menuItemActiveBackground : 'default'
                    }
                    onClick={() => {
                        // Toggling has no effect, because the item is marked as active in tree.
                        if (isActiveInTree) return;

                        store.menuTree.toggleItemState(menuItem);
                    }}
                    style={containerStyle}
                >
                    <ChevronDownIcon
                        boxSize={chevronBoxSizePx}
                        color={colorConfig.iconGrey}
                        transform={isOpen ? 'rotate(-180deg)' : 'rotate(0)'}
                        transition="all 0.2s linear"
                    />
                    <FolderIcon />

                    <NavItemTitle name={menuItem.name} textColor={fontColor} />
                </Flex>

                <Collapse in={isOpen || isActiveInTree}>
                    {menuItem.tree.map((item) => (
                        <ExpandableNavItem
                            key={item.path}
                            menuItem={item}
                            navSize={navSize}
                            parenTree={parenTree}
                        />
                    ))}
                </Collapse>
            </Box>
        );
    }

    const parent = getParentFromUrl(menuItem.path);
    const handleFileClick = () => {
        store.menuTree.setOpenedFilePath(menuItem.path);
    };

    return (
        <Link
            href={
                buildUri(parent, searchParams, {}, ['path']) +
                `#file-${menuItem.unique_key}`
            }
            onClick={handleFileClick}
            style={{ width: '100%' }}
        >
            <Flex
                _hover={hover}
                backgroundColor={
                    isActiveFile ? menuItemActiveBackground : 'default'
                }
                marginLeft={root ? 0 : tabSize}
                style={containerStyle}
            >
                {getFileIcon(fileInfo.type)}

                <NavItemTitle name={menuItem.name} textColor={fontColor} />
            </Flex>
        </Link>
    );
});
