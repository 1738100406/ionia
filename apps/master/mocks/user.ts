import { rest } from 'msw';

export default [
	//用户详情
	rest.get('/module-user/cmsmanager/users', (req, res, ctx) => {
		return res(
			ctx.json({
				code: 200,
				data: {
					createTime: '',
					createUser: '',
					email: '',
					id: 0,
					lastLoginIp: '',
					lastLoginTime: '',
					orgId: 0,
					orgNodeIds: [],
					realName: '',
					roleIds: [],
					status: 1,
					telephone: '',
					updateTime: '',
					updateUser: '',
					username: '',
				},
				message: '成功',
			})
		);
	}),
	//删除用户
	rest.post('/module-user/cmsmanager/users/delete', (req, res, ctx) => {
		return res(
			ctx.json({
				code: 200,
				data: true,
				message: '成功',
			})
		);
	}),
	//导入
	rest.post('/module-user/cmsmanager/users/import', (req, res, ctx) => {
		return res(
			ctx.json({
				code: 200,
				data: true,
				message: '成功',
			})
		);
	}),
	//查询用户
	rest.get('/module-user/cmsmanager/users/list/in', (req, res, ctx) => {
		return res(
			ctx.json({
				code: 200,
				data: {
					content: [
						{
							id: 0,
							orgName: '',
							realName: '',
							username: '',
						},
					],
					first: true,
					last: true,
					number: 0,
					numberOfElements: 0,
					pageable: {
						offset: 0,
						pageNumber: 0,
						pageSize: 0,
						paged: true,
						sort: {
							sorted: true,
							unsorted: true,
						},
						unpaged: true,
					},
					size: 0,
					sort: {
						sorted: true,
						unsorted: true,
					},
					totalElements: 0,
					totalPages: 0,
				},
				message: '成功',
			})
		);
	}),
	//用户名模糊匹配用户
	rest.get('/module-user/cmsmanager/users/list/match', (req, res, ctx) => {
		return res(
			ctx.json({
				code: 200,
				data: {
					telephone: '110',
					username: 'test1',
				},
				message: '成功',
			})
		);
	}),
	//用户分页
	rest.get('/module-user/cmsmanager/users/page', (req, res, ctx) => {
		const pageNo = req.url.searchParams.get('pageNo');
		const pageSize = req.url.searchParams.get('pageSize');

		const items = [
			{
				createTime: '2020-11-18',
				createUser: '江西金磊科技',
				email: '1111@qq.com',
				id: '12',
				lastLoginIp: '192.168.0.144',
				lastLoginTime: '2020-11-19',
				lastUpdateTime: '2020-11-18',
				org: '江西金磊科技江西金磊科技江西金磊科技',
				realName: '江西金磊科技江西金磊科技江西金磊科技',
				roleNames: '系统管理员',
				status: 0,
				telephone: '18707034572',
				updateUser: '金磊',
				username: '江西金磊科技1江西金磊科技江西金磊科技',
			},
			{
				createTime: '2020-11-18',
				createUser: '江西金磊科技',
				email: '1111@qq.com',
				id: '2',
				lastLoginIp: '192.168.0.144',
				lastLoginTime: '2020-11-20',
				lastUpdateTime: '2020-11-18',
				org: '江西金磊科技江西金磊科技江西金磊科技',
				realName: '江西金磊科技江西金磊科技江西金磊科技',
				roleNames: '信息录入员',
				status: 1,
				telephone: '18707034572',
				updateUser: '金磊',
				username: '江西金磊科技2江西金磊科技江西金磊科技',
			},
			{
				createTime: '2020-11-18',
				createUser: '江西金磊科技',
				email: '1111@qq.com',
				id: '3',
				lastLoginIp: '192.168.0.144',
				lastLoginTime: '2020-11-21',
				lastUpdateTime: '2020-11-18',
				org: '江西金磊科技',
				realName: '江西金磊科技',
				roleNames: '系统管理员',
				status: 0,
				telephone: '18707034572',
				updateUser: '金磊',
				username: '江西金磊科技3江西金磊科技江西金磊科技',
			},
			{
				createTime: '2020-11-18',
				createUser: '江西金磊科技',
				email: '1111@qq.com',
				id: '6',
				lastLoginIp: '192.168.0.144',
				lastLoginTime: '2020-11-22',
				lastUpdateTime: '2020-11-18',
				org: '江西金磊科技',
				realName: '江西金磊科技',
				roleNames: '信息录入员',
				status: 1,
				telephone: '18707034572',
				updateUser: '金磊',
				username: '江西金磊科技4',
			},
			{
				createTime: '2020-11-18',
				createUser: '江西金磊科技',
				email: '1111@qq.com',
				id: '10',
				lastLoginIp: '192.168.0.144',
				lastLoginTime: '2020-11-23',
				lastUpdateTime: '2020-11-18',
				org: '江西金磊科技',
				realName: '江西金磊科技',
				roleNames: '系统管理员',
				status: 0,
				telephone: '18707034572',
				updateUser: '金磊',
				username: '江西金磊科技5',
			},
		];
		let first = Number(pageSize) > items.length ? false : true;
		let last = Number(pageSize) < items.length ? false : true;
		return res(
			ctx.json({
				code: 200,
				data: {
					content: items,
					first: first,
					last: last,
					number: 0,
					numberOfElements: 0,
					pageable: {
						offset: 0,
						pageNumber: pageNo,
						pageSize: pageSize,
						paged: true,
						sort: {
							sorted: true,
							unsorted: true,
						},
						unpaged: true,
					},
					size: 0,
					sort: {
						sorted: true,
						unsorted: true,
					},
					totalElements: 0,
					totalPages: 0,
				},
				message: '成功',
			})
		);
	}),
	//添加用户
	rest.post('/module-user/cmsmanager/users/save', (req, res, ctx) => {
		return res(
			ctx.json({
				code: 200,
				data: true,
				message: '成功',
			})
		);
	}),
	//批量添加用户
	rest.post('/module-user/cmsmanager/users/save/batch', (req, res, ctx) => {
		return res(
			ctx.json({
				code: 200,
				data: true,
				message: '成功',
			})
		);
	}),
	//检验名称是否可用 true 可用 false 不可用
	rest.get('/module-user/cmsmanager/users/unique/username', (req, res, ctx) => {
		return res(
			ctx.json({
				code: 200,
				data: true,
				message: '成功',
			})
		);
	}),
	//修改用户
	rest.post('/module-user/cmsmanager/users/update', (req, res, ctx) => {
		return res(
			ctx.json({
				code: 200,
				data: true,
				message: '成功',
			})
		);
	}),
	//修改密码
	rest.post('/module-user/cmsmanager/users/update/cipher', (req, res, ctx) => {
		return res(
			ctx.json({
				code: 200,
				data: true,
				message: '成功',
			})
		);
	}),
	//修改自己的密码
	rest.post('/module-user/cmsmanager/users/update/cipher/me', (req, res, ctx) => {
		return res(
			ctx.json({
				code: 200,
				data: true,
				message: '成功',
			})
		);
	}),
	//修改状态
	rest.post('/module-user/cmsmanager/users/update/status', (req, res, ctx) => {
		return res(
			ctx.json({
				code: 200,
				data: true,
				message: '成功',
			})
		);
	}),
	//用户详情
	rest.get('/module-user/cmsmanager/users/:id', (req, res, ctx) => {
		return res(
			ctx.json({
				code: 200,
				data: {
					createTime: '2020-11-20 15:36',
					createUser: '江西金磊科技',
					email: '11111@qq.com',
					id: '1',
					lastLoginIp: '192.168.0.144',
					lastLoginTime: '2020-11-21 8:30',
					orgId: '2',
					orgNodeIds: ['0'],
					realName: '江西金磊科技',
					roleIds: ['审核员'],
					status: 1,
					telephone: '18700777700',
					updateTime: '2020-11-20 4:30',
					updateUser: '江西金磊科技',
					username: '江西金磊科技',
				},
				message: '成功',
			})
		);
	}),
];
