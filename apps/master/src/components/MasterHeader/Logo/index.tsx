import { Icon, useThemeStore } from '@ionia/libs';
import React, { useEffect } from 'react';
import { useLocalStorage, useMount } from 'react-use';
import './index.less';

export interface TitleProps {}

const Logo: React.FC<TitleProps> = () => {
	const [collapse, setCollapse] = useLocalStorage('io-master-sider-collapse', false);
	const { menuStyles, setMenuStyles, changeTheme } = useThemeStore();

	useMount(() => {
		setMenuStyles({ collapse: !!collapse });
	});

	useEffect(() => {
		setCollapse(menuStyles.collapse);
	}, [menuStyles.collapse]);

	return (
		<div className={`io-master__logo ${menuStyles.collapse ? 'collapse' : ''}`}>
			<h1 className='logo' onClick={() => changeTheme('#1C6CD8')}>
				JEECMS
			</h1>
			<Icon
				name='icon-navigation'
				onClick={() =>
					setMenuStyles({
						collapse: !menuStyles.collapse,
					})
				}
			/>
		</div>
	);
};

export default Logo;