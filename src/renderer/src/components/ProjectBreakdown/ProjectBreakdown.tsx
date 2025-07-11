import Flex from 'antd/es/flex'
import Table from 'antd/es/table'
import Title from 'antd/es/typography/Title'
import { type FC, useCallback } from 'react'
import type { ProjectBreakdownProps } from './types'

const SUB_TOTAL = 'Sub Total'
const rootStyle: React.CSSProperties = {
  width: '100%',
  padding: '16px',
  border: '3px solid #fbfbfb',
  borderRadius: '8px'
}

const ProjectBreakdown: FC<ProjectBreakdownProps> = ({
  title,
  data = [],
  columns = []
}) => {
  // Calculate total with proper type checking
  const calculateTotal = useCallback(() => {
    return data.reduce((acc, item) => {
      const amount = typeof item.amount === 'number' ? item.amount : 0
      return acc + amount
    }, 0)
  }, [data])

  return (
    <Flex vertical gap="middle" style={rootStyle}>
      {/* Project Title */}
      <Title level={3}>{title}</Title>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={columns.length - 1}>
                {SUB_TOTAL}
              </Table.Summary.Cell>
              <Table.Summary.Cell align="right" index={1} colSpan={1}>
                {`$${calculateTotal()}`}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
        rowKey={(record) => record.key.toString()}
      />
    </Flex>
  )
}

export default ProjectBreakdown
