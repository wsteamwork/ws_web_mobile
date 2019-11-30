import mainColor from '@/styles/constants/colors';
import { typeService } from '@/types/Requests/LTR/CreateListing/Step3/ServicesFee';
import { detailPriceLT } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { formatMoney } from '@/utils/mixins';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, Theme, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  classes?: any,
  prices: detailPriceLT[],
  included_fee: typeService[],
  included_services: string[],
  not_included_services: string[],
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      borderRadius: 8,
      overflow: 'hidden',
    },
    name: {
      fontSize: 15,
      lineHeight: '20px',
      letterSpacing: -0.24,
      color: mainColor.titleText,
      fontWeight: 'bold'
    },
    heading: {
      flexShrink: 0,
      fontWeight: 600,
      fontSize: 13
    },
    expansionPanel: {
      margin: '8px 0 12px !important'
    },
    expSummary: {
      padding: '8px 0',
      maxHeight: 38,
    },
    expDetails: {
      padding: '8px 0',
      display: 'block'
    },
    rowTable: {
      padding: '16px 0',
      borderBottom: '1px solid #E0E0E0'
    },
    sumaryExpend:{
      margin:0
    }
  })
);

const BoxTablePrices: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { prices, included_fee, not_included_services, included_services } = props;
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [expandedServices, setEexpandedServices] = useState<boolean>(true);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const handleChangeServices = () => {
    setEexpandedServices(!expandedServices);
  };

  return (
    <Fragment>
      <Typography variant='h5' className={classes.name} gutterBottom>
        {t('room:feeList')}
      </Typography>
      {included_services && included_services.length ? (
        <Typography variant='subtitle2' className={classes.subName} gutterBottom>
          {t('longtermroom:priceIncludedFee')} : {
            included_services.map((value, index) => (
              <span key={index}>{value}{included_services.length !== (index + 1) ? ', ' : ''} </span>
            ))
          }
        </Typography>
      ) : (<Fragment />)}

      <Paper className={classes.root} elevation={0}>

      {included_services && included_services.length ? (
          <Fragment>
            <ExpansionPanel expanded={expandedServices} elevation={0} onChange={handleChangeServices} className={classes.expansionPanel}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                classes={{ root: classes.expSummary }}
              >
                <Typography variant='subtitle1' className={classes.heading}>
                  {t('longtermroom:otherFee')} ({t('rooms:currency')})
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails classes={{ root: classes.expDetails }}>
                {included_fee.map((o, i) => {
                  if (o.included == 1) {
                    return (
                      <Grid container key={i} justify='space-between' className={classes.rowTable}>
                        <Grid item>
                          {o.name}
                        </Grid>
                        <Grid item>{`${t('longtermroom:feeIncluded')}`}</Grid>
                        {/* <Grid item>{o.value == 0 ? `${t('longtermroom:feeIncluded')}` : `${formatMoney(o.value)}`}</Grid> */}
                      </Grid>
                    )
                  } else {
                    return (
                      <Grid container key={i} justify='space-between' className={classes.rowTable}>
                        <Grid item>
                          {o.name}
                        </Grid>
                        <Grid item>{o.calculate_function == 3 || o.calculate_function == 6 ? `${o.calculate_function_txt}` : `${formatMoney(o.value)} ${o.calculate_function_txt}`}</Grid>
                      </Grid>
                    )
                  }
                })}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Fragment>
        ) : (<Fragment />)}

        <ExpansionPanel expanded={expanded} elevation={0} onChange={handleChange} className={classes.expansionPanel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            classes={{ root: classes.expSummary }}
          >
            <Typography variant='subtitle1' className={classes.heading}>
              {t('room:feeListLongterm')} ({t('rooms:currency')})
              </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails classes={{ root: classes.expDetails }}>
            {prices && prices.length ? (
              prices.map((o, i) => (
                <Grid container key={i} justify='space-between' className={classes.rowTable}>
                  <Grid item>
                    {o.term}
                  </Grid>
                  <Grid item>{`${formatMoney(o.price)}`}</Grid>
                </Grid>
              ))
            ) : (
                <Grid container justify='space-between' className={classes.rowTable}>
                  <Grid item>
                    {t('longtermroom:notFoundData')}
                  </Grid>
                  <Grid item>0</Grid>
                </Grid>
              )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Paper>
    </Fragment>
  );
};

export default BoxTablePrices;
