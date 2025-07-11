import { FileTextOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import Text from 'antd/es/typography/Text'
import type { CSSProperties, FC } from 'react'
import ClientCard from '../../components/ClientCard/ClientCard'
import CompanyInfo from '../../components/CompanyInfo/CompanyInfo'
import InvoiceSection from '../../components/InvoiceSection/InvoiceSection'
import InvoiceSummary from '../../components/InvoiceSummary/InvoiceSummary'
import PaymentTerms from '../../components/PaymentTerms/PaymentTerms'
import ProjectBreakdown from '../../components/ProjectBreakdown/ProjectBreakdown'
import {
  generateSubtotal,
  generateSummaryData,
  generateTableData
} from '../../utils/helpers/invoice'
import invoiceData from './invoiceConstants'

const { client, projects, company, invoiceNumber: id, date } = invoiceData
const columns = [
  { title: 'Task', dataIndex: 'task', key: 'task' },
  { title: 'Hours', dataIndex: 'hours', key: 'hours' },
  { title: 'Rate', dataIndex: 'rate', key: 'rate' },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (text) => `$${text.toFixed(2)}`,
    align: 'right'
  }
]

const THANKS = 'Thank you for your business!'
const TITLE = 'Bill To:'
const TOTAL_TEXT = 'Total Amount:'
const style: CSSProperties = {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '54px 16px',
  minHeight: '100vh'
}

const Invoice: FC = () => {
  return (
    <Flex vertical style={style} gap="large">
      <Flex gap={'large'} style={{ justifyContent: 'space-between' }}>
        <InvoiceSection {...{ id, date }} />
        <CompanyInfo {...company} />
      </Flex>
      <ClientCard
        icon={<FileTextOutlined style={{ fontSize: '18px' }} />}
        title={TITLE}
        {...client}
      />
      <Flex vertical gap="small">
        {projects.map((i) => (
          <ProjectBreakdown
            key={i.id}
            title={i.name}
            data={generateTableData(i.tasks)}
            columns={columns}
          />
        ))}
      </Flex>
      <InvoiceSummary
        totalValue={generateSubtotal(projects)}
        totalText={TOTAL_TEXT}
        summary={generateSummaryData(projects)}
      />

      <PaymentTerms />
      <Flex align="center" justify="center" style={{ width: '100%' }}>
        <Text>{THANKS}</Text>
      </Flex>
    </Flex>
  )
}

export default Invoice
