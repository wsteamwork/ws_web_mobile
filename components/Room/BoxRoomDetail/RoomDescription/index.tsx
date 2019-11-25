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
import mainColor from '@/styles/constants/colors';

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      lineHeight: '1.8rem'
    },
    name: {
      fontSize: 15,
      lineHeight: '20px',
      letterSpacing: -0.24,
      color: mainColor.titleText,
      fontWeight: 'bold'
    },
    tagP_inHtmlPare: {
      width: '100%',
      display: 'inline',
      lineHeight: '20px',
      letterSpacing: -0.24,
    },
    btnLess: {
      padding: 0,
      justifyContent: 'flex-start',
      margin: '8px 0',
      textTransform: 'initial',
    },
    title: {
      fontWeight: 700,
      margin: '8px 0',
    },
    txtDes: {
      display: 'inline-block',
      alignItems: 'center',
      marginTop: 10
    },
    btnMore: {
      padding: 0,
      textTransform: 'initial',
      color: '#1d8df7',
      '&:hover': {
        backgroundColor: '#ffffff'
      },
    },
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
  const desHTML = description ? `${description}` : '';
  const spaceHTML = space ? `<div> ${space} </div>` : '';
  const noteHTML = note ? `<div> ${note} </div>` : '';

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Typography variant="h5" className={classes.name}>
          {t('room:description')}
        </Typography>

        {isOpen ? (
          <Fragment>
            <Grid item xs={12}>
              {ReactHtmlParser(isPreviewPage && !desHTML ? notFoundContent : desHTML, {
                transform: transformHtmlContent
              })}
            </Grid>
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
            <Button onClick={toggle} className={classes.btnLess} style={{ color: `${leaseTypeGlobal ? '#673ab7' : '#ff9800'}` }} size="small">
              {t('rooms:readLess')}
            </Button>
          </Fragment>
        ) : (
            <span className={classes.txtDes}>
              {ReactHtmlParser(isPreviewPage && !desHTML ? notFoundContent : desHTML.substring(0, 150), {
                transform: transformHtmlContent
              })}
              <Button onClick={toggle} className={classes.btnMore}>
                &#8230;{t('room:readMore')}
              </Button>
            </span>
          )}
      </Grid>
    </Fragment>
  );
};

export default RoomDescription;
