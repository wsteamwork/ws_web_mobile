import BottomNavigation from '@/components/LTR/Merchant/Listing/Layout/BottomNavigation';
import { Radio, RadioGroup, Theme, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { Dispatch, FC, Fragment, SetStateAction } from 'react';

interface IProps {
  classes?: any;
  activeStep: number;
  steps: string[];
  setActiveStep: Dispatch<SetStateAction<number>>;
  nextLink: string;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    bigTitle: {
      margin: '24px 0'
    },
    checked: {
      color: '#FFA712 !important'
    },
    checkboxItem: {},
    checkboxItemWrapper: {
      padding: '5px 15px 10px',
      border: '1px solid #484848',
      borderRadius: 4,
      minHeight: 120,
    },
    title: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '1.375em',
      color: 'rgb(118, 118, 118)',
    },
  })
);

const AdditionalServiceFee: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { activeStep, steps, setActiveStep, nextLink } = props;
  const [selectedValue, setSelectedValue] = React.useState<any>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(parseInt((event.target as HTMLInputElement).value));
  };

  return (
    <Fragment>
      <div>
        <h1 className={classes.bigTitle}>
          Lựa chọn gói dịch vụ
        </h1>
        <Grid container className={classes.container} justify='center'>
          {/* <h3>Hình thức thuê: </h3> */}
          <Grid item xs={11}>
            <FormControl component="fieldset" fullWidth>

              <RadioGroup value={selectedValue.toString()} onChange={handleChange} row>
                <Grid container spacing={2}>
                  <Grid item xs={6} className={classes.checkboxItem}>
                    <div className={classes.checkboxItemWrapper}>
                      <FormControlLabel
                        value={String(0)}
                        label="Dịch vụ cung cấp bởi bên thứ 3"
                        control={<Radio color="primary" />}
                        labelPlacement="end"
                        classes={{ label: classes.title }}
                      />
                      <Typography style={{ marginTop: 10 }}>Westay sẽ cung cấp đầy đủ những dịch vụ cần thiết cho khách hàng và sẽ hoàn toàn chịu trách nhiệm với những dịch vụ này.</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={6} className={classes.checkboxItem}>
                    <div className={classes.checkboxItemWrapper}>
                      <FormControlLabel
                        value={String(1)}
                        label="Dịch vụ cung cấp bởi chủ nhà"
                        control={<Radio color="primary" />}
                        labelPlacement="end"
                        classes={{ label: classes.title }}
                      />
                      <Typography style={{ marginTop: 10 }}>Chủ nhà sẽ tự cung cấp các dịch vụ cần thiết và Westay hoàn toàn <b> miễn chịu trách nhiệm </b> với những dịch vụ này.</Typography>
                    </div>
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <BottomNavigation
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        nextLink={nextLink}
      // handleSubmit={handleSubmit}
      />
    </Fragment>
  );
};

export default AdditionalServiceFee;
