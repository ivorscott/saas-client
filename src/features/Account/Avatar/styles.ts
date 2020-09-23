import { createStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    contentWrapper: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '& > div': {
        width: '100%'
      }
    },
    avatarEditor: {
      '& .konvajs-content': {
        position: 'inherit'
      }
    },
    preview: {
      marginTop: '2rem'
    }
  });

export default styles;
