import { GlobalStylingValues } from '@/styles/globalStylingValues';
import { SVGProps } from 'react';
const size = GlobalStylingValues.sidebar.icons.size;
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        fill="none"
        height={size}
        style={{
            minWidth: size,
            minHeight: size,
        }}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            clipRule="evenodd"
            d="M5.42 3.239C6.23 3.059 7.196 3 8.312 3H9.93a3 3 0 0 1 2.496 1.336l.812 1.219A1 1 0 0 0 14.07 6h5.056c1.597 0 2.892 1.261 2.877 2.885-.018 1.934-.003 3.869-.003 5.803 0 1.116-.058 2.082-.239 2.892-.182.822-.503 1.545-1.07 2.112-.566.566-1.289.887-2.11 1.07-.811.18-1.777.238-2.893.238H8.312c-1.116 0-2.082-.058-2.892-.239-.822-.182-1.545-.503-2.112-1.07-.566-.566-.887-1.289-1.07-2.11C2.059 16.77 2 15.803 2 14.687V9.312c0-1.116.059-2.082.239-2.892.182-.822.503-1.545 1.07-2.112.566-.566 1.289-.887 2.11-1.07Z"
            fill="#768390"
            fillRule="evenodd"
        />
    </svg>
);
export default SvgComponent;
