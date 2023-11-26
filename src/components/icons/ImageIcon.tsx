import { GlobalValues } from '@/styles/globalValues';
import { SVGProps } from 'react';
import { colorConfig } from '../../../theme.config';
const size = GlobalValues.sidebar.icons.size;

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
            d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z"
            fill={colorConfig.iconGrey}
            opacity={0.15}
        />
        <path
            d="M4.027 18.329A2 2 0 0 0 6 20h12a2 2 0 0 0 2-2v-3.81M4.027 18.33A2.014 2.014 0 0 1 4 18V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8.19M4.027 18.33l3.82-3.82a2 2 0 0 1 2.427-.16l.51.34a2 2 0 0 0 2.358-.103l2.648-2.118a2 2 0 0 1 2.333-.12c.08.052.15.115.217.182L20 14.19M11 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
            stroke={colorConfig.iconGrey}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        />
    </svg>
);
export default SvgComponent;
