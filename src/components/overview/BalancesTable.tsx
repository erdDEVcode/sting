import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
`

interface Props {
  className?: string,
  title: string,
  columnNames?: string[],
}

const BalancesTable: React.FunctionComponent<Props> = ({ className, title, children, columnNames = ['Asset', 'Balance', 'Value'] }) => {
  return (
    <Container className={className}>
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            {columnNames.map((c, i) => <th key={i}>{c}</th>)}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </Container>
  )
}

export default BalancesTable