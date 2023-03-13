import React from "react";
import PropTypes from 'prop-types';
import { FilterStyle } from "./filter.Styled";

export const Filter = ({ value, onChange }) => {

    return (
      <FilterStyle>
        <label>
          Find contacts by name{' '}
          <input type="text" value={value} onChange={onChange} />
        </label>
      </FilterStyle>
    ); 
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
