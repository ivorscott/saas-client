import { createStyles, Theme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const styles = (theme: Theme) =>
  createStyles({
    confirmDialog: {
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-end',
      marginTop: 20
    },
    confirmAction: {
      color: red[300],
      textDecoration: 'underline',
      cursor: 'pointer',
      paddingLeft: 20
    }
  });

export default styles;
