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
        border: '#232d3b',
        font: 'white',
    },
    light: {
        backgroundSecondary: 'white',
        backgroundPrimary: '#edf2f7',
        border: '#9394a5',
        font: '#282c37',
    },
    green: '#239964',
    grey: '#464b53',
    iconGrey: '#768390',
};
