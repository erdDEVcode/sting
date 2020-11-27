import React from 'react'
import styled from '@emotion/styled'
import { QRCode} from 'react-qr-svg'
import { flex } from 'emotion-styled-utils'

import Modal from './Modal'
import ValueBox from './ValueBox'

const HEIGHT = '500px'

const Container = styled.div`
  ${flex({ direction: 'column', justify: 'space-around', align: 'center' })};
  padding: 2rem 1rem;
`

const Title = styled.h2`
  font-size: 1.2rem;
  margin: 0 0 2rem;
`

const Value = styled(ValueBox)`
  margin: 2rem 0 0;
  font-size: 0.8rem;
`

interface Props {
  className?: string
  onRequestClose?: () => void,
  title: string,
  isOpen: boolean,
  value: string,
}

const QrCodeModal: React.FunctionComponent<Props> = ({ isOpen, onRequestClose, title, value }) => {
  return (
    <Modal isOpen={isOpen} width='640px' height={HEIGHT} onRequestClose={onRequestClose}>
      <Container>
        <Title>{title}</Title>
        <QRCode value={value} style={{ width: 256 }} bgColor='#ffffff' fgColor='#000000' level='H' />
        <Value>{value}</Value>
      </Container>
    </Modal>
  )
}

export default QrCodeModal

