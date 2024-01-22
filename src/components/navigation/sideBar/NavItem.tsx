import { useModeColors } from '@/hooks/useModeColors';
import { NavSize } from '@/types/navSize';
import NavItemLogo from '@/components/navigation/sideBar/NavItemLogo';
import { useCurrentPath } from '@/lib/utility/uri';
import { GitHubParentTree, GithubTreeMenuItem } from '@/types/gitHubData';
import { ExpandableNavItem } from '@/components/navigation/sideBar/ExpandableNavItem';

type Props = {
    item: GithubTreeMenuItem;
    parentTree: GitHubParentTree | undefined;
    navSize: NavSize;
};

export default function NavItem({ item, parentTree, navSize }: Props) {
    const { pathStripped } = useCurrentPath();
    const { fontColor, menuItemActiveBackground } = useModeColors();

    if (navSize === NavSize.Small) {
        const isActive = pathStripped === `/${item.path}`;

        return (
            <NavItemLogo
                backgroundColor={
                    isActive ? menuItemActiveBackground : undefined
                }
                name={item.name}
                textColor={fontColor}
            />
        );
    }

    return (
        <ExpandableNavItem
            menuItem={item}
            navSize={navSize}
            parenTree={parentTree}
            root={item.isRoot}
        />
    );
}
