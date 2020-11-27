import React, { forwardRef, useCallback } from 'react'
import styled from '@emotion/styled'

const Input = styled.input`
  ${(p: any) => p.theme.font('body')};
  display: block;
  width: 100%;
  border: 1px solid ${(p: any) => (p.hasError ? p.theme.textInput.errorBorderColor : p.theme.textInput.borderColor)};
  border-width: ${(p: any) => (p.hasError ? '2px' : '1px')};
  background-color: ${(p: any) => (p.hasError ? p.theme.textInput.errorBgColor : p.theme.textInput.bgColor)};
  color: ${(p: any) => p.theme.textInput.textColor};
  padding: 1em;
  font-size: 1rem;
  outline: none;
  border-radius: 5px;

  &:focus {
    border: 1px solid ${(p: any) => (p.hasError ? p.theme.textInput.errorBorderColor : p.theme.textInput.hover.borderColor)};
  }

  &::placeholder {
    ${(p: any) => p.theme.font('body', 'regular', 'italic')};
    color: ${(p: any) => p.theme.textInput.placeholderTextColor};
    font-size: 90%;
  }
 `

interface Props {
  placeholder?: string,
  onChange: (value: string) => void,
  onKeyPress?: (key: any) => void,
  error?: any,
  value?: string,
  type?: string,
}

const TextInput: React.FunctionComponent<Props> = forwardRef((props, ref: any) => {
  const {
    onChange,
    error,
    ...otherProps
  } = props

  const onTextChange = useCallback(({ currentTarget: { value: inputValue } }) => {
    onChange(inputValue)
  }, [onChange])

  return (
    <Input
      ref={ref}
      type='text'
      onChange={onTextChange}
      hasError={!!error}
      {...otherProps}
    />
  )
})

export default TextInput