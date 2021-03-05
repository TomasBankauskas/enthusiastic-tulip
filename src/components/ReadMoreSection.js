import React from 'react';
import _ from 'lodash';

import {classNames, getPages} from '../utils';
import BlogPostFeedItem from './BlogPostFeedItem';

export default class ReadMoreSection extends React.Component {
    render() {
        let page = _.get(this.props, 'page', null);
        let section = _.get(this.props, 'section', null);
        let align_x = _.get(section, 'align', null) || 'left';
        let padding_top = _.get(section, 'padding_top', null) || 'medium';
        let padding_bottom = _.get(section, 'padding_bottom', null) || 'medium';
        let bg_color = _.get(section, 'background_color', null) || 'none';
        let blog_feed_cols = _.get(section, 'blog_feed_cols', null) || 'four';
        return (
            <section className={classNames('section', 'blog-feed', {'bg-gray': bg_color === 'gray', 'pt-4': padding_top === 'small', 'pt-6': (padding_top === 'medium') || (padding_top === 'large'), 'pt-md-8': padding_top === 'large', 'pb-4': padding_bottom === 'small', 'pb-6': (padding_bottom === 'medium') || (padding_bottom === 'large'), 'pb-md-8': padding_bottom === 'large'})}>
            	<div className="container">
            		{_.get(section, 'title', null) && (
            		<h2 className={classNames('section__title', 'mb-3', {'text-center': align_x === 'center'})}>{_.get(section, 'title', null)}</h2>
            		)}
            		{_.get(section, 'subtitle', null) && (
            		<div className={classNames('section__subtitle', 'mb-3', {'mt-3': _.get(section, 'title', null), 'text-center': align_x === 'center'})}>{_.get(section, 'subtitle', null)}</div>
            		)}
            		{_.get(page, 'frontmatter.category', null) && ((() => {
            		    let read_more_category = _.get(page, 'frontmatter.category', null);
            		    let posts_all = _.filter(getPages(this.props.pageContext.pages, '/articles'), item => _.get(item, 'frontmatter.title') != _.get(page, 'frontmatter.title', null));
            		    let posts_sorted = _.orderBy(posts_all, 'frontmatter.date', 'desc');
            		    let post_count = 0;
            		    return (
                		<div className={classNames('grid', {'mt-5': _.get(section, 'title', null) || _.get(section, 'subtitle', null)})}>
                			{_.map(posts_sorted, (post, post_idx) => {
                			    let is_post = false;
                			    if ((_.get(post, 'frontmatter.template', null) === 'post')) {
                			         is_post = true;
                			    }
                			    return (<React.Fragment key={post_idx + '.1'}>
                    				{(is_post && (post_count < 4)) && (
                    					_.get(post, 'frontmatter.category', null) && ((() => {
                    					    let post_category = _.get(post, 'frontmatter.category', null);
                    					    return (
                        						(post_category.id === read_more_category.id) && ((() => {
                        						     post_count = post_count + 1;
                        						    return (
                            							<BlogPostFeedItem key={post_idx} {...this.props} blog_feed_section={section} post_page={post} columns={blog_feed_cols} />
                            						);
                        						})())
                        					);
                    					})())
                    				)}
                    			</React.Fragment>)
                			})}
                		</div>
                		);
            		})())}
            	</div>
            </section>
        );
    }
}
