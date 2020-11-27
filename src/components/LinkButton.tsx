import React from 'react'
import styled from '@emotion/styled'

import Button from './Button'
import { ButtonProps } from './interfaces'

const StyledButton = styled(Button)`
  padding: 0;
  border: 0;
`

const LinkButton: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => (
  <StyledButton {...props} />
)

export default LinkButton



