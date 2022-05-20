import React from 'react';
import './dropdown.css';

export default class DropDownClass extends React.Component {
    render() {
        // TODO: Expand the this.props to be variable names instead of 'this.props.' when using these values

        return (
            <div>
                {this.props.title}
                <select
                    className="dropdown"
                    onChange={(e) => {
                        this.props.onSelect(e.target.value);
                    }}
                >
                    <option value="">{this.props.defaultOption}</option>
                    {this.props.optionArray.map((option, index) => {
                        return (
                            <option
                                key={`${option[this.props.idKey]}-${index}`}
                                value={option[this.props.idKey]}
                            >
                                {option[this.props.labelKey]}
                            </option>
                        );
                    })}
                </select>
            </div>
        );
    }
}
