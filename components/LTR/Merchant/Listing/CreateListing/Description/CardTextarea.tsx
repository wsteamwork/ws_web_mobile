import { GlobalContext } from '@/store/Context/GlobalContext';
import { FormControl, Grid, TextField, Theme, Typography, withStyles } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import React, { FC, Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorNotify from './ErrorNotify';

interface IProps {
  classes?: any;
  label?: string;
  sub_label?: string;
  name: string;
  value: string;
  sub_textarea?: boolean;
  show_error?: boolean;
  error_message?: string;
  title_tooltips?: any;
  max_char?: number;
  rows?: string | number;
  rowsMax?: string | number;
  multiline?: boolean;
  classTextField?: any;
  classMaxChar?: any;
  InputProps?: any;
  inputProps?: any;
  placeholder?: any;
  autoFocus?: boolean;
  handleChange?: (event: any) => void;
  handleBlur?: (event: any) => void;
  error?: any;
}

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dce0e0'
  }
}))(Tooltip);

const CardTextarea: FC<IProps> = (props) => {
  const {
    label,
    sub_label,
    name,
    value,
    sub_textarea,
    show_error,
    error_message,
    title_tooltips,
    max_char,
    rows,
    rowsMax,
    multiline,
    classTextField,
    classMaxChar,
    InputProps,
    inputProps,
    placeholder,
    autoFocus,
    handleChange,
    handleBlur,
  } = props;

  const { width } = useContext(GlobalContext);
  const { t } = useTranslation();
  return (
    <Fragment>
      <section>
        {label && (
          <Typography
            variant="h1"
            gutterBottom
            className={!sub_textarea ? 'label main_label' : 'label sub_label'}>
            {label}
          </Typography>
        )}
        {sub_label && (
          <Grid item className="normal_text">
            <span>{sub_label}</span>
          </Grid>
        )}
      </section>
      <fieldset className="normal_fieldset">
        <FormControl fullWidth>
          <HtmlTooltip
            disableHoverListener={width !== 'xl' && width !== 'lg'}
            disableFocusListener={width !== 'xl' && width !== 'lg'}
            disableTouchListener={width !== 'xl' && width !== 'lg'}
            title={title_tooltips ? title_tooltips : ''}
            placement="right-start">
            <TextField
              name={name}
              value={value}
              className={classTextField ? classTextField : ''}
              aria-label="minimum height"
              rows={rows}
              rowsMax={rowsMax}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              multiline={multiline}
              placeholder={placeholder}
              autoFocus={autoFocus}
              InputProps={InputProps}
              inputProps={inputProps}
            />
          </HtmlTooltip>
          <ErrorNotify showError={show_error} errorMessage={error_message} />
        </FormControl>
        {max_char && (
          <strong>
            <span className={classMaxChar ? classMaxChar : ''}>{max_char - value.length}</span>
          </strong>
        )}
      </fieldset>
      {max_char && (
        <Grid item>
          <Typography className="remain_text">
            {max_char - value.length} {t('details:remainChar')}
          </Typography>
        </Grid>
      )}
    </Fragment>
  );
};

export default CardTextarea;
