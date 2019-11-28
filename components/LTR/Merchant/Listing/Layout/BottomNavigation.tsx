import ButtonGlobal from '@/components/ButtonGlobal';
import { ReducersList } from '@/store/Redux/Reducers';
import { DetailsReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/details';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Hidden, MobileStepper, Snackbar } from '@material-ui/core';
import Router from 'next/router';
import React, { FC, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import BottomMdNavigation from './BottomMdNavigation';
import MySnackbarContentWrapper from '@/components/Profile/EditProfile/MySnackbarContentWrapper';

interface IProps {
  steps?: string[];
  activeStep?: number;
  nextLink?: string;
  setActiveStep: any;
  disableNext?: boolean;
  disableSubmit?: boolean;
  handleAPI?: () => Promise<any>;
  submitEachStep?: boolean;
}

const BottomNavigation: FC<IProps> = (props) => {
  const {
    steps,
    activeStep,
    nextLink,
    setActiveStep,
    disableNext,
    disableSubmit,
    handleAPI,
    submitEachStep
  } = props;
  const currentActiveStep = useSelector<ReducersList, string>(
    (state) => state.process.currentActiveStep
  );
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const dispatch_detail = useDispatch<Dispatch<DetailsReducerAction>>();

  // useEffect(() => {
  //   let step = localStorage.getItem('currentStep');
  //   if (window.performance) {
  //     if (!(performance.navigation.type == 1) && step === currentActiveStep) {
  //       localStorage.setItem('currentTab', '0');
  //     }
  //   }
  // }, [currentActiveStep]);

  const handleFinish = async () => {
    try {
      const result = await handleAPI();
      if (result) {
        setOpen(false);
        Router.push(`/host/create-listing/${result.data.data.id}/detail`);
      }
    } catch (error) {
      // console.log(error.data)
      setMessage(error);
      setOpen(true);
    }
  };

  const handleNext = async () => {
    try {
      if (!submitEachStep) {
        const result = await handleAPI();
        if (result) {
          if (activeStep === steps.length - 1) {
            Router.push(nextLink);
          } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            // localStorage.setItem('currentTab', String(activeStep + 1));
          }
        }
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } catch (error) { }
  };

  const handleBack = () => {
    dispatch_detail({ type: 'setDisableNext', payload: false });
    if (activeStep === 0) {
      Router.back();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      // localStorage.setItem('currentTab', String(activeStep - 1));
    }
  };

  return (
    <Fragment>
      <Hidden smDown>
        <BottomMdNavigation
          handleNext={handleNext}
          handleFinish={handleFinish}
          handleBack={handleBack}
          steps={steps}
          activeStep={activeStep}
          disableNext={disableNext}
          disableSubmit={disableSubmit}
          submitEachStep={submitEachStep}
        />
      </Hidden>

      <Hidden mdUp>
        <MobileStepper
          variant="progress"
          steps={6}
          position="static"
          activeStep={activeStep}
          className="mobile-stepper"
          nextButton={
            activeStep === steps.length - 1 ? (
              <ButtonGlobal
                onClick={submitEachStep ? handleFinish : handleNext}
                disabled={disableSubmit ? disableSubmit : disableNext}>
                Save
              </ButtonGlobal>
            ) : (
                <ButtonGlobal onClick={handleNext} disabled={disableNext}>
                  Next
              </ButtonGlobal>
              )
          }
          backButton={
            <Button className="prev-link" disabled={activeStep === 0} onClick={handleBack}>
              <FontAwesomeIcon icon={faChevronLeft} size="2x" color="#fa991c"></FontAwesomeIcon>
              <span className="prev-title">Back</span>
            </Button>
          }
        />
      </Hidden>
      <Snackbar
        style={{
          zIndex: 150000
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
      >
        <MySnackbarContentWrapper
          variant="error"
          message={'Có lỗi xảy ra, vui lòng kiểm tra lại thông tin'}
        ></MySnackbarContentWrapper>
      </Snackbar>
    </Fragment>
  );
};
BottomNavigation.defaultProps = {
  disableNext: false
};

export default BottomNavigation;
