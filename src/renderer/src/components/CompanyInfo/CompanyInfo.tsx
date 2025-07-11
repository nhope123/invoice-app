import { Flex } from 'antd'
import Text from 'antd/es/typography/Text'
import Title from 'antd/es/typography/Title'
import type { FC } from 'react'
import type { CompanyInfoProps } from './types'

const CompanyInfo: FC<CompanyInfoProps> = ({
  name,
  street,
  city,
  state,
  zip,
  country,
  phone,
  email
}) => {
  return (
    <Flex>
      <Title level={2}>{name}</Title>
      <Text>{street}</Text>
      <Text>
        {`${city}, ${state}`}
      </Text>
      <Text>{`${country}, ${zip}`}</Text>
      {phone && <Text>{phone}</Text>}
      {email && <Text>{email}</Text>}
    </Flex>
  )
}

export default CompanyInfo
