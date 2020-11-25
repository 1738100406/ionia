import { Image, Progress, Upload } from 'antd';
import { UploadProps } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { ReactElement } from 'react';
import { UploadButton } from '../UploadButton';
import './index.less';

interface ImageUploadProps extends UploadProps {
	title?: string;
	tips?: string;
}

const renderItemRender = (file: UploadFile) => {
	let child = null;
	if (file.status === 'success') {
		child = (
			<>
				<p>上传成功</p>
				<Progress
					width={112}
					size='small'
					showInfo={false}
					strokeColor='#52C41A'
					strokeWidth={4}
					percent={100}
				/>
			</>
		);
	}

	if (file.status === 'uploading') {
		child = (
			<>
				<p>上传中 {file.percent}%</p>
				<Progress
					width={112}
					size='small'
					showInfo={false}
					strokeColor='#1269DB'
					strokeWidth={4}
					percent={file.percent}
				/>
			</>
		);
	}

	if (file.status === 'done') {
		child = (
			<>
				<Image src={file.url} />
			</>
		);
	}

	if (file.status === 'error') {
		child = (
			<>
				<i className='iconfont icon-image' />
				<span>{file.name}</span>
			</>
		);
	}

	return (
		<div
			className={`io-image-upload__item ${
				file.status === 'done' ? 'io-image-upload__item--done' : ''
			} ${file.status === 'error' ? 'io-image-upload__item--error' : ''}`}
		>
			{child}
		</div>
	);
};

export const ImageUpload = ({ title, tips, ...reset }: ImageUploadProps) => {
	const fileList: UploadFile<any>[] = [
		{
			uid: '1',
			name: 'image.png',
			status: 'success',
			url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			size: 10,
			type: '',
		},
		{
			uid: '1',
			name: 'image.png',
			status: 'done',
			url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			size: 10,
			type: '',
		},
		{
			uid: '2',
			percent: 30,
			name: 'image.png',
			status: 'uploading',
			url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			size: 10,
			type: '',
		},
		{
			uid: '3',
			name: 'image.png',
			status: 'error',
			size: 20,
			type: '',
		},
	];

	return (
		<div className='io-image-upload'>
			<Upload
				className='io-image-upload__button'
				fileList={fileList}
				action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
				listType='picture-card'
				itemRender={(originNode: ReactElement, file: UploadFile) => renderItemRender(file)}
				{...reset}
			>
				<UploadButton />
			</Upload>
			{title && <p className='io-file-upload__title'>{title}</p>}
			{tips && <p className='io-file-upload__tips'>{tips}</p>}
		</div>
	);
};