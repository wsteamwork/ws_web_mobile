import {
  AppBar,
  Box,
  createStyles,
  Grid,
  Tab,
  Tabs,
  Theme,
  withStyles,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React, { FC, Fragment } from 'react';
import BookingListLT from '../BookingListLT';
import { UPCOMING, CURRENT, FINISHED } from '../BookingListLT/BookingCardLT';
import { useTranslation } from 'react-i18next';
interface IProps {
  classes?: any;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}
interface StyledTabProps {
  label: string;
}
const AntTabs = withStyles({
  root: {
    border: '1px solid #ffffff',
    borderRadius: 29,
    backgroundColor: '#F6F6F6',
    padding: 4
  },
  indicator: {
    height: 0
  }
})(Tabs);

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      fontSize: 15,
      '&:hover': {
        color: '#54D3C2',
        opacity: 1
      },
      '&$selected': {
        color: '#54D3C2',
        lineHeight: '20px',
        letterSpacing: '-0.24px',
        fontWeight: theme.typography.fontWeightBold
      },
      '&:focus': {
        color: '#54D3C2'
      }
    },
    selected: {
      color: '#54D3C2'
    }
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      style={{ width: '100%' }}
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      <Box pt={3}>{children}</Box>
    </Typography>
  );
};

export const a11yProps = (index: any) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
};
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    marginLabel: {
      margin: '24px 0'
    },
    wrapperTab: {
      boxShadow: 'none'
    },
    name: {
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848',
      fontSize: 24
    },
    custom_link_bread: {
      color: '#1d8df7'
    }
  })
);

const BookingTabs: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Fragment>
      <Grid container justify="center" alignContent="center">
        <Grid item xs={12} className={classes.marginLabel}>
          <Grid className={classes.root}>
            <AppBar position="static" color="inherit" className={classes.wrapperTab}>
              <AntTabs
                value={value}
                onChange={handleChange}
                aria-label="ant example"
                variant="fullWidth"
                scrollButtons="off">
                   
                <AntTab label={t('longtermbooking:upcoming')} {...a11yProps(0)} />
                <AntTab label={t('longtermbooking:current')} {...a11yProps(1)} />
                <AntTab label={t('longtermbooking:Finished')} {...a11yProps(2)} />
              </AntTabs>
              <Typography className={classes.padding} />
            </AppBar>

            {value === 0 && (
              <TabPanel value={value} index={0}>
                <BookingListLT status={['1', '2']} bookingType={UPCOMING}/>
              </TabPanel>
            )}
            {value === 1 && (
              <TabPanel value={value} index={1}>
                <BookingListLT status={['3']} bookingType={CURRENT}/>
              </TabPanel>
            )}
            {value === 2 && (
              <TabPanel value={value} index={2}>
                <BookingListLT status={['4', '5']} bookingType={FINISHED}/>
              </TabPanel>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default BookingTabs;
