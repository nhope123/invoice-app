type TableData = {
  key: string;  
  [key2: string]: string | number | Date | unknown; 
};



interface ProjectBreakdownProps {
title: string;
data?: TableData[]; 
columns?: { title: string; dataIndex: string; key: string }[];
};

export type { ProjectBreakdownProps, TableData };
