import { makeStyles, Theme, Grid, TextField } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import React, { FC } from 'react';
import mainColor from '@/styles/constants/colors';
import { useTranslation } from 'react-i18next';

interface IProps {
  classes?: any;
  handleOpenSearch?: () => void;
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
    customTextField: {
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
    multilineColor: {
      color: '#484848',
      fontWeight: theme.typography.fontWeightBold
    },
    inputCustom: {
      height:13,
      marginLeft: 8,
      zIndex: 2
    }
  })
);

const SearchRoom: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { handleOpenSearch } = props;
  const { t } = useTranslation();
  return (
    <Grid container item xs={12} className={classes.boxWrapper}>
      <Grid item xs={11}>
        <TextField
          className={classes.customTextField}
          fullWidth={true}
          onFocus={handleOpenSearch}
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
    </Grid>
  );
};

export default SearchRoom;
