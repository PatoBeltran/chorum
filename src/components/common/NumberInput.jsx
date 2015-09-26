import R from 'ramda';
import React from 'react';

export default class NumberInput extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.props.onChange || () => 0;
    this.onValueChange = this.onValueChange.bind(this);

    if (!this.validNumber(this.props.min)) {
      throw new Error('Invalid property: min.');
    }

    if (!this.validNumber(this.props.max)) {
      throw new Error('Invalid property: max.');
    }

    this.min = this.toNumber(this.props.min);
    this.max = this.toNumber(this.props.max);

    if (this.min > this.max) {
      throw new Error('min must be less than or equal to max.');
    }

    this.delegatedProps = R.clone(this.props); 
    delete this.delegatedProps.type;
    delete this.delegatedProps.value;
    delete this.delegatedProps.onChange;
  }
  render() {
    if (!this.validNumber(this.props.value)) {
      throw new Error('value must be a number');
    }

    if (this.min > this.props.value || this.max < this.props.value) {
      throw new Error('value must be in the range [min, max]');
    }

    return <input type='text' id='text1' value={this.props.value} onChange={this.onValueChange} {...this.delegatedProps}/>;
  }
  onValueChange(event) {
    let newValue = event.target.value.trim();
    if (newValue.length === 0) {
      newValue = '0';
    }

    if (!this.validNumber(newValue)) {
      return;
    }

    const newValueAsNumber = this.toNumber(newValue);

    if (this.validValue(newValueAsNumber)) {
      this.onChange(newValueAsNumber);
      return;
    }

    const insertedOne = (previous, current) => {
      previous = previous.toString();
      current = current.toString();

      if (previous.length - current.length !== -1) {
        return false;
      }

      let indexOfChange = -1;
      for (let i = 0; i < Math.min(previous.length, current.length); i++) {
        if (previous[i] !== current[i]) {
          return { indexOfChange: i };
        }
      }

      return { indexOfChange: Math.min(previous.length, current.length) };
    };

    const change = insertedOne(this.props.value, newValueAsNumber);
    if (change) {
      const indexOfChange = change.indexOfChange;
      const prevString = this.props.value.toString();
      const newString = newValueAsNumber.toString();
      let updatedValueAsString;

      if (indexOfChange === prevString.length) {
        updatedValueAsString = prevString.substring(0, prevString.length - 1) + newString[newString.length - 1];
      } else {
        updatedValueAsString = prevString.substring(0, indexOfChange) + newString[indexOfChange] + prevString.substring(indexOfChange + 1);
      }

      const updatedValue = parseInt(updatedValueAsString);
      if (this.validValue(updatedValue)) {
        this.onChange(updatedValue);
      }
    }
  }
  validValue(value) {
    if (!this.validNumber(value)) {
      return false;
    }

    const num = this.toNumber(value);
    return num >= this.min && num <= this.max;
  }
  toNumber(value) {
    if (typeof value === 'number') {
      return value;
    }

    if (typeof value === 'string') {
      if (!/^\d+$/.test(value)) {
        return NaN;
      }

      return parseInt(value);
    }

    return NaN;
  }
  validNumber(value) {
    return !isNaN(this.toNumber(value));
  }
}

