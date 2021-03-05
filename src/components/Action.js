import React from 'react';
import _ from 'lodash';

import {Link, classNames, withPrefix} from '../utils';
import Icon from './Icon';

export default class Action extends React.Component {
    render() {
        let action = _.get(this.props, 'action', null);
        let action_style = _.get(action, 'style', null) || 'link';
        let action_icon_pos = _.get(action, 'icon_position', null) || 'right';
        return (
            <Link className={classNames({'btn': (action_style === 'button') || _.get(action, 'has_icon', null), 'btn--primary': action_style === 'button', 'btn--icon': _.get(action, 'has_icon', null) && (action_icon_pos === 'center'), 'btn--reversed': _.get(action, 'has_icon', null) && (action_icon_pos === 'left'), 'btn--clear': _.get(action, 'has_icon', null) && (action_style === 'link')})} to={withPrefix(_.get(action, 'url', null))} {...(_.get(action, 'new_window', null) ? ({target: '_blank', rel: 'noopener'}) : null)}>
            	<span className={classNames({'sr-only': _.get(action, 'has_icon', null) && (action_icon_pos === 'center')})}>{_.get(action, 'label', null)}</span>
            	{_.get(action, 'has_icon', null) && (
            		<Icon {...this.props} icon={_.get(action, 'icon', null)} />
            	)}
            </Link>
        );
    }
}
