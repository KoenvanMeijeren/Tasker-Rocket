import { NavSize } from '@/types/navSize';
import NavItemLogo from '@/components/navigation/sideBar/NavItemLogo';
import { useCurrentPath } from '@/lib/utility/uri';
import { GitHubParentTree, GithubTreeMenuItem } from '@/types/gitHubData';
import ExpandableNavItem from '@/components/navigation/sideBar/ExpandableNavItem';
import { useColorConfig } from '@/lib/colors/useColorConfig';

type Props = {
    item: GithubTreeMenuItem;
    parentTree: GitHubParentTree | undefined;
    navSize: NavSize;
};

export default function NavItem({ item, parentTree, navSize }: Props) {
    const { pathStripped } = useCurrentPath();
    const colorConfig = useColorConfig();

    if (navSize === NavSize.Small) {
        const isActive = pathStripped === `/${item.path}`;

        return (
            <NavItemLogo
                backgroundColor={
                    isActive ? colorConfig.menuItemActiveBackground : undefined
                }
                name={item.name}
                textColor={colorConfig.font}
            />
        );
    }

    return (
        <ExpandableNavItem
            menuItem={item}
            menuParentItem={undefined}
            navSize={navSize}
            parentTree={parentTree}
            root={item.isRoot}
        />
    );
}
