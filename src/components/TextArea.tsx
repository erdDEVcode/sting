import React, { forwardRef, useCallback } from 'react'
import styled from '@emotion/styled'

const StyledTextArea = styled.textarea`
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
  onChange: Function,
  className?: string,
  placeholder?: string,
  error?: any,
  value?: string,
  rows?: number,
}

const TextArea: React.FunctionComponent<Props> = forwardRef((props, ref: any) => {
  const {
    className,
    onChange,
    error,
    ...otherProps
  } = props

  const onTextChange = useCallback(({ currentTarget: { value: inputValue } }) => {
    onChange(inputValue)
  }, [onChange])

  return (
    <StyledTextArea
      ref={ref}
      className={className}
      onChange={onTextChange}
      hasError={!!error}
      {...otherProps}
    />
  )
})

export default TextArea