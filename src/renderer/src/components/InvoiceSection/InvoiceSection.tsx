import { Flex, Space } from 'antd'
import Text from 'antd/es/typography/Text'
import Title from 'antd/es/typography/Title'
import { type CSSProperties, type FC, memo } from 'react'
import type { InvoiceSectionProps } from './types'

const style: CSSProperties = {}

const TITLE = 'Invoice Section'
const INVOICE_ID = 'Invoice #:'
const _DATE = 'Date:'

const InvoiceSection: FC<InvoiceSectionProps> = ({ id, date }) => {
  return (
    <Flex vertical style={style}>
      <Title level={3}> {TITLE} </Title>
      <Space>
        <Text strong>{INVOICE_ID}</Text>
        <Text>{id}</Text>
      </Space>
      <Space>
        <Text strong>{_DATE}</Text>
        <Text>{date}</Text>
      </Space>
    </Flex>
  )
}

export default memo(InvoiceSection)
