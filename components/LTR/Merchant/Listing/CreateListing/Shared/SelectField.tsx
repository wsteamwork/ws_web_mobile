import { FormControl, Grid, OutlinedInput, Select } from '@material-ui/core';
import { SelectProps } from '@material-ui/core/Select';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { FC } from 'react';


interface Iprops extends SelectProps {
  title?: string;
}

const SelectField: FC<Iprops> = (props) => {
  const { value, onChange, title } = props;

  return (
    <Grid style={{ width: 'calc(50% - 8px)' }}>
      <Grid className="select-reusable">
        {title ? <Grid className="title">{title}</Grid> : ''}
        <FormControl fullWidth>
          <Select
            onChange={onChange}
            // onBlur={onBlur}
            name="accommodation_type"
            native
            fullWidth
            classes={{ icon: 'icon' }}
            input={
              <OutlinedInput
                name="term-rental"
                labelWidth={0}
                id="outlined-term-rental-native-simple"
              />
            }
            IconComponent={KeyboardArrowDown}>
            {/* {optionsRender()} */}
            <option value={1}>Red</option>
            <option value={2}>Green</option>
            <option value={3}>Blue</option>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SelectField;
