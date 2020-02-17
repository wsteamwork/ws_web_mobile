import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import mainColor from '@/styles/constants/colors';
import { Grid, makeStyles, TextField, Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import SearchDialog from '../SearchDialog';

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 80,
      backgroundColor: '#F6F6F6'
    },
    customTextFieldLT: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#ffffff',
          borderRadius: 25,
          backgroundColor: '#ffffff',
          boxShadow: '0px 9px 20px rgba(0, 0, 0, 0.06)'
        },
        '&.Mui-focused fieldset': {
          border: '1px solid',
          borderColor: mainColor.primaryLT
        }
      }
    },
    customTextFieldST: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#ffffff',
          borderRadius: 25,
          backgroundColor: '#ffffff',
          boxShadow: '0px 9px 20px rgba(0, 0, 0, 0.06)'
        },
        '&.Mui-focused fieldset': {
          border: '1px solid',
          borderColor: mainColor.primary
        }
      }
    },
    multilineColor: {
      color: '#484848',
      fontWeight: theme.typography.fontWeightBold
    },
    inputCustom: {
      height: 13,
      marginLeft: 8,
      zIndex: 2
    }
  })
);

const SearchRoom: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>(
    (state) => state.searchFilter.leaseTypeGlobal
  );
  const [openSearchDialog, setOpenSearchDialog] = useState<boolean>(false);
  const { router } = useContext(GlobalContext);
  const searchText = useSelector<ReducersList, string>((state) => state.searchFilter.searchText);

  const { t } = useTranslation();

  const handleOpenSearchDialog = () => {
    setOpenSearchDialog(true);
  };

  const handleCloseSearchDialog = () => {
    setOpenSearchDialog(false);
  };
  useEffect(() => {
    handleCloseSearchDialog();
  }, [router.query])
  return (
    <Grid container item xs={12} className={classes.boxWrapper}>
      <Grid item xs={11}>
        <TextField
          value={searchText}
          className={leaseTypeGlobal ? classes.customTextFieldLT : classes.customTextFieldST}
          fullWidth={true}
          onClick={handleOpenSearchDialog}
          variant="outlined"
          id="search"
          type="search"
          name="Search"
          placeholder={`${t('rooms:placeholderSearch')}`}
          InputLabelProps={{
            className: classes.multilineColor
          }}
          InputProps={{
            classes: { input: classes.inputCustom }
          }}
        />
      </Grid>
      <SearchDialog handleClose={handleCloseSearchDialog} open={openSearchDialog} />
    </Grid>
  );
};

export default SearchRoom;
