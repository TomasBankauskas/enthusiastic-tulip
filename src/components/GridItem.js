import React from 'react';
import _ from 'lodash';

import {classNames, htmlToReact, withPrefix, markdownify} from '../utils';
import SectionActions from './SectionActions';

export default class GridItem extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let columns = _.get(section, 'grid_cols', null) || 'two';
        let item = _.get(this.props, 'item', null);
        let align_x = _.get(item, 'align', null) || 'left';
        let has_text = false;
        let has_media = false;
        if (((_.get(item, 'title', null) || _.get(item, 'content', null)) || _.get(item, 'actions', null))) {
             has_text = true;
        }
        if ((_.get(item, 'image', null) || _.get(item, 'video_embed_html', null))) {
             has_media = true;
        }
        return (
            <React.Fragment>
                <div className={classNames('cell-12', 'mb-5', 'mb-md-4', {'cell-md-6': columns === 'two', 'cell-md-4': columns === 'three', 'cell-md-3': columns === 'four'})}>
                	<div className={classNames('item', {'text-center': align_x === 'center'})}>
                		{has_media && (
                		<div className="item__media mb-4">
                			{_.get(item, 'video_embed_html', null) ? (
                				htmlToReact(_.get(item, 'video_embed_html', null))
                			) : 
                				<img src={withPrefix(_.get(item, 'image', null))} alt={_.get(item, 'image_alt', null)} />
                			}
                		</div>
                		)}
                		{has_text && (
                		<div className="item__body">
                			{_.get(item, 'title', null) && (
                				_.get(section, 'title', null) ? (
                				<h3 className="item__title h3">{_.get(item, 'title', null)}</h3>
                				) : 
                				<h2 className="item__title h3">{_.get(item, 'title', null)}</h2>
                			)}
                			{_.get(item, 'content', null) && (
                			<div className="item__copy">
                				{markdownify(_.get(item, 'content', null))}
                			</div>
                			)}
                			{_.get(item, 'actions', null) && (
                			<div className={classNames('item__actions', 'btn-group', {'justify-center': align_x === 'center', 'mt-4': _.get(item, 'title', null) || _.get(item, 'content', null)})}>
                				<SectionActions {...this.props} actions={_.get(item, 'actions', null)} />
                			</div>
                			)}
                		</div>
                		)}
                	</div>
                </div>
            </React.Fragment>
        );
    }
}
