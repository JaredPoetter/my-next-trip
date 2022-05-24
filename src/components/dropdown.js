import React from 'react';
import PropTypes from 'prop-types';

import './dropdown.css';

export default function DropDown(props) {
    return (
        <select
            className="dropdown"
            onChange={(e) => {
                props.onSelect(e.target.value);
            }}
        >
            <option value="">{props.defaultOption}</option>
            {props.optionArray.map((option, index) => {
                return (
                    <option
                        key={`${option[props.idKey]}-${index}`}
                        value={option[props.idKey]}
                    >
                        {option[props.labelKey]}
                    </option>
                );
            })}
        </select>
    );
}

DropDown.propTypes = {
    optionArray: PropTypes.array,
    defaultOption: PropTypes.string,
    labelKey: PropTypes.string,
    idKey: PropTypes.string,
    onSelect: PropTypes.func,
};
