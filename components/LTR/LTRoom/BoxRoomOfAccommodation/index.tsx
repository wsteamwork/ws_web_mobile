import CardSimpleWithIcon from "@/components/Cards/CardSimpleWithIcon";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Grid from '@material-ui/core/Grid/Grid';
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
        <Grid className={classes.listScrollNoPadding}>
          <Grid container item xs={12} spacing={1} className={classes.marginSpacing}>
            <CardSimpleWithIcon data={bedrooms} />
            <CardSimpleWithIcon data={bathrooms} />
            <CardSimpleWithIcon data={kitchens} />
            <CardSimpleWithIcon data={totalArea} />
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default BoxRoomOfAccommodation;
