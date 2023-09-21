import { extendTheme } from "@chakra-ui/react";

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
  menuBgColor: '#1C2334',
  menuTextColor: '#fff',
  activeColor: '#4bca9b',
}

export const Colors = { 
  dark: {
    backgroundSecondary: '#2d3748',
    border: '#3b424d',
    font: 'white'
  },
  light: {
    backgroundSecondary: 'white',
    border: '#D2DBE3',
    font: '#464b53'
  },
  green: '#239964',
}



