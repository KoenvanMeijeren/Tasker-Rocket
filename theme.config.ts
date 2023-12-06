export interface ThemeConfig {
    lightModeBgColor: string;
    darkModeBgColor: string;
    menuBgColor: string;
    menuTextColor: string;
    activeColor: string;
}

export const themeConfig: ThemeConfig = {
    lightModeBgColor: 'gray.100',
    darkModeBgColor: '#1C2334',
    menuBgColor: '#0f161f', //menu 101722
    menuTextColor: '#fff',
    activeColor: '#4bca9b',
};

export const colorConfig = {
    dark: {
        backgroundSecondary: '#151c27', //boxes
        backgroundPrimary: '#0c1016', // background
        menuBackground: '#0f161f', //menu 1017229
        border: '#232d3b',
        font: 'white',
        title: 'white',
        tint: '#616d79',
        hoverBackground: '#1a2636',
    },
    light: {
        backgroundSecondary: '#ffffff',
        backgroundPrimary: '#f5f7fc',
        menuBackground: '#ffffff', //menu 101722
        border: '#dde2ed',
        font: '#000001',
        title: 'black',
        tint: '#dbdee6',
        hoverBackground: '#e8eaf3',
    },
    green: '#239964',
    grey: '#464b53',
    iconGrey: '#768390',
};
