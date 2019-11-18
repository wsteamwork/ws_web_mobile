import { Grid, OutlinedInput } from '@material-ui/core';
import Select, { SelectProps } from '@material-ui/core/Select';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import React, { ChangeEvent } from 'react';

interface IProps<T> extends SelectProps {
  value?: T;
  name?: string;
  displayEmpty?: boolean;
  callBackEvent?: () => void;
  options?: any[];
  title?: string;
  twoThirdWidth?: boolean;
  unit?: string;
  defaultDisabledOption?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onBlurTouched?: (field: string, isTouched?: boolean) => void;
  callBackOnChange?: (value: any) => void;
}

const SelectCustom = <T extends any>(props: IProps<T>) => {
  const {
    value,
    name,
    options,
    title,
    defaultDisabledOption,
    callBackOnChange,
    twoThirdWidth,
    unit,
    onChange,
    onBlurTouched,
    disabled
  } = props;
  const [valueInput, setValueInput] = React.useState<T>(value);
  const handleChange = (event: ChangeEvent<{ name?: string; value: T }>) => {
    setValueInput(event.target.value);
    if (callBackOnChange) callBackOnChange(event.target.value);
  };

  const optionsRender = () => {
    return options && !disabled
      ? options.map((item, i) => {
          return (
            <option key={i} value={unit ? item : item.id}>
              {unit ? item + unit : item.value}
            </option>
          );
        })
      : null;
  };

  const handleBlur = () => {
    onBlurTouched(name, true);
  };

  return (
    <Grid className="select-reusable">
      {title ? <Grid className="create-listing-title">{title}</Grid> : ''}
      <Grid className={twoThirdWidth ? 'two-third-width' : ''}>
        <Select
          name={name}
          native
          fullWidth
          classes={{ icon: 'icon' }}
          onChange={onChange}
          value={value}
          onBlur={handleBlur}
          // defaultValue={null}
          input={
            <OutlinedInput
              name="term-rental"
              labelWidth={0}
              id="outlined-term-rental-native-simple"
            />
          }
          displayEmpty
          disabled={disabled}
          IconComponent={KeyboardArrowDown}>
          {defaultDisabledOption && (
            <option disabled value={0}>
              {defaultDisabledOption}
            </option>
          )}
          {optionsRender()}
        </Select>
      </Grid>
    </Grid>
  );
};

SelectCustom.defaultProps = {
  displayEmpty: false
};

export default SelectCustom;
