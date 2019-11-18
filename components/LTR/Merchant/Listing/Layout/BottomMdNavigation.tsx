import ButtonGlobal from '@/components/ButtonGlobal';
import GridContainer from '@/components/Layout/Grid/Container';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import React, { FC } from 'react';

interface IProps {
  activeStep: number;
  handleBack: () => void;
  steps: Array<string>;
  handleNext: () => Promise<any>;
  handleFinish: () => Promise<any>;
  disableNext?: boolean;
  disableSubmit?: boolean;
  submitEachStep: boolean;
}

const BottomMdNavigation: FC<IProps> = (props) => {
  const {
    activeStep,
    handleBack,
    steps,
    handleNext,
    handleFinish,
    disableNext,
    disableSubmit,
    submitEachStep
  } = props;

  return (
    <GridContainer
      xs={10}
      md={8}
      className="bottom-navigation"
      classNameItem="bottom-navigation-container">
      <Grid container item xs={8} className="bottom-navigation-inner-container">
        <Grid item className="bottom-navigation-inner-wrapper">
          <Grid className="prev-button">
            <Button className="prev-link" onClick={handleBack}>
              <FontAwesomeIcon icon={faChevronLeft} size="2x" color="#fa991c"></FontAwesomeIcon>
              <span className="prev-title">Back</span>
            </Button>
          </Grid>
          <Grid className="next-button">
            {activeStep === steps.length - 1 ? (
              <ButtonGlobal
                onClick={submitEachStep ? handleFinish : handleNext}
                disabled={disableSubmit ? disableSubmit : disableNext}>
                Finish
              </ButtonGlobal>
            ) : (
                <ButtonGlobal onClick={handleNext} disabled={disableNext}>
                  Next
              </ButtonGlobal>
              )}
          </Grid>
        </Grid>
      </Grid>
    </GridContainer>
  );
};
BottomMdNavigation.defaultProps = {
  disableNext: false
};

export default BottomMdNavigation;
