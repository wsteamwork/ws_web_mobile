import { ReducersList } from '@/store/Redux/Reducers';
import { Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
// import deepPurple from '@material-ui/core/colors/deepPurple';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, MouseEvent, useState } from 'react';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      lineHeight: '1.8rem'
    },
    name: {
      fontWeight: 700,
      [theme.breakpoints.down('xs')]: {
        margin: '1.5rem 0 0.4rem 0'
      }
    },
    icon: {
      marginBottom: 10
    },
    button: {
      // color: deepPurple[500],
      padding: 0,
      '&:hover': {
        backgroundColor: '#fff'
      },
      '&:focus': {
        backgroundColor: '#fff'
      }
    },
    iconPlus: {
      fontSize: '15px'
    },
    title: {
      fontWeight: 700,
      margin: '8px 0',
    }
  })
);

interface IProps {
  description: string,
  space: string,
  note: string,
  isPreviewPage?: boolean,
}

const RoomDescription: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  // const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);
  const { description, note, space, isPreviewPage } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);

  const toggle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const transformHtmlContent = (node: any, index: number) => {
    if (node.name === 'p' || node.name === 'image') {
      node.attribs.class = classes.tagP_inHtmlPare;
      return convertNodeToElement(node, index, transformHtmlContent);
    }
  };

  const notFoundContent = `<p> ${t('room:notFoundContent')} </p>`;
  const desHTML = description ? `<div> ${description} </div>` : '';
  const spaceHTML = space ? `<div> ${space} </div>` : '';
  const noteHTML = note ? `<div> ${note} </div>` : '';

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.name}>
            {t('rooms:description')}
          </Typography>
          {ReactHtmlParser(isPreviewPage && !desHTML ? notFoundContent : desHTML, {
            transform: transformHtmlContent
          })}
        </Grid>
        {isOpen ? (
          <Fragment>
            <Grid item xs={12}>
              <Typography variant='subtitle2' className={classes.title}>
                {t('room:space')}
              </Typography>
              {ReactHtmlParser(isPreviewPage && !spaceHTML ? notFoundContent : spaceHTML, {
                transform: transformHtmlContent
              })}
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2' className={classes.title}>
                {t('room:rules')}
              </Typography>
              {ReactHtmlParser(isPreviewPage && !noteHTML ? notFoundContent : noteHTML, {
                transform: transformHtmlContent
              })}
            </Grid>
            <Button onClick={toggle} className={classes.button} style={{ color: `${leaseTypeGlobal ? '#673ab7' : '#ff9800'}` }} size="small">
              {t('rooms:readLess')}
            </Button>
          </Fragment>
        ) : (
            <Button onClick={toggle} className={classes.button} style={{ color: `${leaseTypeGlobal ? '#673ab7' : '#ff9800'}` }} size="small">
              &#8230; {t('rooms:readMore')}
            </Button>
          )}
      </Grid>
    </Fragment>
  );
};

export default RoomDescription;
