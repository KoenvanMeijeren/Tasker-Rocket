import { Extension } from '@codemirror/state';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';

export interface ThemeConfig {
    lightModeBgColor: string;
    darkModeBgColor: string;
    menuBgColor: string;
    menuTextColor: string;
    activeColor: string;
    iconGrey: string;
}

export const themeConfig: ThemeConfig = {
    lightModeBgColor: 'gray.100',
    darkModeBgColor: '#1C2334',
    menuBgColor: '#0f161f',
    menuTextColor: '#fff',
    activeColor: '#4bca9b',
    iconGrey: '#768390',
};

export type ColorConfig = {
    backgroundSecondary: string;
    backgroundPrimary: string;
    menuBackground: string;
    border: string;
    font: string;
    title: string;
    tint: string;
    hoverBackground: string;
    menuItemActiveBackground: string;
    primary: string;
    success: string;
    danger: string;
    grey: string;
    gitHubConfig: Extension;
};

export const colorConfig: Record<'dark' | 'light', ColorConfig> = {
    dark: {
        backgroundSecondary: '#151c27',
        backgroundPrimary: '#0c1016',
        menuBackground: '#0f161f',
        border: '#232d3b',
        font: 'white',
        title: 'white',
        tint: '#616d79',
        hoverBackground: '#1a2636',
        menuItemActiveBackground: '#232d3b',
        primary: '#3b82f6',
        success: '#239964',
        danger: '#ef4444',
        grey: '#464b53',
        gitHubConfig: githubLight,
    },
    light: {
        backgroundSecondary: '#ffffff',
        backgroundPrimary: '#f5f7fc',
        menuBackground: '#ffffff',
        border: '#dde2ed',
        font: '#000001',
        title: 'black',
        tint: '#dbdee6',
        hoverBackground: '#e8eaf3',
        menuItemActiveBackground: '#dbdee6',
        primary: '#3b82f6',
        success: '#239964',
        danger: '#ef4444',
        grey: '#464b53',
        gitHubConfig: githubDark,
    },
};
