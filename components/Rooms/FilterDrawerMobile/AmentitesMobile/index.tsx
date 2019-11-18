import { useExpandableList } from '@/store/Hooks/filterHooks';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import Blue from '@material-ui/core/colors/blue';
import Grey from '@material-ui/core/colors/grey';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Paper from '@material-ui/core/Paper/Paper';
import createStyles from '@material-ui/core/styles/createStyles';
import React, { Dispatch, FC, Fragment, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDataFilter, ResDataFilter, useFilterRoom } from '../../FilterActions/FilterRoom/context';
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
      padding: 5
    },
    showMore: {
      textAlign: 'center',
      padding: 5,
      backgroundColor: Grey[200],
      color: Blue[400]
    },
    title: {
      fontWeight: 700,
      paddingTop: 5
    }
  })
);

const AmentitesMobile: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { setOpen, dataClick, setDataClick } = props;

  const [comforts, setComforts] = useState<ResDataFilter>([]);
  const [comfortChunks, isComfortExpand, setComfortExpand] = useExpandableList<any>(
    comforts
  );

  const { data, handleChange } = useFilterRoom(
    setDataClick,
    dataClick,
    setOpen
  );

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
                      label={o.name}
                    />
                  </li>
                ))}
              </ul>
            </Fragment>
          ))}
          <Paper
            elevation={0}
            className={classes.showMore}
            onClick={() => setComfortExpand(!isComfortExpand)}>
            {isComfortExpand ? t('rooms:readLess') : t('rooms:readMore')}
          </Paper>
        </Fragment>
      ) : (
          ''
        )}
    </Fragment>
  );
};

export default AmentitesMobile;
