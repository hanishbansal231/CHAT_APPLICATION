import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript, Colors, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import i18n from 'i18next';

import App from './App.tsx'
import './index.css'
import { Config, Styles } from '@shared/constants/app.constant.ts'
import { BrowserRouter } from 'react-router-dom'
import { initReactI18next } from 'react-i18next';

import en from './assets/translate/en.json';

const styles: Styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', '#101010')(props),
    },
  }),
};

const config: Config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
}

const colors: Colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e"
  }
}

const theme = extendTheme({ config, styles, colors });

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
