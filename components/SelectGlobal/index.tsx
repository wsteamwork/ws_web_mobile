import React, { FC } from 'react';
import { makeStyles, createStyles, withStyles } from '@material-ui/styles';
import Select, { SelectProps } from '@material-ui/core/Select';
import { Theme, FormControl, MenuItem, Paper, InputBase } from '@material-ui/core';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

export const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3)
      }
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ddd',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
      }
    }
  })
)(InputBase);

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    inputOutline: {
      border: 'none'
    },
    menuSelect: {
      maxHeight: 'calc(100% - 60%)'
    },
    formControl: {
      width: '100%',
      backgroundColor: '#ffffff'
    },
    iconSelect: {
      right: 8,
    }
  })
);

interface IProps extends SelectProps {
  value?: string | number;
  displayEmpty?: boolean;
  arrItem: any[];
}

const SelectGlobal: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { arrItem } = props;
  const [value, setValue] = React.useState('');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
  };
  const arrMenuItem = () => {
    return arrItem.map((obj, i) => {
      return (
        <MenuItem key={i} value={i}>
          {obj}
        </MenuItem>
      );
    });
  };

  return (
    <Paper square elevation={0}>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select
          MenuProps={{
            classes: { paper: classes.menuSelect }
          }}
          classes={{ icon: classes.iconSelect }}
          onChange={handleChange}
          input={<BootstrapInput />}
          displayEmpty
          value={value}
          IconComponent={KeyboardArrowDown}>
          {arrMenuItem()}
        </Select>
      </FormControl>
    </Paper>
  );
};

SelectGlobal.defaultProps = {
  displayEmpty: false
};

export default SelectGlobal;
