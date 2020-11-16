import { ProColumns } from '@ant-design/pro-table';
import { BizTable, BizTree } from '@ionia/libs';
import { Button } from 'antd';
import React from 'react';
import UserForm from './Form';

export interface TableListItem {
	key: number;
	name: string;
}

const columns: ProColumns<TableListItem>[] = [
	{
		title: '修改时间',
		key: 'since',
		dataIndex: 'updatedAt',
		valueType: 'dateTime',
	},
	{
		title: '创建时间',
		key: 'since',
		dataIndex: 'createdAt',
		valueType: 'dateTime',
	},
	{
		title: '搜索',
		dataIndex: 'keyword',
		key: 'keyword',
	},
];

export default () => {
	return (
		<BizTable
			renderActions={() => (
				<>
					<div className='io-space-item'>
						<UserForm />
					</div>
					<div className='io-space-item'>
						<Button type='default'>启用</Button>
					</div>
					<div className='io-space-item'>
						<Button type='default'>禁用</Button>
					</div>
					<div className='io-space-item'>
						<Button type='default'>删除</Button>
					</div>
				</>
			)}
			renderSider={() => <BizTree />}
			columns={columns}
			request={params => {
				console.log(params);
				return new Promise(resolve => resolve());
			}}
		/>
	);
};
