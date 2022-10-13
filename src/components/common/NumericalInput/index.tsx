import React from 'react'
import { escapeRegExp } from '../../../utils'

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

export const Input = React.memo<any>(function InnerInput(props) {
  const {
    value,
    onUserInput,
    placeholder,
    className,
    error,
    ...rest
  } = props
  const enforcer = (nextUserInput) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput)
    }
  }

  const onChange = (event) => {
    // replace commas with periods, because uniswap exclusively uses period as the decimal separator
    enforcer(event.target.value.replace(/,/g, '.'))
  }

  return <input
    className={`numerical-input ${className} bg-dark-600
        ${error ? 'numerical-input--error' : null}
        ${value > 0 ? 'bg-dark-hover-inputs text-white' : 'text-grey'}`}
    {...rest}
    value={value}
    onChange={onChange}
    // universal input options
    inputMode='decimal'
    title='Token Amount'
    autoComplete='off'
    autoCorrect='off'
    // text-specific options
    type='text'
    pattern='^[0-9]*[.,]?[0-9]*$'
    placeholder={placeholder || '0.0'}
    minLength={1}
    maxLength={79}
    spellCheck='false'
  />
})

export default Input

// const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
