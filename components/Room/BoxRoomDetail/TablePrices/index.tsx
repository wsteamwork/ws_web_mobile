import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { formatMoney } from '@/utils/mixins';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import React, { FC, Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  classes?: any,
  room: RoomIndexRes
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      borderRadius: 8,
      overflow: 'hidden',
    },
    name: {
      fontWeight: 700,
      margin: '1rem 0 1rem 0'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '50%',
      flexShrink: 0,
    },
    expansionPanel: {
      margin: '1px 0 !important'
    }
  })
);

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#6b6b6b',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      border: 'none'
    },
  }),
)(TableCell);

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#f6f6f6',
      },
    },
  }),
)(TableRow);

function createData(name: string, fee: string) {
  return { name, fee };
}

const TablePrices: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { room } = props;
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };
  const rows = [
    createData(`${t('room:serviceFee')}`, `${formatMoney(room.cleaning_fee)}`),
    createData(` ${t('room:surchargeGuests') + ' ' + (room.max_guest + 1)}`, `${formatMoney(room.price_charge_guest)}`),
    createData(`${t('room:surchargeHours')}`, `${formatMoney(room.price_after_hour)}`),
    createData(`${t('room:surchargeLateCheckout')}`, `${formatMoney(room.price_after_hour)}`),
  ];
  const formatDayVN = (day: number, local: string) => {
    const dayofWeek = moment().isoWeekday(day).locale(local).format('dddd');
    const dayUpcase = dayofWeek[0].toUpperCase() + dayofWeek.substring(1);
    return dayUpcase;
  };

  return room && (
    <Fragment>
      <Typography variant='h5' className={classes.name}>
        {t('room:feeList')}
      </Typography>

      <Paper className={classes.root} elevation={0}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>{t('room:surchargeList')}</StyledTableCell>
              <StyledTableCell align="right">{t('room:surcharge')} (VND)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.fee}</StyledTableCell>
              </StyledTableRow>
            ))}
            {room.prices.data.sort().map(row => (
              row.weekday ? (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row" style={{}}>
                    {formatDayVN(row.weekday - 1, t('room:lang'))}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {`${formatMoney(row.price_day)}`}
                  </StyledTableCell>
                </StyledTableRow>
              ) : ''
            ))}
          </TableBody>
        </Table>
        <ExpansionPanel expanded={expanded} elevation={0} onChange={handleChange} className={classes.expansionPanel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              {t('room:priceHolidays')}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {room.prices.data.map(row => (
              !row.weekday ? (
                <Grid container key={row.id}>
                  <Grid item xs={6}>
                    <Typography align='center' gutterBottom variant='subtitle2' style={{ fontWeight: 600 }}>
                      {row.day}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='center' gutterBottom variant='subtitle2' style={{ fontWeight: 600 }}>
                      {`${formatMoney(row.price_day)}`}
                    </Typography>
                  </Grid>
                </Grid>
              ) : ''
            ))}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Paper>
    </Fragment>
  );
};

export default TablePrices;
