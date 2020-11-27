import React from 'react'
import styled from '@emotion/styled'

import Button from './Button'
import { ButtonProps } from './interfaces'

const StyledButton = styled(Button)`
  padding: 0.4em 0.5em;
`

const IconButton: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => (
  <StyledButton {...props} />
)

export default IconButton



