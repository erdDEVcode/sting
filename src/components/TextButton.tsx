import React from 'react'
import styled from '@emotion/styled'

import Button from './Button'
import { ButtonProps } from './interfaces'

const StyledButton = styled(Button)`
  padding: 0.1em 0.4em;
  border: 0;
`

const TextButton: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => (
  <StyledButton {...props} />
)

export default TextButton



