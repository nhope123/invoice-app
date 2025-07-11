import type { CompanyInfoProps } from '../CompanyInfo/types'

interface ClientCardProps extends CompanyInfoProps {
  title: string;
  icon?: React.ReactNode;
}

export type { ClientCardProps }
