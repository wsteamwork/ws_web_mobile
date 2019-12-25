import { axios } from '@/utils/axiosInstance';
import { cleanAccents } from '@/utils/mixins';
import { MenuItem, OutlinedInput, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// @ts-ignore
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import deburr from 'lodash/deburr';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { useDispatch } from 'react-redux';
import { CreateApartmentActions } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateApartment';
interface Iprops {
  setDistrictList: Dispatch<SetStateAction<any[]>>;
  setDisabledDistrictField: Dispatch<SetStateAction<boolean>>;
  valueCity: string;
  districtList: any[];
  onBlur: any;
  onChange: any;
  setDistrict: any;
  cityID?: number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 250,
    flexGrow: 1
  },
  container: {
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  divider: {
    height: theme.spacing(2)
  }
}));

const CitiesList: FC<Iprops> = (props: Iprops) => {
  const classes = useStyles(props);
  const {
    cityID,
    setDistrictList,
    setDisabledDistrictField,
    valueCity,
    onChange,
    onBlur,
    setDistrict,
    districtList,
  } = props;
  const dispatch = useDispatch<Dispatch<CreateApartmentActions>>();
  const [stateSuggestions, setStateSuggestions] = useState<any[]>([]);
  const [suggestionsList, setSuggestionsList] = useState<any[]>([]);
  const [city_id, setCityId] = useState<number>(0);
  useEffect(() => {
    setCityId(cityID)
  }, [cityID]);

  const getCities = async () => {
    try {
      const res = await axios.get(`/cities`);
      return res;
    } catch (error) { }
  };
  const getDistricts = async () => {
    try {
      const res = await axios.get(`/districts?city_id=${city_id}`);
      return res;
    } catch (error) { }
  };

  useEffect(() => {
    getDistricts()
      .then((res) => {
        return setDistrictList(
          res.data.data.map((district) => {
            let obj = {};
            obj['value'] = district.name;
            obj['id'] = district.id;
            return obj;
          })
        );
      })
      .then(() => {
        if (districtList && districtList.length) {
          setDistrict(districtList[0].id);
          dispatch({
            type: 'SET_DISTRICT_ID',
            payload: parseInt(districtList[0].id)
          });
        }
      });
    if (city_id > 0) setDisabledDistrictField(false);
  }, [city_id]);

  useEffect(() => {
    getCities().then((res) => {
      setSuggestionsList(
        res.data.data.map((city) => {
          let obj = {};
          obj['name'] = city.name;
          obj['id'] = city.id;
          return obj;
        })
      );
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'SET_CITY',
      payload: valueCity
    });
  }, [valueCity]);

  function renderInputComponent(inputProps) {
    const { classes, inputRef = () => { }, ref, ...other } = inputProps;

    return (
      <OutlinedInput
        fullWidth
        InputProps={{
          inputRef: (node) => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.input
          }
        }}
        {...other}
        labelWidth={0}
      />
    );
  }

  function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : suggestionsList.filter((suggestion) => {
        const keep =
          count < 5 &&
          cleanAccents(suggestion.name.slice(0, inputLength).toLowerCase()) ===
          cleanAccents(inputValue);

        if (keep) {
          count += 1;
        }

        return keep;
      });
  }
  function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part) => (
            <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
              {part.text}
            </span>
          ))}
        </div>
      </MenuItem>
    );
  }

  const handleSuggestionsFetchRequested = ({ value }) => {
    setStateSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setStateSuggestions([]);
  };

  const handleChange = (name) => (event, { newValue }) => {
    setDisabledDistrictField(true);
    onChange(name, newValue);
  };
  function getSuggestionValue(suggestion) {
    setCityId(suggestion.id);

    dispatch({
      type: 'SET_CITY_ID',
      payload: suggestion.id
    });
    return suggestion.name;
  }

  const handleBlur = () => {
    onBlur('city', true);
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion
  };
  return (
    <Autosuggest
      {...autosuggestProps}
      inputProps={{
        //@ts-ignore
        classes,
        id: 'react-autosuggest-sksimple',
        name: 'city',
        placeholder: 'Chọn thành phố',
        value: valueCity,
        onChange: handleChange('city'),
        onBlur: handleBlur
      }}
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion
      }}
      renderSuggestionsContainer={(options) => (
        <Paper {...options.containerProps} square>
          {options.children}
        </Paper>
      )}
    />
  );
};

export default CitiesList;
