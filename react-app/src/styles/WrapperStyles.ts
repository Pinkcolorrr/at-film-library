import { makeStyles } from '@material-ui/core';

export type wrapperStyles = {
  classes: Record<'root' | 'content' | 'toolbar' | 'header' | 'aside' | 'asidePaper', string>;
};

const drawerWidth = 500;

export const wrapperClasses = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  header: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  aside: {
    width: drawerWidth,
    flexShrink: 0,
  },
  asidePaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(5),
  },
}));
