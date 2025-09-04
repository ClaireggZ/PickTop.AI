import { createTheme, Loader, MantineProvider } from '@mantine/core';

import Main from './Main';
import { CssLoader } from './CssLoader';

import '@mantine/core/styles.css';

const theme = createTheme({
  defaultRadius: 'lg',

  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, custom: CssLoader },
        type: 'custom',
      },
    }),
  },
});

function IndexPopup() {
  return (
    <MantineProvider theme={theme}>
      <div
        style={{
          padding: 16,
          width: 400,
          height: 350,
        }}
      >
        <Main />
      </div>
    </MantineProvider>
  );
}

export default IndexPopup;
