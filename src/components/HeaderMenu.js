import React from 'react';
import _ from 'lodash';

import {classNames} from '../utils';
import Action from './Action';

export default class HeaderMenu extends React.Component {
    render() {
        let menu = _.get(this.props, 'header_menu', null);
        let font_size = _.get(this.props, 'font_size', null);
        return (
            <ul className={classNames('menu', {'menu--large': font_size === 'large'})}>
            {_.map(menu, (item, item_idx) => (
            	<li key={item_idx} className={classNames('menu__item', {'mb-2': font_size === 'regular', 'mb-3': font_size === 'large'})}>
            		<Action {...this.props} action={item} />
            	</li>
            ))}
            </ul>
        );
    }
}
