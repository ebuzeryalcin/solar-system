import React, { ChangeEvent } from 'react';
import PropTypes from 'prop-types';

interface FilterProps {
handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
handleFilter: (event: ChangeEvent<HTMLSelectElement>) => void;
searchInput: string;
}

const Filter: React.FC<FilterProps> = ({ handleChange }) => (

  <div>
    <input type="text" onChange={handleChange} placeholder="Search planet" />
  </div>
);
Filter.propTypes = {
handleChange: PropTypes.func.isRequired,
};

export default Filter;