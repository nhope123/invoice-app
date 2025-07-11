import { Space } from 'antd'
import Card from 'antd/es/card/Card'
import Title from 'antd/es/typography/Title'
import { type FC, memo } from 'react'
import CompanyInfo from '../CompanyInfo/CompanyInfo'
import type { ClientCardProps } from './types'

const ClientCard: FC<ClientCardProps> = ({ title, icon, ...rest }) => {
  return (
    <Card>
      <Space>
        {icon && icon}
        <Title level={3}>{title}</Title>
      </Space>

      <CompanyInfo {...rest} />
    </Card>
  )
}

export default memo(ClientCard)
