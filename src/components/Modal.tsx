import React from 'react'
import styled from '@emotion/styled'
import { ClassNames } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { flex, boxShadow } from 'emotion-styled-utils'
import ReactModal, { Props as DefaultProps }  from 'react-modal'

const Container = styled.div`
  height: 100%;
  background-color: ${(p: any) => p.theme.modal.bgColor};
  color: ${(p: any) => p.theme.modal.textColor};
`

interface Props extends DefaultProps {
  width?: string | number,
  height?: string | number,
  className?: string,
}

const Modal: React.FunctionComponent<Props> = ({ width, height, className, children, ...props }) => {
  const theme: any = useTheme()

  return (
    <ClassNames>
      {({ css }) => (
        <ReactModal
          className={{
            base: css`
              ${boxShadow({ color: theme.modal.shadowColor })};
              width: ${width || '80%'};
              max-width: 80%;
              height: ${height || 'auto'};
              border-radius: 10px;
              width: ${width || '400px'};
              height: ${height || 'auto'};
              outline: none;
              overflow: hidden;
            `,
            afterOpen: css`
            `,
            beforeClose: '',
          }}
          overlayClassName={{
            base: css`
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              z-index: 30;
              ${flex({ direction: 'column', justify: 'center', align: 'center' })};
              background-color: ${theme.modal.overlay.bgColor};
              opacity: 0;
            `,
            afterOpen: css`
              opacity: 1;
            `,
            beforeClose: '',
          }}
          {...props}
        >
          <Container className={className}>
            {children}
          </Container>
        </ReactModal>
      )}
    </ClassNames>
  )
}

export default Modal
