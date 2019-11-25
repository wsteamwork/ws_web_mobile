import { useExpandableList } from '@/store/Hooks/filterHooks';
import { makeStyles, Theme, Typography, Link, Grid, Divider } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import Blue from '@material-ui/core/colors/blue';
import Grey from '@material-ui/core/colors/grey';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Paper from '@material-ui/core/Paper/Paper';
import createStyles from '@material-ui/core/styles/createStyles';
import React, { Dispatch, FC, Fragment, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getDataFilter,
  ResDataFilter,
  useFilterRoom
} from '../../FilterActions/FilterRoom/context';
import mainColor from '@/styles/constants/colors';
import { KeyboardArrowUpRounded, KeyboardArrowDownRounded } from '@material-ui/icons';
interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setDataClick: Dispatch<SetStateAction<number[]>>;
  dataClick: number[];
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    ul: {
      listStyleType: 'none',
      marginBlockStart: '0px',
      paddingInlineStart: '0.4rem',
      paddingBlockStart: '0.5rem',
      marginBlockEnd: 0
    },
    checkboxRoot: {
      padding: 5,
      paddingLeft: 3
    },
    showMore: {
      textAlign: 'center',
      padding: 5,
      paddingLeft: 5,
      color: Blue[400],
      marginBottom: 16,
      marginTop: 8
    },
    title: {
      fontWeight: 700,
      paddingTop: 5,
      color: '#8A8A8F'
    },
    customLabel: {
      fontWeight: 'bold',
      color: mainColor.titleText
    },
    iconMore: {
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bold'
    },
    iconLess: {
      display: 'flex',
      alignItems: 'end',
      fontWeight: 'bold'
    },
    divider: {
      margin: '24px 0',
      backgroundColor: '#D8D8D8',
      width: '100%'
    }
  })
);

const AmentitesMobile: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { setOpen, dataClick, setDataClick } = props;

  const [comforts, setComforts] = useState<ResDataFilter>([]);
  const [comfortChunks, isComfortExpand, setComfortExpand] = useExpandableList<any>(comforts);

  const { data, handleChange } = useFilterRoom(setDataClick, dataClick, setOpen);

  useEffect(() => {
    if (comforts.length === 0) {
      getDataFilter(setComforts);
    }
  }, []);

  return (
    <Fragment>
      {comfortChunks.length > 0 ? (
        <Fragment>
          {comfortChunks.map((item, i) => (
            <Fragment key={i}>
              <Typography variant="subtitle2" className={classes.title}>
                {item[0]}
              </Typography>
              <ul className={classes.ul}>
                {item[1].map((o) => (
                  <li key={o.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={o.id.toString()}
                          color="primary"
                          onChange={handleChange(o.id)}
                          value={o.id.toString()}
                          checked={dataClick.some((x) => x === o.id)}
                          classes={{
                            root: classes.checkboxRoot
                          }}
                        />
                      }
                      label={<Typography className={classes.customLabel}>{o.name}</Typography>}
                    />
                  </li>
                ))}
              </ul>
              {comfortChunks.length !== i + 1 && (
                <Grid container item xs={12}>
                  <Divider className={classes.divider} />
                </Grid>
              )}
            </Fragment>
          ))}
          <Link
            component="button"
            variant="body2"
            className={classes.showMore}
            onClick={() => setComfortExpand(!isComfortExpand)}>
            {isComfortExpand ? (
              <Typography className={classes.iconLess}>
                {t('rooms:readLess')}
                <KeyboardArrowUpRounded />
              </Typography>
            ) : (
              <Typography className={classes.iconMore}>
                {t('rooms:readMore')}
                <KeyboardArrowDownRounded />
              </Typography>
            )}
          </Link>
        </Fragment>
      ) : (
        ''
      )}
    </Fragment>
  );
};

export default AmentitesMobile;
