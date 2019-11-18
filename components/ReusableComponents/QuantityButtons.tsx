import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, IconButton } from '@material-ui/core';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import React, { Dispatch, FC, Fragment, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';

interface Iprops {
  icon?: IconDefinition;
  title: string;
  number: number;
  setNumber: Dispatch<SetStateAction<number>>;
  step?: number;
  minimumValue?: number;
}

const QuantityButtons: FC<Iprops> = (props) => {
  const { icon, title, number, setNumber, step, minimumValue } = props;
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);

  const handleDecrement = () => {
    if (number === minimumValue) {
      return;
    }
    if (step) {
      setNumber(number - step);
    } else {
      setNumber(number - 1);
    }
  };

  const handleIncrement = () => {
    if (step) {
      setNumber(number + step);
    } else {
      setNumber(number + 1);
    }
  };

  return (
    <Grid container className={`quantityButtons ${!icon ? 'titleNoIcon' : ''}`}>
      <Grid item xs={8} className="flex_columCenter">
        <p>
          {icon ? (
            <Fragment>
              <FontAwesomeIcon icon={icon} size="lg"></FontAwesomeIcon>&nbsp;&nbsp;
            </Fragment>
          ) : (
              ''
            )}
          {title}
        </p>
      </Grid>
      {
        leaseTypeGlobal ? (
          <Grid item xs={4}>
            <Grid container>
              <Grid item xs={4} className="centerCustom">
                <IconButton onClick={handleDecrement} className="iconLT" aria-label="Add">
                  <RemoveCircleOutline></RemoveCircleOutline>
                </IconButton>
              </Grid>

              <Grid item xs={4} className="centerCustom">
                <p>{number}</p>
              </Grid>

              <Grid item xs={4} className="centerCustom">
                <IconButton onClick={handleIncrement} className="iconLT" aria-label="Add">
                  <AddCircleOutline></AddCircleOutline>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        ) : (
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={4} className="centerCustom">
                  <IconButton onClick={handleDecrement} className="icon" color="primary" aria-label="Add">
                    <RemoveCircleOutline></RemoveCircleOutline>
                  </IconButton>
                </Grid>

                <Grid item xs={4} className="centerCustom">
                  <p>{number}</p>
                </Grid>

                <Grid item xs={4} className="centerCustom">
                  <IconButton onClick={handleIncrement} className="icon" color="primary" aria-label="Add">
                    <AddCircleOutline></AddCircleOutline>
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>)
      }
    </Grid>
  );
};

QuantityButtons.defaultProps = {
  minimumValue: 0
};

export default QuantityButtons;
