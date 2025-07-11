import { Flex } from 'antd'
import Card from 'antd/es/card/Card'
import Text from 'antd/es/typography/Text'
import Title from 'antd/es/typography/Title'
import type { FC } from 'react'
import type { InvoiceSummaryProps } from './types'

const InvoiceSummary: FC<InvoiceSummaryProps> = ({
  totalValue,
  totalText,
  summary = []
}) => {
  return (
    <Card>
      <Flex vertical>
        {summary.map((i) => (
          <Flex align="center" justify="space-between" key={i.label}>
            <Text>{i.label}</Text>
            <Text>{i.value}</Text>
          </Flex>
        ))}
        <Flex align="center" justify="space-between">
          <Title level={4}>{totalText}</Title>
          <Title level={4}>{`$${totalValue.toFixed(2)}`}</Title>
        </Flex>
      </Flex>
    </Card>
  )
}

export default InvoiceSummary
