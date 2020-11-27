import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  font-size: 1rem;
  padding: 1em;
  border-radius: 5px;
  border: 1px solid ${(p: any) => p.theme.infoBox.borderColor};
  background-color: ${(p: any) => p.theme.infoBox.bgColor};
  color: ${(p: any) => p.theme.infoBox.textColor};
`
interface Props {
  className?: string,
}

const InfoBox: React.FunctionComponent<Props> = ({ className, children }) => {
  return (
    <Container className={className}>
      {children}
    </Container>
  )
}

export default InfoBox