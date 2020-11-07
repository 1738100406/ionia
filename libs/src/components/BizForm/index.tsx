import React from 'react';
import { Button, Form } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { ProFormProps } from '@ant-design/pro-form';
import './index.less';

export interface BizFormProps extends ProFormProps {
	renderActions?: boolean;
	onSubmit?: () => void;
	onCancel?: () => void;
	butLoading?: boolean;
	// tabList?: any;
}

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 12 },
};
export const BizForm: React.FC<BizFormProps> = props => {
	const {
		children,
		onSubmit,
		renderActions = true,
		onCancel = () => history.back(),
		// tabList = [
		// 	{
		// 		key: 'basic',
		// 		tab: '基本信息',
		// 	},
		// 	{
		// 		key: 'permission',
		// 		tab: '用户权限',
		// 	},
		// ],
		...reset
	} = props;
	return (
		// <ProForm submitter={false}>
		<div className='io-biz-form'>
			<Form scrollToFirstError {...layout} {...reset}>
				{renderActions && (
					<Form.Item className='io-biz-form_action-footer'>
						<Button
							className='io-biz-form_backbut'
							onClick={() => history.back()}
							size='small'
						>
							<LeftOutlined />
							返回
						</Button>
						<Button
							type='primary'
							htmlType='submit'
							className='io-biz-form_subbut'
							size='small'
						>
							保存
						</Button>
					</Form.Item>
				)}
				{children}
			</Form>
			{/* </ProForm> */}
		</div>
	);
};
