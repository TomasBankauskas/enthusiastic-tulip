import React from 'react';
import _ from 'lodash';

import {classNames, withPrefix} from '../utils';
import SectionActions from './SectionActions';

export default class CtaSection extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let padding_top = _.get(section, 'padding_top', null) || 'medium';
        let padding_bottom = _.get(section, 'padding_bottom', null) || 'medium';
        let align_x = _.get(section, 'align', null) || 'left';
        let bg_color = _.get(section, 'background_color', null) || 'none';
        let image_pos = _.get(section, 'image_position', null) || 'left';
        return (
            <section className={classNames('section', 'cta', {'bg-blue': bg_color === 'blue', 'bg-gray': bg_color === 'gray'})}>
            	<div className="container">
            		<div className="grid items-center">
            			<div className={classNames('cta__body', 'cell-12', {'cell-md-6': _.get(section, 'image', null), 'text-center': align_x === 'center', 'pt-4': padding_top === 'small', 'pt-6': (padding_top === 'medium') || (padding_top === 'large'), 'pt-md-8': padding_top === 'large', 'pb-4': padding_bottom === 'small', 'pb-6': (padding_bottom === 'medium') || (padding_bottom === 'large'), 'pb-md-8': padding_bottom === 'large'})}>
            				{_.get(section, 'title', null) && (
            				<h2 className="cta__title mb-3">{_.get(section, 'title', null)}</h2>
            				)}
            				{_.get(section, 'subtitle', null) && (
            				<div className={classNames('cta__subtitle', 'mb-3', {'mt-3': _.get(section, 'title', null)})}>{_.get(section, 'subtitle', null)}</div>
            				)}
            				{_.get(section, 'actions', null) && (
            				<div className={classNames('section__actions', 'btn-group', {'justify-center': align_x === 'center', 'mt-4': _.get(section, 'title', null) || _.get(section, 'subtitle', null)})}>
            					<SectionActions {...this.props} actions={_.get(section, 'actions', null)} />
            				</div>
            				)}
            			</div>
            			{_.get(section, 'image', null) && (
            			<div className={classNames('cta__image', 'cell-12', 'cell-md-6', {'order-md-first': image_pos === 'left'})}>
            				<img src={withPrefix(_.get(section, 'image', null))} alt={_.get(section, 'image_alt', null)} className="mx-auto" />
            			</div>
            			)}
            		</div>
            	</div>
            </section>
        );
    }
}
