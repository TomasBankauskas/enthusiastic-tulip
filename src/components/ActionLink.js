import React from 'react';
import _ from 'lodash';

import {Link, withPrefix} from '../utils';

export default class ActionLink extends React.Component {
    render() {
        let action = _.get(this.props, 'action', null);
        return (
            <Link to={withPrefix(_.get(action, 'url', null))}
            	{...(_.get(action, 'new_window', null) ? ({target: '_blank', rel: 'noopener'}) : null)}>
            	{_.get(action, 'label', null)}</Link>
        );
    }
}
