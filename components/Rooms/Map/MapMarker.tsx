import createStyles from '@material-ui/core/styles/createStyles';
import React, { ComponentType, Fragment, useContext, memo } from 'react';
import { compose } from 'recompose';
import { Coords, ChildComponentProps } from 'google-map-react';
import '@/styles/Custom/bubble.scss';
import classNames from 'classnames';
import { formatMoney } from '@/utils/mixins';
import { scroller } from 'react-scroll';
import { ReactScrollLinkProps } from 'react-scroll/modules/components/Link';
import mainColor from '@/styles/constants/colors';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';

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
        minWidth: 110
      }
    }
  })
);

// @ts-ignore
const MapMarker: ComponentType<IProps> = (props: LocalProps) => {
  const classes = useStyles(props);
  const { room, isHover } = props;
  console.log('isHover marker', isHover)
  const { width } = useContext(GlobalContext);

  const markerEvent = () => {
    let id = `room-${room.id}`;
    let offset = -80;
    if (width === 'md' || width === 'sm') {
      offset = Math.floor(window.innerHeight / -1.9);
    }

    let effect: ReactScrollLinkProps = {
      containerId: 'room-map-list',
      to: id,
      smooth: 'easeInOutQuad',
      offset
    };
    scroller.scrollTo(id, effect);
  };

  return (
    <Fragment>
      <div
        onClick={markerEvent}
        className={classNames(
          'speech-bubble',
          classes.root,
          classes.overBubble,
          {
            [classes.hover]: isHover
          },
          classes.speechBubbleOver
        )}>
        <span>đ {formatMoney(room.price_display, 0)}</span>
      </div>
    </Fragment>
  );
};

const memoCheck = (prevProps: IProps, nextProps: IProps) => {
  return prevProps.isHover === nextProps.isHover;
};
export default compose<IProps, any>()(React.memo(MapMarker, memoCheck));
