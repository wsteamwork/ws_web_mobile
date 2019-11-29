import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { Button, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { FC, Fragment, MouseEvent, useContext, useState } from 'react';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
import { useSelector } from 'react-redux';
import CardWrapperItem from '../CardWrapperItem';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    name: {
      fontWeight: theme.typography.fontWeightBold,
      marginBottom: theme.spacing(1),
      color: '#484848'
    },
    tagP_inHtmlPare: {
      width: '100%',
      display: 'inline',
    },
    button: {
      padding: 0,
      textTransform: 'initial',
      color: '#1d8df7',
      '&:hover': {
        backgroundColor: '#ffffff'
      },
    },
    roomName: {
      display: 'inline-block',
      alignItems: 'center',
    }
  })
);

const NameAndDescription: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  const transformHtmlContent = (node: any, index: number) => {
    if (node.name === 'p' || node.name === 'image') {
      node.attribs.class = classes.tagP_inHtmlPare;
      return convertNodeToElement(node, index, transformHtmlContent);
    }
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const openUpdate = () => {
    router.push(`/host/update-listing/${id}/description`);
  };
  return (
    <Fragment>
      {listing ? (
        <CardWrapperItem title="Tên và mô tả tiếng Việt" onClick={openUpdate}>
          <Typography variant="subtitle1" className={classes.name}>
            {listing.detail_room.vi.name}
          </Typography>
          <Grid>
            <span>
              {isOpen ? (
                <span className={classes.roomName}>
                  {ReactHtmlParser(listing.detail_room.vi.description, {
                    transform: transformHtmlContent
                  })}
                </span>
              ) : (
                  <span className={classes.roomName}>
                    {ReactHtmlParser(listing.detail_room.vi.description.substring(0, 150), {
                      transform: transformHtmlContent
                    })}
                    <Button onClick={toggle} className={classes.button}>
                      &#8230;Xem thêm
                  </Button>
                  </span>
                )}
            </span>
          </Grid>
        </CardWrapperItem>
      ) : (
          ''
        )}
    </Fragment>
  );
};
export default NameAndDescription;
