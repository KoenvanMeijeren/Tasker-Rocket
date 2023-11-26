import { GlobalValues } from '@/styles/globalValues';
import { SVGProps } from 'react';
const size = GlobalValues.sidebar.icons.size;

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        height={size}
        style={{ minWidth: size, minHeight: size }}
        viewBox="0 0 512 512"
        width={size}
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M128 0c-17.6 0-32 14.4-32 32v448c0 17.6 14.4 32 32 32h320c17.6 0 32-14.4 32-32V128L352 0H128z"
            style={{
                fill: '#e2e5e7',
            }}
        />
        <path
            d="M384 128h96L352 0v96c0 17.6 14.4 32 32 32z"
            style={{
                fill: '#b0b7bd',
            }}
        />
        <path
            d="m480 224-96-96h96z"
            style={{
                fill: '#cad1d8',
            }}
        />
        <path
            d="M416 416c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V256c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v160z"
            style={{
                fill: '#576d7e',
            }}
        />
        <path
            d="M132.784 311.472H110.4c-11.136 0-11.136-16.368 0-16.368h60.512c11.392 0 11.392 16.368 0 16.368h-21.248v64.592c0 11.12-16.896 11.392-16.896 0v-64.592h.016zM224.416 326.176l22.272-27.888c6.656-8.688 19.568 2.432 12.288 10.752-7.68 9.088-15.728 18.944-23.424 29.024l26.112 32.496c7.024 9.6-7.04 18.816-13.952 9.344l-23.536-30.192-23.152 30.832c-6.528 9.328-20.992-1.152-13.68-9.856l25.696-32.624c-8.048-10.096-15.856-19.936-23.664-29.024-8.064-9.6 6.912-19.44 12.784-10.48l22.256 27.616zM298.288 311.472H275.92c-11.136 0-11.136-16.368 0-16.368h60.496c11.392 0 11.392 16.368 0 16.368h-21.232v64.592c0 11.12-16.896 11.392-16.896 0v-64.592z"
            style={{
                fill: '#fff',
            }}
        />
        <path
            d="M400 432H96v16h304c8.8 0 16-7.2 16-16v-16c0 8.8-7.2 16-16 16z"
            style={{
                fill: '#cad1d8',
            }}
        />
    </svg>
);
export default SvgComponent;
