import React from 'react';
import { Button, Modal, Progress } from 'antd';
import { BizPage, BizTable } from '@ionia/libs';
import './index.less';

const columns = [
	{
		title: '栏目名称',
		key: '',
		dataIndex: '',
	},
	{
		title: '静态页',
		key: '',
		dataIndex: '',
		render: (_: any, row: any) => <i className='iconfont icon-select' />,
	},
];

export const Section = () => {
	return (
		<div className='io-cms-site-publish-section'>
			<BizPage
				showActions={true}
				renderActions={() => (
					<>
						<Button
							type='primary'
							onClick={() => {
								const precent = 30;
								Modal.info({
									title: (
										<span className='io-cms-site-publish-section-title__modal'>
											生成静态页
										</span>
									),
									content: <Progress percent={precent} />,
									okText: '后台运行',
									icon: '',
								});
							}}
							className='io-cms-site-publish-section-generate_but'
						>
							生成栏目静态页
						</Button>
						<Button>取消栏目静态页</Button>
					</>
				)}
			>
				<BizTable toolBarRender={false} columns={columns} rowSelection={{}} />
			</BizPage>
		</div>
	);
};
