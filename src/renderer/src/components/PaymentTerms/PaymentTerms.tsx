import { List } from 'antd'
import Flex from 'antd/es/flex'
import Title from 'antd/es/typography/Title'
import { type FC, memo } from 'react'
import invoiceData from '../../pages/Invoice/invoiceConstants'

const TITLE = 'Payment Terms'

const PaymentTerms: FC = () => {
  return (
    <Flex vertical>
      <Title level={5}>{TITLE}</Title>
      <List split={false} size="small">
        <List.Item>
          <List.Item.Meta description="Please include invoice number with payment" />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            description={`For questions regarding this invoice, contact: ${invoiceData.company.email}`}
          />
        </List.Item>
      </List>
    </Flex>
  )
}

export default memo(PaymentTerms)
