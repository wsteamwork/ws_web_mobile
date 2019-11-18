import ButtonGlobal from '@/components/ButtonGlobal';
import GridContainer from '@/components/Layout/Grid/Container';
import { AppBar, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import numeral from 'numeral';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  classes?: any;
  priceBasic: number;
  handleOpenBookingDialog?: any;
}

// const useStyles = makeStyles<Theme, IProps>((theme: Theme) => createStyles({}));

const BoxBottomBooking: FC<IProps> = (props) => {
  // const classes = useStyles(props);
  const { priceBasic, handleOpenBookingDialog } = props;
  const { t } = useTranslation();

  return (
    <Grid className="navBottomBook">
      <AppBar position="fixed" color="inherit" className="barSearch">
        <Toolbar className="toolBar">
          <GridContainer xs={12} sm={12} md={11} lg={10}>
            <Grid container spacing={2} className={'container'}>
              <Grid item xs>
                <Grid container>
                  <Grid item xs>
                    <div>
                      <Typography className={'price'}>
                        {numeral(priceBasic).format('0,0')} {t('longtermroom:currency')}
                      </Typography>
                      <Typography variant="subtitle2">{t('longtermroom:priceBasic')}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} sm={3}>
                <ButtonGlobal
                  background="linear-gradient(to right, #667eea, #764ba2);"
                  padding="0px"
                  width="100%"
                  onClick={handleOpenBookingDialog}
                  className="btBook">
                  {t('room:boxBooking:bookNow')}
                </ButtonGlobal>
              </Grid>
            </Grid>
          </GridContainer>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default BoxBottomBooking;
