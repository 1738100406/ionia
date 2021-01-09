import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import {
	AdminGoodsCategoryItemVO,
	BizPage,
	goodsCategoryPage,
	goodsCategorySave,
	goodsCategoryUpdate,
	goodsCategoryInfo,
	logger,
} from '@ionia/libs';
import { Button, Form, Input, Modal, Space, DatePicker, message } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment';
import './index.less';
import { useRequest } from 'ahooks';

const { RangePicker } = DatePicker;
const CommodityCategoryList = () => {
	// const { run } = useRequest(() => goodsCategoryInfo(id), {
	// 	manual: true,
	// });
	const ref = useRef<ActionType>();
	const [form] = Form.useForm();
	const [dateForm] = Form.useForm();
	const params = {
		pageNo: 1,
		pageSize: 10,
		name: '',
		pageSort: '',
		beginUpdateTime: '',
		endUpdateTime: '',
	};
	const [categoryVisible, setCategoryVisible] = useState<boolean>(false);
	const [title, setTitle] = useState<string>('');
	const [value, setValue] = useState('');
	const [id, setId] = useState<string>('');
	const [categoryParams, setCategoryParams] = useState(params);
	const [date, setDate] = useState([]);
	useEffect(() => {
		if (id) {
			console.log(id);
			goodsCategoryInfo(id).then((res: any) => {
				console.log(res);
				form.setFieldsValue({ ...res.data });
			});
		}
	}, [id]);
	const columns: ProColumns<AdminGoodsCategoryItemVO>[] = [
		{
			title: '商品类目',
			dataIndex: 'name',
			render: (_: any, row: any) => (
				<a
					onClick={() => {
						console.log(row);
						setId(row.id);
						openModal('edit');
					}}
				>
					{_}
				</a>
			),
		},
		{
			title: '商品数量',
			dataIndex: 'goodsNum',
			sorter: (a: any, b: any, order: any) => {
				console.log(a, b, order, 'a');
				let sort = order == 'ascend' ? 'asc' : 'desc';
				setCategoryParams({ ...categoryParams, pageSort: `goodsNum  ${sort}` });
				return a.goodsNum - b.goodsNum;
			},
		},

		{
			title: '更新时间',
			dataIndex: 'updateTime',
			sorter: (a, b) => new Date(a.updateTime).getTime() - new Date(b.updateTime).getTime(),
			filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
				<div style={{ padding: 8 }}>
					<Form form={dateForm}>
						<Form.Item name='date'>
							<RangePicker format='YYYY-MM-DD' allowClear />
						</Form.Item>
					</Form>
					<Space />
					<div className='io-cms-commodity-category-container_search'>
						<Button type='primary' onClick={onSearch}>
							查询
						</Button>
						<Button
							onClick={() => {
								dateForm.resetFields();
							}}
						>
							重置
						</Button>
					</div>
				</div>
			),
		},
		{
			title: '操作',
			key: 'option',
			valueType: 'option',
			render: (row: any) => [<a key='link'>删除</a>],
		},
	];

	const onChange = (value: any, dateString: any) => {
		console.log('Formatted Selected Time: ', dateString);
		setDate(dateString);
	};

	const onSearch = () => {
		const date = dateForm.getFieldValue('date');
		const startTime = moment(date[0]).format('YYYY-MM-DD') + ' 00:00:00';
		const endTime = moment(date[1]).format('YYYY-MM-DD') + ' 00:00:00';
		logger.debug('startTime', startTime, 'endTime', endTime);
		setCategoryParams({
			...categoryParams,
			beginUpdateTime: startTime,
			endUpdateTime: endTime,
		});
	};
	const openModal = (type: any) => {
		setCategoryVisible(true);
		type == 'add' ? setTitle('添加商品类目') : setTitle('编辑商品类目');
	};

	const closeModal = () => {
		setCategoryVisible(false);
		form.resetFields();
	};

	const onFinish = async (values: any) => {
		if (id) {
			const { code } = await goodsCategoryUpdate({ ...values, id });
			if (code == 200) {
				message.success('修改成功');
			}
		} else {
			const { code } = await goodsCategorySave({ ...values });
			if (code == 200) {
				message.success('添加成功');
			}
		}
		ref.current?.reload();
		closeModal();
	};

	const saveData = () => {
		form.submit();
	};
	return (
		<div className='io-cms-commodity-category_container'>
			<BizPage>
				<ProTable<AdminGoodsCategoryItemVO>
					actionRef={ref}
					columns={columns}
					pagination={{
						pageSize: 10,
						showQuickJumper: true,
					}}
					rowSelection={{}}
					params={categoryParams}
					request={async (params: any) => {
						// 这里需要返回一个 Promise,在返回之前你可以进行数据转化
						// 如果需要转化参数可以在这里进行修改
						console.log('params', params);
						const data = await goodsCategoryPage({ ...categoryParams });
						return {
							data: data.data.content,
							// success 请返回 true，
							// 不然 table 会停止解析数据，即使有数据
							success: true,
							// 不传会使用 data 的长度，如果是分页一定要传
							total: data.data.total,
						};
					}}
					scroll={{ x: 1300 }}
					search={false}
					rowKey='id'
					options={{
						reload: true,
						density: false,
						setting: true,
						fullScreen: true,
					}}
					toolbar={{
						search: (
							<div className='io-biz-table__action-container'>
								<Button
									type='primary'
									className='io-cms-commodity-category_container-button'
									onClick={() => {
										openModal('add');
									}}
								>
									新建
								</Button>
								<Button type='default'>删除</Button>
							</div>
						),
						actions: [
							<Input
								key='search'
								style={{ width: 208 }}
								allowClear
								placeholder='请输入商品类目名称'
								onChange={e => {
									setValue(e.target.value);
								}}
							/>,
							<Button
								key='search-button'
								type='primary'
								onClick={() => {
									setCategoryParams({ ...categoryParams, name: value });
								}}
							>
								查询
							</Button>,
							<Button key='reset-button' type='default'>
								重置
							</Button>,
						],
					}}
				/>
				<Modal
					visible={categoryVisible}
					onCancel={closeModal}
					title={title}
					onOk={saveData}
				>
					<Form form={form} onFinish={onFinish}>
						<Form.Item
							label='商品类目'
							name='name'
							rules={[{ required: true, message: '请输入商品类目!' }]}
						>
							<Input placeholder='请输入商品类目' />
						</Form.Item>
					</Form>
				</Modal>
			</BizPage>
		</div>
	);
};

export default CommodityCategoryList;
