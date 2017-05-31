import React from 'react';
import PropTypes from 'prop-types';
import { withState } from 'recompose';


const DefaultValidationComponent = ({ validator, value }) =>
  <div>
    {value && validator && <div style={{ color: 'red' }}>{validator(value).error}</div>}
  </div>


const DefaultInputComponent = ({ type, name, value, onChange }) =>
  <input type={type} name={name} onChange={onChange} />


const DefaultLabelComponent = ({ htmlFor, children }) =>
  <div>
    {children &&
      <label style={{ marginRight: '10px' }} htmlFor={name}>{children}</label>}
  </div>


const flexStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}

const DefaultInputWrapperComponent = ({ name, InputComponent, LabelComponent, ValidationComponent }) =>
  <div style={{ ...flexStyle, flexDirection: 'column' }}>
    <div style={{ ...flexStyle, margin: 15 }}>
      <LabelComponent />
      <InputComponent />
    </div>
    <ValidationComponent />
  </div>


const onInputChange = ({ setDirty, onChange, setValue, setPristine }) => ({ target: { value } }) => {
  console.log(value)
  setDirty(true)
  setPristine(false)
  setValue(value)
  onChange(value)
}


const Input = ({
  InputComponent=DefaultInputComponent,
  LabelComponent=DefaultLabelComponent,
  ValidationComponent=DefaultValidationComponent,
  InputWrapperComponent=DefaultInputWrapperComponent,
  name,
  label,
  type="text",
  value,
  setValue,
  validationText,
  validator,
  mask,
  dirty,
  setDirty,
  pristine,
  setPristine,
  onChange=() => {},
}) => {

  InputComponent.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  }

  LabelComponent.propTypes = {
    htmlFor: PropTypes.string.isRequired,
  }

  ValidationComponent.propTypes = {
    validation: PropTypes.object.isRequired,
  }

  return <InputWrapperComponent
    LabelComponent={({...rest}) => <LabelComponent htmlFor={name} {...rest}>{label}</LabelComponent>}
    InputComponent={({...rest}) => <InputComponent
                                     name={name}
                                     type={type}
                                     value={value}
                                     onChange={onInputChange({ setDirty, onChange, setValue, setPristine })}
                                     {...rest} />}
    ValidationComponent={({...rest}) => <ValidationComponent validator={validator} value={value} />}
  />
}


Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  validationText: PropTypes.string,
  validator: PropTypes.func,
  onChange: PropTypes.func,
}


const withInputState = (Component) =>
  withState('value', 'setValue', undefined)(
  withState('dirty', 'setDirty', false)(
  withState('pristine', 'setPristine', true)(
    Component)))

export default withInputState(Input);
