import React, { Fragment,FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({

  })
);

const LTHome: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;

  return (
    <Fragment>

    </Fragment>
  );
};

export default LTHome;
