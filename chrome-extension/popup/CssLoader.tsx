// Custom loader is from https://mantine.dev/core/loader/

import { forwardRef } from 'react';
import cx from 'clsx';
import { Box, type MantineLoaderComponent } from '@mantine/core';
import classes from './CssLoader.module.css';

export const CssLoader: MantineLoaderComponent = forwardRef(({ className, ...others }, ref) => (
  <Box component="span" className={cx(classes.loader, className)} {...others} ref={ref} />
));
