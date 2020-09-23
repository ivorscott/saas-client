import { createStyles, Theme } from '@material-ui/core';

const styles = ({ breakpoints }: Theme) =>
  createStyles({
    root: {},
    profilePic: {
      marginTop: '2rem'
    },
    input: {
      display: 'none'
    },
    avatarWrapper: {
      [breakpoints.down('xs')]: {
        display: 'flex',
        justifyContent: 'center'
      }
    },
    avatar: {
      width: '100%',
      verticalAlign: 'top',
      borderRadius: '50%',
      '&:hover': {
        opacity: 0.7
      }
    },
    overlay: {
      position: 'absolute',
      borderRadius: '50%',
      width: '100%',
      top: 0,
      left: 0,
      transition: 'all .5s',
      '&:hover': {
        background: '#000000'
      }
    },
    placeholderImage: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#efefef',
      border: '12px solid #ffffff',
      borderRadius: '50%',
      boxShadow: `0 1px 3px rgba(0,0,0,0.12), 
                  0 1px 2px rgba(0,0,0,0.24);`,
      marginTop: '1rem',
      marginBottom: '1rem',
      transition: 'all .5s',
      [breakpoints.down('sm')]: {
        height: 125,
        width: 125,
        border: '4px solid #ffffff'
      },
      [breakpoints.up('md')]: {
        height: 150,
        width: 150,
        border: '8px solid #ffffff'
      },
      [breakpoints.up('lg')]: {
        height: 175,
        width: 175
      }
    },
    uploadButton: {
      flex: 1
    }
  });

export default styles;
