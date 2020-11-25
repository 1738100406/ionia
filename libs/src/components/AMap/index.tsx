import React, { useEffect, useState } from 'react';
import { Map, Marker } from 'react-amap';
import { AMapAutoComplete } from './AutoComplate';
import './index.less';

interface Position {
	longitude: number;
	latitude: number;
}
interface AMapProps {
	defaultPosition?: Position;
	onChange?: (position: Position) => void;
}

const pluginProps = {};
const style = {};

export const AMap = ({ onChange, defaultPosition }: AMapProps) => {
	const [center, setCenter] = useState<Position>(
		defaultPosition ?? {
			longitude: 115,
			latitude: 30,
		}
	);

	useEffect(() => {
		onChange && onChange(center);
	}, [center]);

	return (
		<div className='io-amap'>
			<Map
				center={center}
				plugins={['ControlBar']}
				events={{
					click: (e: any) => {
						setCenter({
							longitude: e.lnglat.lng,
							latitude: e.lnglat.lat,
						});
					},
				}}
			>
				<AMapAutoComplete
					position={center}
					options={pluginProps}
					onSelect={(e: any) => {
						setCenter({
							longitude: e.poi.location.lng,
							latitude: e.poi.location.lat,
						});
					}}
					style={style}
					placeholder='搜索'
				/>
				<Marker
					position={center}
					draggable
					events={{
						dragend: (e: any) => {
							setCenter({
								longitude: e.lnglat.lng,
								latitude: e.lnglat.lat,
							});
						},
					}}
				/>
			</Map>
		</div>
	);
};
