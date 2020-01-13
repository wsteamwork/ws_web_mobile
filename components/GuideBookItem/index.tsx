import Grid from '@material-ui/core/Grid/Grid';
import React, { FC } from 'react';
import { makeStyles, Theme, createStyles, Typography, Fab } from '@material-ui/core';
interface IProps {
  classes?: any;
  iconUrl?: string;
  text?: string;
  selected?: boolean;
  handleOpenDialogMap?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center'
    },
    wrapper: {
      textAlign: 'center'
    },
    customFab: {
      backgroundColor: (props) => (props.selected ? '#d5d5d5' : '#ffffff'),
      boxShadow: 'none',
      border: (props) => (props.selected ? '1px solid #1d8df7' : '1px solid rgb(218, 218, 218)'),
      marginBottom: 8,
      height: 80,
      width: 80
    },
    text: {
      fontSize: 15,
      fontWeight: 600,
      color: (props) => (props.selected ? '#1d8df7' : '')
    }
  })
);

const GuideBookItem: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { iconUrl, text, handleOpenDialogMap } = props;
  return (
    <Grid container className={classes.root}>
      <Grid item md={12} className={classes.wrapper}>
        <Fab aria-label="add" className={classes.customFab} onClick={handleOpenDialogMap}>
          <img src={iconUrl ? iconUrl : '/static/guidebook/bus.svg'} width={40} height={40} />
        </Fab>
        <Typography variant="h6" gutterBottom className={classes.text}>
          {text ? text : 'Getting around'}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default GuideBookItem;
