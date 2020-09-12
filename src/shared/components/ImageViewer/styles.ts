import { createStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) =>
  createStyles({
    wrapperStyles: {
      maxWidth: '100%',
      maxHeight: '100%'
    },
    imageStyles: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignIUtems: 'center',
      justifyContent: 'center',
      transform: 'none'
    },
    xs: {
      width: '5%'
    },
    sm: {
      width: '15%'
    },
    md: {
      width: '25%'
    },
    lg: {
      width: '50%'
    },
    autoRotate270: {
      transform: `rotate(270deg)`
    },
    autoRotate180: {
      transform: `rotate(180deg)`
    },
    autoRotate90: {
      transform: `rotate(90deg)`
    }
  });

export default styles;
