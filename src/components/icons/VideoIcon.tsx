import { GlobalStylingValues } from '@/styles/globalStylingValues';
import { SVGProps } from 'react';
import { colorConfig } from '../../../theme.config';
const size = GlobalStylingValues.sidebar.icons.size;

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        fill="none"
        height={size}
        style={{ minWidth: size, minHeight: size }}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M10.28 8.04c-1.09.39-1.28 2.48-1.28 4s.19 3.56 1.28 4c1.09.44 5.72-2.29 5.72-4s-4.56-4.42-5.72-4Z"
            stroke={colorConfig.iconGrey}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        />
        <path
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
            stroke={colorConfig.iconGrey}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        />
    </svg>
);
export default SvgComponent;
