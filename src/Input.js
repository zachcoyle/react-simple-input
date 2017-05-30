import React from 'react';
import PropTypes from 'prop-types';

const DefaultValidationComponent = ({ validation }) => console.log(validation) ||
  <div style={{ color: 'red' }}>{validation.error}</div>

const DefaultInputComponent = ({ type, name, value, onChange }) =>
  <input type={type} name={name} onChange={onChange} />

const DefaultLabelComponent = ({ htmlFor, children }) =>
  <label style={{ marginRight: '10px' }} htmlFor={name}>
    {children}
  </label>


const Input = ({
  InputComponent=DefaultInputComponent,
  LabelComponent=DefaultLabelComponent,
  ValidationComponent=DefaultValidationComponent,
  name, label, type, value, validationText, validator, mask,
  onChange=() => {},
}) => {

  InputComponent.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
  }

  LabelComponent.propTypes = {
    htmlFor: PropTypes.string.isRequired,
  }

  ValidationComponent.propTypes = {
    validation: PropTypes.object.isRequired,
  }

  return <div>
    {label && <LabelComponent htmlFor={name}>{label}</LabelComponent>}
    <InputComponent name={name} type={type} value={value} onChange={onChange} />
    {value && validator && <ValidationComponent validation={validator(value)} />}
  </div>

}


export const ColorInput = (props) =>
  <Input {...props} type="color" />


Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  validationText: PropTypes.string,
  validator: PropTypes.func,
  onChange: PropTypes.func,
}


export default Input;
