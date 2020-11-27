import React from 'react'

import Icon from './Icon'
import Tooltip from './Tooltip'

interface Props {
  icon: string,
  tooltip: string,
}

const IconWithTooltip: React.FunctionComponent<Props> = ({ icon, tooltip, ...props }) => {
  return (
    <Tooltip content={tooltip}>
      {({ tooltipElement, show, hide }) => (
        <span onMouseOver={show} onMouseOut={hide} {...props}>
          <Icon name={icon} />
          {tooltipElement}
        </span>
      )}
    </Tooltip>
  )
}

export default IconWithTooltip




