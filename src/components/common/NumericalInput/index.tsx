import React, { useEffect, useState } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string | number;
  onUserInput: (value: string) => void;
  error?: boolean;
  token: { decimals: number };
}

export const Input = React.memo<InputProps>(function InnerInput(props) {
  const {
    value,
    onUserInput,
    placeholder,
    className,
    error,
    token,
    ...rest
  } = props

  const [decimalPlaces, setDecimalPlaces] = useState(10);

  useEffect(() => {
    setDecimalPlaces(token.decimals)
  }, [token]);

  const onChange = (event) => {
    let input = event.target.value;
    const inputAsNumber = Number(input);

    if (Number.isNaN(inputAsNumber)) {
      return;
    }

    if (input.includes('.')) {
      let [integer, decimals] = input.split('.');

      if (decimals.length >= decimalPlaces) {
        input = integer + '.' + decimals.substring(0, decimalPlaces);
      }
    }

    onUserInput(input);
  }

  return <input
    className={`numerical-input ${className} bg-dark-600
        ${error ? 'numerical-input--error' : null}
        ${value > 0 ? 'bg-dark-hover-inputs text-white' : 'text-grey'}`}
    {...rest}
    value={value}
    onChange={onChange}
    inputMode='decimal'
    title='Token Amount'
    autoComplete='off'
    autoCorrect='off'
    type='text'
    placeholder={placeholder || '0.0'}
    minLength={1}
    maxLength={79}
    spellCheck='false'
  />
})

export default Input
