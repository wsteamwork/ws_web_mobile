import { Grid, Theme } from '@material-ui/core';
import { ErrorOutline } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment } from 'react';

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    error_message: {
      display: 'flex',
      backgroundColor: '#ff7272',
      color: 'white',
      padding: '1rem',
      fontSize: '16px',
      border: 'solid 1px #ff7272',
      borderRadius: '0 0 3px 3px',
      [theme!.breakpoints!.down!('xs')]: {
        fontSize: '14px'
      },
      [theme!.breakpoints!.down!('sm')]: {
        fontSize: '14px'
      }
    },
    error_icon: {
      marginRight: theme.spacing(1)
    }
  })
);

interface IProps {
  showError: boolean;
  errorMessage: string;
}

const ErrorNotify: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { showError, errorMessage } = props;
  return (
    <Fragment>
      {showError ? (
        <Grid className={classes.error_message}>
          <ErrorOutline className={classes.error_icon} />
          {errorMessage}
        </Grid>
      ) : (
          ''
        )}
    </Fragment>
  );
};

export default ErrorNotify;
