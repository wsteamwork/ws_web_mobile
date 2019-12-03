import { createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import { FC, Fragment } from "react";

interface IProps {
  bedrooms?: { imageIcon: string, title: string, subtitle: string },
  bathrooms?: { imageIcon: string, title: string, subtitle: string },
  kitchens?: { imageIcon: string, title: string, subtitle: string },
  totalArea?: { imageIcon: string, title: string, subtitle: string },
  livingrooms?: { imageIcon: string, title: string, subtitle: string }
  serviceFee?: { imageIcon: string, title: string, subtitle: string }
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

const BoxRoomOfAccommodation: FC<IProps> = (props) => {
  const classes = useStyles(props)
  const { bedrooms, bathrooms, totalArea, livingrooms, kitchens, serviceFee } = props;

  return (
    <Fragment>
      <Grid container>
        {/* <section className={'property-list-horizontal-scroll-container'}> */}
        <Grid className={classes.listScrollNoPadding}>
          <Grid container item xs={12} spacing={1} className={classes.marginSpacing}>
            <Grid item xs={6} md={3} sm={3}>
              <Grid item xs={12} className={classes.cardBase}>
                <Grid container spacing={1}>
                  <Grid item xs={4} className={classes.imgContainer}>
                    <img className={classes.iconImage} src={bedrooms.imageIcon} alt={bedrooms.title} />
                  </Grid>
                  <Grid container item xs={7} className={classes.textContainer}>
                    <Grid item xs={12}>
                      <Typography variant="h6" className={classes.title}>{bedrooms.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">{bedrooms.subtitle}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} md={3} sm={3}>
              <Grid item xs={12} className={classes.cardBase}>
                <Grid container spacing={1}>
                  <Grid item xs={4} className={classes.imgContainer}>
                    <img className={classes.iconImage} src={bathrooms.imageIcon} alt={bathrooms.title} />
                  </Grid>
                  <Grid container item xs={7} className={classes.textContainer}>
                    <Grid item xs={12}>
                      <Typography variant="h6" className={classes.title}>{bathrooms.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">{bathrooms.subtitle}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* </Grid> */}
            {/* <Grid container item xs={6} spacing={1} className={classNames('property-item-container', classes.marginSpacing)}> */}
            <Grid item xs={6} md={3} sm={3}>
              <Grid item xs={12} className={classes.cardBase}>
                <Grid container spacing={1}>
                  <Grid item xs={4} className={classes.imgContainer}>
                    <img className={classes.iconImage} src={totalArea.imageIcon} alt={totalArea.title} />
                  </Grid>
                  <Grid container item xs={7} className={classes.textContainer}>
                    <Grid item xs={12}>
                      <Typography variant="h6" className={classes.title}>{totalArea.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">{totalArea.subtitle}m<sup>2</sup></Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} md={3} sm={3}>
              <Grid item xs={12} className={classes.cardBase}>
                <Grid container spacing={1}>
                  <Grid item xs={4} className={classes.imgContainer}>
                    <img className={classes.iconImage} src={kitchens.imageIcon} alt={kitchens.title} />
                  </Grid>
                  <Grid container item xs={7} className={classes.textContainer}>
                    <Grid item xs={12}>
                      <Typography variant="h6" className={classes.title}>{kitchens.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">{kitchens.subtitle}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* </section> */}
      </Grid>
    </Fragment>
  )
}

export default BoxRoomOfAccommodation;
