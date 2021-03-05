import React from 'react';
import _ from 'lodash';

import {Link, withPrefix} from '../utils';

export default class BlogPostCategory extends React.Component {
    render() {
        let category = _.get(this.props, 'category', null);
        let category_data = category;
        return (
            category_data.link ? (
            <Link to={withPrefix(category_data.link)}>{category_data.title}</Link>
            ) : 
            <span>{category_data.title}</span>
            
        );
    }
}
