export interface ApiItemVO {
	apiName: string;
	apiUrl: string;
	id: string;
	requestMethod: number;
	useScene: string;
}

export interface ApiVO {
	content: ApiItemVO[];
	pageNo: number;
	pageSize: number;
	pages: number;
	total: number;
}
