import { ModalForm, ModalFormProps } from '@ant-design/pro-form';
import { SubmitterProps } from '@ant-design/pro-form/lib/components/Submitter';
import { Button, Form } from 'antd';
import React, { ReactNode, useState } from 'react';
import './index.less';
import { validateMessages } from './rule';

interface RenderTriggerParams {
	open: () => void;
}

interface RenderSubmitterParams {
	props: SubmitterProps;
	doms: JSX.Element[];
	close: () => void;
}

interface BizModalFormProps extends ModalFormProps {
	title?: string;
	width?: number;
	children?: ReactNode;
	renderTrigger?: (params: RenderTriggerParams) => ReactNode;
	renderSubmitter?: (params: RenderSubmitterParams) => ReactNode;
}

export const BizModalForm = ({
	title,
	children,
	renderTrigger,
	renderSubmitter,
	width = 530,
	...reset
}: BizModalFormProps) => {
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);

	const toOpen = () => {
		setVisible(true);
	};
	const toClose = () => {
		setVisible(false);
	};

	const defaultRenderTrigger = () => (
		<Button
			type='primary'
			onClick={() => {
				toOpen();
			}}
		>
			新建
		</Button>
	);

	const defaultRenderSubmitter = () => {
		return (
			<div className='btn-submitter'>
				<Button type='default' onClick={() => toClose()}>
					取消
				</Button>
				<Button type='primary' htmlType='submit'>
					保存
				</Button>
			</div>
		);
	};

	return (
		<ModalForm
			form={form}
			layout='horizontal'
			title={title}
			width={width}
			visible={visible}
			className='io-libs__from'
			validateMessages={validateMessages}
			modalProps={{
				onCancel: toClose,
			}}
			trigger={
				renderTrigger
					? renderTrigger({
							open: () => toOpen(),
					  })
					: defaultRenderTrigger()
			}
			submitter={{
				render: (_props, _doms) => {
					return renderSubmitter
						? renderSubmitter({
								props: _props,
								doms: _doms,
								close: toClose,
						  })
						: defaultRenderSubmitter();
				},
			}}
			{...reset}
		>
			{children}
		</ModalForm>
	);
};
