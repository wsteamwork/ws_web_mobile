import createStyles from '@material-ui/core/styles/createStyles';
import React, { ComponentType, Fragment, useContext } from 'react';
import { compose } from 'recompose';
import { Coords, ChildComponentProps } from 'google-map-react';
import '@/styles/Custom/bubble.scss';
import classNames from 'classnames';
import { formatMoney } from '@/utils/mixins';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import Cookies from 'universal-cookie';
interface IProps extends Required<Coords> {
  classes?: any;
  room: LTRoomIndexRes;
  isHover: boolean;
}

interface LocalProps extends IProps, ChildComponentProps {}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      fontSize: '1rem',
      transform: 'translate(-50%, -135%)',
      transition: theme.transitions.create(['all'], {
        duration: 200,
        easing: 'ease-in-out'
      })
    },
    hover: {
      zIndex: 2,
      backgroundColor: '#54D3C2',
      border: '1px solid #54D3C2',
      color: '#ffffff',
      transition: theme.transitions.create(['all'], {
        duration: 200,
        easing: 'ease-in-out'
      })
    },
    overBubble: {
      [theme.breakpoints.only('xs')]: {
        minWidth: 75
      }
    }
  })
);

// @ts-ignore
const MapMarker: ComponentType<IProps> = (props: LocalProps) => {
  const classes = useStyles(props);
  const { room, isHover } = props;
  const { state } = useContext(RoomIndexContext);
  const cookies = new Cookies();

  return (
    <Fragment>
      <div
        className={classNames(
          'speech-bubble',
          classes.root,
          classes.overBubble,
          {
            [classes.hover]: isHover
          },
          classes.speechBubbleOver
        )}>
        <span>
          {cookies.get('initLanguage') == 'en' ? '$' : 'đ'}
          {formatMoney(room.price_display, 0)}
        </span>
      </div>
    </Fragment>
  );
};

const memoCheck = (prevProps: IProps, nextProps: IProps) => {
  return prevProps.isHover === nextProps.isHover;
};
export default compose<IProps, any>()(React.memo(MapMarker, memoCheck));
