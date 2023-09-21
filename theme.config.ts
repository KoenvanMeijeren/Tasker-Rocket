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


export const theme = extendTheme({
    "colors": {
      "gray": {
        "50": "#F2F2F2",
        "100": "#DBDBDB",
        "200": "#C4C4C4",
        "300": "#ADADAD",
        "400": "#969696",
        "500": "#808080",
        "600": "#666666",
        "700": "#4D4D4D",
        "800": "#333333",
        "900": "#1A1A1A"
      },
      "red": {
        "50": "#FDE8E8",
        "100": "#F9BDBD",
        "200": "#F59393",
        "300": "#F26969",
        "400": "#EE3F3F",
        "500": "#EA1515",
        "600": "#BB1111",
        "700": "#8C0D0D",
        "800": "#5E0808",
        "900": "#2F0404"
      }
  },
})


