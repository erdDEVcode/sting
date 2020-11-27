import React, { useRef, useCallback } from 'react'
import styled from '@emotion/styled'

import Button from './Button'

const Container = styled.div`
  label {
    cursor: pointer;
  }

  input {
    display: none;
  }
`

interface Props {
  accept: string,
  buttonContent: any,
  onLoad: (contents: string) => void,
  className?: string,
}

const FileInput: React.FunctionComponent<Props> = ({ className, accept, buttonContent, onLoad }) => {
  const inputEl = useRef(null)

  const onClick = useCallback(() => {
    if (inputEl.current) {
      (inputEl.current as any).click()
    }
  }, [])

  const onFileSelected = useCallback(e => {
    const selectedFile = e.target.files[0]

    // check if dialog was cancelled
    if (!selectedFile) {
      return
    }

    // read it in
    const reader = new FileReader()
    reader.onload = ev => onLoad(ev.target!.result!.toString())
    reader.readAsText(selectedFile)
  }, [ onLoad ])

  return (
    <Container className={className}>
      <Button onClick={onClick}>{buttonContent}</Button>
      <input ref={inputEl} type="file" accept={accept} onChange={onFileSelected} />
    </Container>
  )
}

export default FileInput