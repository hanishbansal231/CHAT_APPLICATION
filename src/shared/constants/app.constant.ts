import { CSSObject } from "@emotion/react";

export interface Config {
    initialColorMode: string;
    useSystemColorMode: boolean;
}

export interface Colors {
    gray: {
        light: string;
        dark: string;
    }
}

export interface StylesProps {
    colorMode: 'light' | 'dark';
}

export interface Styles {
    global: (props: StylesProps) => CSSObject;
}