import { useExpandableList } from '@/store/Hooks/filterHooks';
import { makeStyles, Theme, Typography, Link } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import Blue from '@material-ui/core/colors/blue';
import Grey from '@material-ui/core/colors/grey';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Paper from '@material-ui/core/Paper/Paper';
import createStyles from '@material-ui/core/styles/createStyles';
import React, {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
  useContext
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  getDataFilter,
  ResDataFilter,
  useFilterRoom
} from '../../FilterActions/FilterDistrict/context';
import { GlobalContext } from '@/store/Context/GlobalContext';
import mainColor from '@/styles/constants/colors';
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons';

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
      color: Blue[400],
      marginTop: 8,
      paddingLeft: 3
    },
    title: {
      fontWeight: 700,
      paddingTop: 5,
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
    }
  })
);

const DistrictsMobile: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { setOpen, dataClick, setDataClick } = props;
  const { router } = useContext(GlobalContext);
  const city_id = router.query.city_id ? router.query.city_id : undefined;

  const [districts, setDistricts] = useState<ResDataFilter>([]);
  const [districtChunks, isDistrictExpand, setDistrictExpand] = useExpandableList<any>(districts);

  const { data, handleChange } = useFilterRoom(setDataClick, dataClick, setOpen);

  useEffect(() => {
    if (districts.length === 0) {
      getDataFilter(setDistricts, city_id);
    }
  }, []);

  return (
    <Fragment>
      {districtChunks.length > 0 ? (
        <Fragment>
          {districtChunks.map((item, i) => (
            <Fragment key={i}>
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
            </Fragment>
          ))}
          <Link
            component="button"
            variant="body2"
            className={classes.showMore}
            onClick={() => setDistrictExpand(!isDistrictExpand)}>
            {isDistrictExpand ? (
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

export default DistrictsMobile;
