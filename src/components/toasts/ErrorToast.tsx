import React from 'react'
import styled from '@emotion/styled'

import { DefaultProps } from './interfaces'
import ToastContainer from './ToastContainer'

const Container = styled(ToastContainer)`
  background-color: ${(p: any) => p.theme.toast.error.bgColor};
  color: ${(p: any) => p.theme.toast.error.textColor};
`

interface Props extends DefaultProps {
}

const ErrorToast: React.FunctionComponent<Props> = ({ children, ...props }) => {
  return(
    <Container icon='error' {...props}>
      {children}
    </Container>
  )
}

export default ErrorToast
