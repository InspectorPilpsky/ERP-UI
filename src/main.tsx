import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import App from './app/App.tsx'

import {createRoot} from 'react-dom/client';
import {ThemeProvider} from '@gravity-ui/uikit';
import {configure} from '@gravity-ui/uikit';

import './index.css';

configure({
  lang: 'ru',
});

const root = createRoot(document.getElementById('root')!);

root.render(
  <ThemeProvider theme="light">
    <App />
  </ThemeProvider>,
);

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
