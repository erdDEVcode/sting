import React from 'react'

import Icon from './Icon'

interface Props {
  className?: string,
  title?: string,
}

const LoadingIcon: React.FunctionComponent<Props> = props => <Icon name="loading" spin={true} {...props} />

export default LoadingIcon