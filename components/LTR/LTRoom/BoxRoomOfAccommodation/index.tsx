import { createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import { FC, Fragment } from "react";

interface IProps { 
  bedrooms?: any,
  bathrooms?: any,
  kitchens?: any,
  totalArea?: number,
  livingrooms?: any
};

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    headTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: '1.505rem',
      letterSpacing: '-0.6px',
      color: 'inherit',
      margin: '0px',
      padding: '0px'
    },
    headTitleContainer: {
      // paddingLeft: '1.5rem',
      // marginBottom: '1.1rem',
      WebkitBoxAlign: 'baseline',
      WebkitBoxPack: 'justify',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      display: 'inline-flex'
    },
    cardBase: {
      backdropFilter: 'blur(27.1828px)',
      background: '#ffffff17',
      height: '4rem',
      borderRadius: '0.5rem'
    },
    container: {
      whiteSpace: 'nowrap',
      marginTop: '0px',
      // padding: '0 1rem'
    },
    componentWrapper: {
      // marginTop: '1rem'
    }
  })
);

const BoxRoomOfAccommodation: FC<IProps> = (props) => {
  const classes = useStyles(props)
  const { bedrooms, bathrooms, totalArea, livingrooms, kitchens } = props;
  return (
    <Fragment>
      <Grid container className={classes.componentWrapper}>
        <Grid container spacing={1} className={classes.container}>
          <Grid item xs={6}>
            <Grid item xs={12} className={classes.cardBase}>
              <Grid container spacing={1}>
                <Grid xs={4}>
                  
                </Grid>
                <Grid container item xs={8}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Bedroom</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">3 beds</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item xs={12} className={classes.cardBase}></Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item xs={12} className={classes.cardBase}></Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item xs={12} className={classes.cardBase}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default BoxRoomOfAccommodation;
