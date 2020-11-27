import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  font-size: 0.9rem;
  padding: 0.5rem;
  color: ${(p: any) => p.theme.headerClickable.textColor};
  background-color: ${(p: any) => p.theme.headerClickable.bgColor};
  overflow: visible;

  &:hover {
    cursor: pointer;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    color: ${(p: any) => p.theme.headerClickable.hover.textColor};
    background-color: ${(p: any) => p.theme.headerClickable.hover.bgColor};

    svg {
      color: ${(p: any) => p.theme.headerClickable.hover.textColor};
    }
  }
`

interface Props {
  className?: string,
  onClick?: () => void,
}

const HeaderClickable: React.FunctionComponent<Props> = ({ children, ...props }) => {
  return (
    <Container {...props}>{children}</Container>
  )
}

export default HeaderClickable

