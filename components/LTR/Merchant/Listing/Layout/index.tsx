import GridContainer from '@/components/Layout/Grid/Container';
import Grid from '@material-ui/core/Grid/Grid';
import React, { Dispatch, FC, SetStateAction } from 'react';
import HeaderNav from './HeaderNavigation';
import StepperProgress from './StepperProgress';

interface IProps {
  title: string;
  getStepContent: (
    step: number,
    steps: string[],
    setActiveStep: Dispatch<SetStateAction<number>>,
    nextLink?: string
  ) => any;
  getSteps: () => Array<string>;
  nextLink?: string;
  disableNext?: boolean;
  handleAPI?: () => any;
  submitEachStep?: boolean;
  disableSubmit?: boolean;
}

const Layout: FC<IProps> = (props) => {
  const {
    title,
    getStepContent,
    getSteps,
    nextLink,
    disableNext,
    handleAPI,
    submitEachStep,
    disableSubmit
  } = props;

  return (
    <Grid className="listing-container">
      <HeaderNav title={title} />
      <GridContainer
        xs={12}
        md={8}
        className="listing-content"
        classNameItem="listing-content-wrapper">
        <StepperProgress
          getSteps={getSteps}
          getStepContent={getStepContent}
          nextLink={nextLink}
          handleAPI={handleAPI}
          disableNext={disableNext}
          disableSubmit={disableSubmit}
          submitEachStep={submitEachStep}
        />
      </GridContainer>
    </Grid>
  );
};

export default Layout;
