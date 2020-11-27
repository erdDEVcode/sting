import React from 'react'
import styled from '@emotion/styled'
import { buttonStyles } from 'emotion-styled-utils'

import Icon from './Icon'
import Tooltip from './Tooltip'
import { ButtonProps } from './interfaces'

const StyledButton = styled.button`
  ${(p: any) => p.theme.font('body', 'light')};
  font-size: 1.2rem;
  padding: 1em 2em;
  border-radius: 5px;

  ${({ disabled, ...p }) => buttonStyles({
    ...p.theme.button,
    inDisabledState: disabled,
  })};
`

const StyledIcon = styled(Icon)`
  & + div {
    margin-left: 0.5em;
  }
`

const Content = styled.div`
  display: inline-block;
`

const Button: React.FunctionComponent<ButtonProps> = ({ children, icon, tooltip, onClick, ...props }) => {
  return (
    <Tooltip content={tooltip}>
      {({ tooltipElement, show, hide }) => (
        <StyledButton {...props} onClick={onClick} onMouseOver={show} onMouseOut={hide}>
          {icon ? <StyledIcon name={icon} /> : null}
          {children ? <Content>{children}</Content> : null}
          {tooltipElement}
        </StyledButton>
      )}
    </Tooltip>
  )
}

export default Button



