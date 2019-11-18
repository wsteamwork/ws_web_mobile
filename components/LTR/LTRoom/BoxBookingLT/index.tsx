import ButtonGlobal from '@/components/ButtonGlobal';
import HostInfo from '@/components/HostInfo';
import { formatMoney } from '@/utils/mixins';
import { Divider, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
interface IProps {
  classes?: any;
  priceBasic: number | string;
  id: number;
  avatar: string;
  avatar_url: string;
  name: string;
  number_room: number;
  handleOpenBookingDialog?: any;

}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxContainer: {
      padding: 16,
      boxShadow: '0 3px 35px 0 rgba(132,135,138,.14)',
      position: 'sticky',
      top: '15%'
    },
    rowMargin: {
      margin: '16px 0'
    }
  })
);

const BoxBookingLT: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {
    id,
    avatar,
    avatar_url,
    name,
    number_room,
    priceBasic,
    handleOpenBookingDialog,
  } = props;
  const { t } = useTranslation();

  return (
    <div className={classes.boxContainer}>
      <Typography variant="h6">{formatMoney(priceBasic)} {t('longtermroom:currency')}</Typography>
      <Typography variant="subtitle2">{t('longtermroom:priceBasic')}</Typography>

      <div className={classes.rowMargin}>
        <ButtonGlobal background="linear-gradient(to right, #667eea, #764ba2);" padding="0px" width="100%" onClick={handleOpenBookingDialog}>
          <p className="flex_center" style={{ color: '#ffffff' }}>
            {/* <OfflineBoltRounded /> */}
            &nbsp;&nbsp;{t('longtermroom:viewSchedule')}
          </p>
        </ButtonGlobal>
      </div>

      <Divider className={classes.rowMargin} />

      <HostInfo
        id={id}
        avatar={avatar}
        avatar_url={avatar_url}
        name={name}
        number_room={number_room}
        maxWidth="100%"
        border="none"
      />
    </div>
  );
};

export default BoxBookingLT;
