import React, { useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { TransactionOnChain, TransactionStatus } from 'elrondjs'

import _ from '../../utils/lodash'
import { useTrackTransaction } from '../../hooks'
import { GlobalConsumer, GlobalContextValue } from '../../contexts'
import { Network } from '../../types/all'
import ErrorToast from './ErrorToast'
import ToastContainer from './ToastContainer'
import LoadingIcon from '../LoadingIcon'
import LinkButton from '../LinkButton'
import { DefaultProps } from './interfaces'
import { ViewInExplorerContext, ViewTransactionInExplorer } from '../ViewInExplorer'
import Button from '../Button'

const Container = styled(ToastContainer)`
`

const SuccessContainer = styled(Container)`
  background-color: ${(p: any) => p.theme.toast.trackTransaction.success.bgColor};
  color: ${(p: any) => p.theme.toast.trackTransaction.success.textColor};

  p {
    ${(p: any) => p.theme.font('body', 'bold')};
  }
`

const PendingContainer = styled(Container)`
  background-color: ${(p: any) => p.theme.toast.trackTransaction.pending.bgColor};
  color: ${(p: any) => p.theme.toast.trackTransaction.pending.textColor};

  p {
    ${(p: any) => p.theme.font('body', 'light', 'italic')};
  }
`

const ErrorMsg = styled.div`
  margin-top: 1rem;
`

const DetailsContainer = styled.div`
  margin-top: 1rem;
  font-size: 80%;

  button {
    font-size: 1em;
    color: inherit;
    border-color: inherit;
  }
  
  button + div {
    margin-top: 1rem;
  }
`

const Hash = styled.div`
  margin-bottom: 1rem;
  strong {
    ${(p: any) => p.theme.font('body', 'bold')};
  }
`

interface DetailsProps {
  txHash: string,
  tx?: TransactionOnChain,
}

const TxDetails: React.FunctionComponent<DetailsProps> = ({ txHash, tx }) => {
  const [showDetails, setShowDetails] = useState(false)
  
  const toggleDetails = useCallback(() => {
    setShowDetails(!showDetails)
  }, [showDetails])
 
  return tx ? (
    <DetailsContainer>
      
      <LinkButton icon={showDetails ? 'upArrow' : 'downArrow'} onClick={toggleDetails}>
        {showDetails ? 'Hide' : 'Show'} details
      </LinkButton>
      {showDetails ? (
        <div>
          <Hash><strong>Id: </strong><span>{txHash}</span></Hash>
          <ViewTransactionInExplorer id={txHash}>
            {({ onClick }: ViewInExplorerContext) => (
              <Button icon='open-external' onClick={onClick}>
                View in explorer
              </Button>
            )}
          </ViewTransactionInExplorer>
        </div>
      ) : null}
    </DetailsContainer>
  ) : null
}

interface Props extends DefaultProps {
  txHash: string,
  network?: Network
}

const Toast: React.FunctionComponent<Props> = ({ network, txHash, closeAfter, ...props }) => {
  const { tx, error } = useTrackTransaction(network!, txHash)

  // useEffect(() => {
  //   let timer: any

  //   if (tx?.status === TransactionStatus.SUCCESS && closeAfter) {
  //     timer = closeAfter(3000)
  //   }

  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [ tx, closeAfter ])

  if (error) {
    return (
      <ErrorToast {...props}>
        <p>Unable to read transaction state</p>
        <ErrorMsg>{error}</ErrorMsg>
      </ErrorToast>
    )
  }

  const txDetails = <TxDetails txHash={txHash} tx={tx} />

  switch (_.get(tx, 'status')) {
    case TransactionStatus.FAILURE:
      return (
        <ErrorToast {...props}>
          <p>Transaction failed</p>
          {txDetails}
        </ErrorToast>        
      )
    case TransactionStatus.SUCCESS:
      return (
        <SuccessContainer icon='ok' {...props}>
          <p>Transaction successful</p>
          {txDetails}
        </SuccessContainer>
      )
    default:
      return (
        <PendingContainer icon={<LoadingIcon />} {...props}>
          <p>Transaction in progress</p>
          {txDetails}
        </PendingContainer>
      )
  }
}

const TrackTransactionToast: React.FunctionComponent<Props> = props => {
  return (
    <GlobalConsumer>
      {({ network }: GlobalContextValue) => (
        network ? (
          <Toast
            {...props}
            network={network!}
          />
        ) : (
          <ErrorToast {...props}>
            Not connected to network
          </ErrorToast>
        )
      )}
    </GlobalConsumer>
  )
}

export default TrackTransactionToast
