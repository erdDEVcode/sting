import React from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'
import Icon from '../Icon'
import { DefaultProps } from './interfaces'
import IconButton from '../IconButton'

const Container = styled.div`
  ${flex({ direction: 'row', justify: 'flex-start', align: 'flex-start' })};
  position: relative;
  border-radius: 5px;
  padding: 1rem 2rem 1rem 1rem;
  font-size: 0.9rem;
`

const IconContainer = styled.div`
  margin-right: 1rem;
`

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 1px;
  right: 1px;
  font-size: 0.8em;
  color: inherit;
  border: none;
`

interface Props extends DefaultProps {
  className?: string,
  icon: string | any,
}

const ToastContainer: React.FunctionComponent<Props> = ({ className, icon, children, closeNow }) => {
  return (
    <Container className={className}>
      <IconContainer>
        {typeof icon === 'string' ? <Icon name={icon} /> : icon}
      </IconContainer>
      <div>
        {children}
      </div>
      {closeNow ? (
        <CloseButton icon='close' onClick={closeNow} />
      ) : null}
    </Container>
  )
}

export default ToastContainer

