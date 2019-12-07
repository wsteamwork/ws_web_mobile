import { Theme } from "@fullcalendar/core";
import { createStyles, Grid, makeStyles, Typography } from "@material-ui/core";
import { GridProps } from '@material-ui/core/Grid/Grid';
import { FC } from "react";

interface IProps extends Partial<GridProps> {
  data?: { imageIcon: string, title: string, subtitle: string };
};
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    cardBase: {
      display: 'flex',
      background: '#5F87F9',
      height: '4rem',
      borderRadius: '0.5rem'
    },
    imgContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    iconImage: {
      width: '2rem',
      height: '100%'
    },
    textContainer: {
      borderRight: '1px solid white',
      borderRightStyle: 'dashed',
      color: 'white',
      padding: '8px !important'
    },
    marginSpacing: {
      margin: '0 !important'
    },
    listScrollNoPadding: {
      padding: '0 !important'
    },
    title: {
      fontSize: '1rem'
    }
  })
);
const CardSimpleWithIcon: FC<IProps> = (props) => {
  const classes = useStyles(props)
  return (
    <Grid item xs={props.xs || 6} sm={props.sm || 3} md={props.md || 3} lg={props.lg}>
      <Grid item xs={12} className={classes.cardBase}>
        <Grid container spacing={1}>
          <Grid item xs={4} className={classes.imgContainer}>
            <img className={classes.iconImage} src={props.data.imageIcon} alt={props.data.title} />
          </Grid>
          <Grid container item xs={7} className={classes.textContainer}>
            <Grid item xs={12}>
              <Typography variant="h6" className={classes.title}>{props.data.title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">{props.data.subtitle}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default CardSimpleWithIcon;