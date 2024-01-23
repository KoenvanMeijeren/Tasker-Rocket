import CodeIcon from '@/components/icons/CodeIcon';
import FileIcon from '@/components/icons/FileIcon';
import FolderIcon from '@/components/icons/FolderIcon';
import ImageIcon from '@/components/icons/ImageIcon';
import MarkdownIcon from '@/components/icons/MarkdownIcon';
import VideoIcon from '@/components/icons/VideoIcon';
import { getParentFromUrl, urlToFileExtension } from '@/lib/utility/formatters';
import { FileType, findFileInfo } from '@/types/extensions';
import { GitHubParentTree, GithubTreeMenuItem } from '@/types/gitHubData';
import { NavSize } from '@/types/navSize';
import { CheckCircleIcon, ChevronDownIcon, Icon } from '@chakra-ui/icons';
import { Box, Collapse, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { CSSProperties, useMemo } from 'react';
import { themeConfig } from '../../../../theme.config';
import NavItemTitle from '@/components/navigation/sideBar/NavItemTitle';
import { buildUri } from '@/lib/utility/uri';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { observer } from 'mobx-react-lite';
import { useColorConfig } from '@/lib/colors/useColorConfig';
import { RiTodoFill } from 'react-icons/ri';
import { useNavItemActiveHandler } from '@/lib/navigation/useNavItemActiveHandler';

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
    menuParentItem: GithubTreeMenuItem | undefined;
    parentTree: GitHubParentTree | undefined;
    navSize: NavSize;
    root?: boolean;
}

const ExpandableNavItem = observer((props: Props) => {
    const { menuItem, menuParentItem, parentTree, navSize, root } = props;
    const colorConfig = useColorConfig();
    const store = useStore();
    const searchParams = useSearchParams();
    const {
        isActive,
        isActiveFile,
        isActiveInTree,
        isOpen,
        isItemCompleted,
        isFolderCompleted,
    } = useNavItemActiveHandler(store, menuItem, parentTree, menuParentItem);

    const containerStyle: CSSProperties = {
        alignItems: 'center',
        borderRadius: '4px',
        cursor: 'pointer',
        gap: horizontalPaddingPx,
        opacity: 0.8,
        padding: horizontalPaddingPx,
    };

    const hover = {
        backgroundColor: colorConfig.hoverBackground,
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
                        isActive
                            ? colorConfig.menuItemActiveBackground
                            : 'default'
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
                        color={themeConfig.iconGrey}
                        transform={isOpen ? 'rotate(-180deg)' : 'rotate(0)'}
                        transition="all 0.2s linear"
                    />

                    {isFolderCompleted ? (
                        <CheckCircleIcon color="green" />
                    ) : (
                        <Icon as={RiTodoFill} color="blue" />
                    )}

                    <FolderIcon />

                    <NavItemTitle
                        name={menuItem.name}
                        textColor={colorConfig.font}
                    />
                </Flex>

                <Collapse in={isOpen || isActiveInTree}>
                    {menuItem.tree.map((item) => (
                        <ExpandableNavItem
                            key={item.path}
                            menuItem={item}
                            menuParentItem={menuItem}
                            navSize={navSize}
                            parentTree={parentTree}
                        />
                    ))}
                </Collapse>
            </Box>
        );
    }

    const parentUrl = getParentFromUrl(menuItem.path);
    const handleFileClick = () => {
        store.menuTree.setOpenedFilePath(menuItem.path);
    };

    return (
        <Link
            href={
                buildUri(parentUrl, searchParams, {}, ['path']) +
                `#file-${menuItem.unique_key}`
            }
            onClick={handleFileClick}
            style={{ width: '100%' }}
        >
            <Flex
                _hover={hover}
                backgroundColor={
                    isActiveFile
                        ? colorConfig.menuItemActiveBackground
                        : 'default'
                }
                marginLeft={root ? 0 : tabSize}
                style={containerStyle}
            >
                {isItemCompleted ? (
                    <CheckCircleIcon color={colorConfig.success} />
                ) : null}
                {!isItemCompleted ? (
                    <Icon as={RiTodoFill} color={colorConfig.primary} />
                ) : null}

                {getFileIcon(fileInfo.type)}

                <NavItemTitle
                    name={menuItem.name}
                    textColor={colorConfig.font}
                />
            </Flex>
        </Link>
    );
});

ExpandableNavItem.displayName = 'ExpandableNavItem';
export default ExpandableNavItem;
