import { NavSize } from '@/types/navSize';
import { useEffect, useState } from 'react';
import { useCurrentPath, useUriHandlers } from '@/lib/utility/uri';

export const useNavSizeHandler = () => {
    const { searchParams } = useCurrentPath();
    const { updateQueryParams } = useUriHandlers();
    const [shouldOverwriteDefaultNavSize, setShouldOverwriteDefaultNavSize] =
        useState(false);
    const [navSize, toggleNavSize] = useState(NavSize.Large);

    useEffect(() => {
        if (shouldOverwriteDefaultNavSize) return;

        const defaultNavSize = searchParams?.get('navSize');
        toggleNavSize(defaultNavSize === '0' ? NavSize.Small : NavSize.Large);
    }, [shouldOverwriteDefaultNavSize, searchParams]);

    const navCollapseClickHandler = () => {
        setShouldOverwriteDefaultNavSize(true);

        updateQueryParams({
            navSize: navSize === NavSize.Small ? '1' : '0',
        });

        toggleNavSize(
            navSize === NavSize.Small ? NavSize.Large : NavSize.Small
        );
    };

    return {
        navSize,
        navCollapseClickHandler,
    };
};
