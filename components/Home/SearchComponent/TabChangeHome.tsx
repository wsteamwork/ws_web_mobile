import { a11yProps } from '@/pages/host/update-listing/[id]';
import { Tab, Tabs, Theme } from '@material-ui/core';
import { TabsProps } from '@material-ui/core/Tabs';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';

interface IProps extends TabsProps {
  classes?: any,
  tab: testTab[],
}

interface testTab {
  label: string
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      top: '-7vh',
      position: 'absolute'
    },
    indicator: {
      height: '100%',
      borderRadius: 4,
      zIndex: -1,
    },
    selectedLT: {
      color: '#fff !important',
      background: 'linear-gradient(to right, #667eea, #764ba2);'
    },
    selectedST: {
      color: '#fff !important',
      background: 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(253,193,104,1) 0%, rgba(251,128,128,1) 90% );'
    },
    rootTab: {
      textTransform: 'initial',
      margin: '0 8px 0 0',
      minWidth: 0,
      [theme.breakpoints.up('md')]: {
        minWidth: 0
      },
      backgroundColor: 'rgba(225,225,225, 0.5)',
      borderRadius: 4,
      opacity: 0.9,
      padding: '0 24px'
    },
    wrapper: {
      letterSpacing: 0.5,
      // color: '#323232',
      fontWeight: 700,
      fontSize: 18,
      [theme.breakpoints.only('xs')]: {
        fontSize: 16,
      }
    }
  })
);

const TabChangeHome: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { tab } = props;

  return (
    <Tabs
      {...props}
      classes={{
        root: classes.root,
        indicator: classes.indicator
      }}
    >
      {tab.map((proptab, i) =>
        <Tab key={i} {...proptab}
          classes={{
            root: classes.rootTab,
            wrapper: classes.wrapper,
            selected: i == 1 ? classes.selectedLT : classes.selectedST
          }}
          {...a11yProps(i)}
        />
      )}
    </Tabs>
  );
};

TabChangeHome.defaultProps = {
  tab: []
};

export default TabChangeHome;
