import { GlobalContext } from '@/store/Context/GlobalContext';
import { Paper, Tab, Tabs, Typography } from '@material-ui/core';
import React, { ChangeEvent, FC, Fragment, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BookingList from './BookingList';

function TabContainer(props: any) {
  return (
    <Typography component="div" style={{ padding: 24 }}>
      {props.children}
    </Typography>
  );
}

const BookingProfile: FC = (props) => {
  const { t } = useTranslation();
  const [val, setVal] = useState<number>(0);
  const { width } = useContext(GlobalContext);

  const handleChange = (event: ChangeEvent<{}>, values: number) => {
    setVal(values);
  };

  return (
    <Fragment>
      <Paper elevation={0} className={'bookingProfile'}>
        <Tabs
          value={val}
          onChange={handleChange}
          classes={{ root: 'tabsRoot', indicator: 'tabsIndicator' }}
          variant={width == 'xs' ? 'scrollable' : 'fullWidth'}
          scrollButtons="auto">
          <Tab
            disableRipple
            classes={{ root: 'tabRoot', selected: 'tabSelected' }}
            label={t('profile:waitConf')}
          />
          <Tab
            disableRipple
            classes={{ root: 'tabRoot', selected: 'tabSelected' }}
            label={t('profile:comingSoon')}
          />
          <Tab
            disableRipple
            classes={{ root: 'tabRoot', selected: 'tabSelected' }}
            label={t('profile:finish')}
          />
          <Tab
            disableRipple
            classes={{ root: 'tabRoot', selected: 'tabSelected' }}
            label={t('profile:cancelled')}
          />
        </Tabs>

        <div>
          {val === 0 && (
            <TabContainer>
              <BookingList status={1} />
            </TabContainer>
          )}
        </div>
        <div>
          {val === 1 && (
            <TabContainer>
              <BookingList status={2} />
            </TabContainer>
          )}
        </div>
        <div>
          {val === 2 && (
            <TabContainer>
              <BookingList status={4} />
            </TabContainer>
          )}
        </div>
        <div>
          {val === 3 && (
            <TabContainer>
              <BookingList status={5} />
            </TabContainer>
          )}
        </div>
      </Paper>
    </Fragment>
  );
};

export default BookingProfile;
