import React from 'react';
import _ from 'lodash';

import {classNames, getPage} from '../utils';
import BlogPostFeedItem from './BlogPostFeedItem';
import SectionActions from './SectionActions';

export default class FeaturedPostsSection extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let align_x = _.get(section, 'align', null) || 'left';
        let padding_top = _.get(section, 'padding_top', null) || 'medium';
        let padding_bottom = _.get(section, 'padding_bottom', null) || 'medium';
        let bg_color = _.get(section, 'background_color', null) || 'none';
        return (
            <section className={classNames('section', 'blog-feed', {'bg-gray': bg_color === 'gray', 'pt-4': padding_top === 'small', 'pt-6': (padding_top === 'medium') || (padding_top === 'large'), 'pt-md-8': padding_top === 'large', 'pb-4': padding_bottom === 'small', 'pb-6': (padding_bottom === 'medium') || (padding_bottom === 'large'), 'pb-md-8': padding_bottom === 'large'})}>
            	<div className="container">
            		{_.get(section, 'title', null) && (
            		<h2 className={classNames('section__title', 'mb-3', {'text-center': align_x === 'center'})}>{_.get(section, 'title', null)}</h2>
            		)}
            		{_.get(section, 'subtitle', null) && (
            		<div className={classNames('section__subtitle', 'mb-3', {'mt-3': _.get(section, 'title', null), 'text-center': align_x === 'center'})}>{_.get(section, 'subtitle', null)}</div>
            		)}
            		{_.get(section, 'posts', null) && ((() => {
            		    let left_posts = _.get(section, 'posts', null).slice(0, 1);
            		    let right_posts = _.get(section, 'posts', null).slice(1);
            		    return (
                		<div className={classNames('grid', {'mt-5': _.get(section, 'title', null) || _.get(section, 'subtitle', null)})}>
                			<div className="cell-12 cell-md-7">
                				<div className="sticky">
                					<div className="grid blog-feed__left">
                						{_.map(left_posts, (post, post_idx) => {
                						    let post_page = getPage(this.props.pageContext.pages, post.stackbit_url_path);
                						    return (
                    							post_page && (
                    								<BlogPostFeedItem key={post_idx} {...this.props} blog_feed_section={section} post_page={post_page} columns={'one'} />
                    							)
                    						)
                						})}
                					</div>
                				</div>
                			</div>
                			<div className="cell-12 cell-md-5">
                				<div className="grid blog-feed__right">
                					{_.map(right_posts, (post, post_idx) => {
                					    let post_page = getPage(this.props.pageContext.pages, post.stackbit_url_path);
                					    return (
                    						post_page && (
                    							<BlogPostFeedItem key={post_idx} {...this.props} blog_feed_section={section} post_page={post_page} columns={'two'} />
                    						)
                    					)
                					})}
                				</div>
                			</div>
                		</div>		
                		);
            		})())}
            		{_.get(section, 'actions', null) && (
            		<div className={classNames('section__actions', 'mt-4', 'btn-group', {'justify-center': align_x === 'center'})}>
            			<SectionActions {...this.props} actions={_.get(section, 'actions', null)} />
            		</div>
            		)}
            	</div>
            </section>
        );
    }
}
