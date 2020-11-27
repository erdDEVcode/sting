import React, { useState, useCallback } from 'react'
import * as clipboard from 'clipboard-polyfill'

import IconButton from './IconButton'

const COPY_TO_CLIPBOARD = 'Copy to clipboard'

interface Props {
  className?: string,
  value: string,
}

const CopyToClipboardButton: React.FunctionComponent<Props> = ({ value, className }) => {
  const [copyButtonTooltip, setCopyButtonTooltip] = useState<string>(COPY_TO_CLIPBOARD)

  const copyToClipboard = useCallback(e => {
    e.preventDefault()
    clipboard.writeText(value)
    setCopyButtonTooltip('Copied!')
    setTimeout(() => {
      setCopyButtonTooltip(COPY_TO_CLIPBOARD)
    }, 3000)
  }, [value])

  return (
    <IconButton
      className={className}
      tooltip={copyButtonTooltip}
      icon='copy'
      onClick={copyToClipboard}
    />
  )
}

export default CopyToClipboardButton

