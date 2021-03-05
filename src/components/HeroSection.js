import React from 'react';
import _ from 'lodash';

import {classNames, htmlToReact, withPrefix} from '../utils';
import SectionActions from './SectionActions';

export default class HeroSection extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let padding_top = _.get(section, 'padding_top', null) || 'medium';
        let padding_bottom = _.get(section, 'padding_bottom', null) || 'medium';
        let align_x = _.get(section, 'align', null) || 'left';
        let bg_color = _.get(section, 'background_color', null) || 'none';
        let has_text = false;
        let has_media = false;
        let media_pos = _.get(section, 'media_position', null) || 'left';
        let is_horiz = false;
        if (((_.get(section, 'title', null) || _.get(section, 'subtitle', null)) || _.get(section, 'actions', null))) {
             has_text = true;
        }
        if ((_.get(section, 'image', null) || _.get(section, 'video_embed_html', null))) {
             has_media = true;
        }
        if (((media_pos === 'left') || (media_pos === 'right'))) {
             is_horiz = true;
        }
        return (
            <React.Fragment>
                <section className={classNames('section', 'hero', {'bg-blue': bg_color === 'blue', 'bg-gray': bg_color === 'gray', 'pt-4': padding_top === 'small', 'pt-6': (padding_top === 'medium') || (padding_top === 'large'), 'pt-md-8': padding_top === 'large', 'pb-4': padding_bottom === 'small', 'pb-6': (padding_bottom === 'medium') || (padding_bottom === 'large'), 'pb-md-8': padding_bottom === 'large'})}>
                	<div className="container">
                		<div className="hero__content grid items-center">
                			{has_media && (
                			<div className={classNames('hero__media', 'cell-12', {'cell-md-6': has_text && is_horiz, 'mt-4': has_text && (media_pos === 'bottom'), 'mb-4': has_text && (media_pos !== 'bottom'), 'mb-md-0': has_text && is_horiz})}>
                				{_.get(section, 'video_embed_html', null) ? (
                					htmlToReact(_.get(section, 'video_embed_html', null))
                				) : 
                					<img src={withPrefix(_.get(section, 'image', null))} alt={_.get(section, 'image_alt', null)} />
                				}
                			</div>
                			)}
                			{has_text && (
                			<div className={classNames('hero__body', 'cell-12', {'cell-md-6': has_media && is_horiz, 'order-first': has_media && (media_pos === 'bottom'), 'order-md-first': has_media && (media_pos === 'right'), 'text-center': align_x === 'center'})}>
                				{_.get(section, 'title', null) && (
                				<h1 className="hero__title mb-3">{_.get(section, 'title', null)}</h1>
                				)}
                				{_.get(section, 'subtitle', null) && (
                				<div className={classNames('hero__subtitle', 'mb-3', {'mt-3': _.get(section, 'title', null)})}>{_.get(section, 'subtitle', null)}</div>
                				)}
                				{_.get(section, 'actions', null) && (
                				<div className={classNames('hero__actions', 'btn-group', {'justify-center': align_x === 'center', 'mt-4': _.get(section, 'title', null) || _.get(section, 'subtitle', null)})}>
                					<SectionActions {...this.props} actions={_.get(section, 'actions', null)} />
                				</div>
                				)}
                			</div>
                			)}
                		</div>
                	</div>
                </section>
            </React.Fragment>
        );
    }
}
