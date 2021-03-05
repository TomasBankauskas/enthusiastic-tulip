import React from 'react';
import _ from 'lodash';

import {classNames} from '../utils';
import GridItem from './GridItem';

export default class GridSection extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let padding_top = _.get(section, 'padding_top', null) || 'medium';
        let padding_bottom = _.get(section, 'padding_bottom', null) || 'medium';
        let align_x = _.get(section, 'align', null) || 'left';
        let bg_color = _.get(section, 'background_color', null) || 'none';
        return (
            <section className={classNames('section', 'grid-section', {'bg-blue': bg_color === 'blue', 'bg-gray': bg_color === 'gray', 'pt-4': padding_top === 'small', 'pt-6': (padding_top === 'medium') || (padding_top === 'large'), 'pt-md-8': padding_top === 'large', 'pb-4': padding_bottom === 'small', 'pb-6': (padding_bottom === 'medium') || (padding_bottom === 'large'), 'pb-md-8': padding_bottom === 'large'})}>
            	<div className="container">
            		{_.get(section, 'title', null) && (
            		<h2 className={classNames('section__title', 'mb-3', {'text-center': align_x === 'center'})}>{_.get(section, 'title', null)}</h2>
            		)}
            		{_.get(section, 'subtitle', null) && (
            		<div className={classNames('section__subtitle', 'mb-3', {'mt-3': _.get(section, 'title', null), 'text-center': align_x === 'center'})}>{_.get(section, 'subtitle', null)}</div>
            		)}
            		{_.get(section, 'grid_items', null) && (
            		<div className={classNames('grid', {'mt-5': _.get(section, 'title', null) || _.get(section, 'subtitle', null)})}>
            			{_.map(_.get(section, 'grid_items', null), (item, item_idx) => (
            				<GridItem key={item_idx} {...this.props} section={section} item={item} />
            			))}
            		</div>
            		)}
            	</div>
            </section>
        );
    }
}
