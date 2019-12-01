import { makeStyles, Theme, Typography, Grid, IconButton, Dialog } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import React, { FC, Fragment, useState } from 'react';
import { Sort } from '@material-ui/icons';
import FilterDrawerMobile from '../Rooms/FilterDrawerMobile';

interface IProps {
  classes?: any;
  isHidden?: boolean;
  showTextCenter?: boolean;
  textCenter?: string;
  showBackAction?: boolean;
  handleBackAction?: () => void;
  showFavoriteAction?: boolean;
  handleFavoriteAction?: () => void;
  showLocationAction?: boolean;
  handleLocationAction?: () => void;
  showFilterAction?: boolean;
  handleFilterAction?: () => void;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxWrapper: {
      display: 'flex',
      alignItems: 'center',
      height: 55
    },
    boxCenter: {
      display: 'flex',
      justifyContent: 'center'
    },
    boxRight: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    textCenter: {
      fontSize: 18,
      fontWeight: 'bold'
    }
  })
);

const NavTop: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const handleFilter = () => {
    setOpenFilter(!openFilter);
  };
  const {
    isHidden,
    showTextCenter,
    textCenter,
    showBackAction,
    handleBackAction,
    showFavoriteAction,
    handleFavoriteAction,
    showLocationAction,
    handleLocationAction,
    showFilterAction,
    handleFilterAction
  } = props;
  return !isHidden ? (
    <Grid container item xs={11} className={classes.boxWrapper}>
      <Grid item xs={4} className={classes.boxLeft}>
        {showBackAction ? (
          <IconButton onClick={handleBackAction}>
            <img src={'/static/images/left-arrow.svg'} width={24} height={24} />
          </IconButton>
        ) : (
          ''
        )}
      </Grid>
      <Grid item xs={4} className={classes.boxCenter}>
        {showTextCenter ? <Typography className={classes.textCenter}>{textCenter}</Typography> : ''}
      </Grid>
      <Grid item xs={4} className={classes.boxRight}>
        {showFavoriteAction ? (
          <IconButton onClick={handleFavoriteAction}>
            <img src={'/static/images/Heart.svg'} width={24} height={24} />
          </IconButton>
        ) : (
          ''
        )}
        {showLocationAction ? (
          <IconButton onClick={handleLocationAction}>
            <img src={'/static/images/maps-and-flags.svg'} width={24} height={24} />
          </IconButton>
        ) : (
          ''
        )}
        {showFilterAction ? (
          <IconButton onClick={() => handleFilter()}>
            <Sort className={classes.btnRight} />
          </IconButton>
        ) : (
          ''
        )}
      </Grid>
      <Dialog fullScreen scroll="paper" open={openFilter} onClose={() => setOpenFilter(false)}>
        <FilterDrawerMobile setIndex={handleFilter} />
      </Dialog>
    </Grid>
  ) : (
    <Fragment></Fragment>
  );
};
NavTop.defaultProps = {
  isHidden: false,
  showTextCenter: true,
  showBackAction: true,
  showFavoriteAction: true,
  showLocationAction: true,
  showFilterAction: false
};

export default NavTop;
