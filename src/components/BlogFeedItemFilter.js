import React from 'react';
import _ from 'lodash';

import BlogPostFeedItem from './BlogPostFeedItem';

export default class BlogFeedItemFilter extends React.Component {
    render() {
        let section = _.get(this.props, 'blog_feed_section', null);
        let section_author = _.get(this.props, 'section_author', null);
        let section_category = _.get(this.props, 'section_category', null);
        let blog_feed_cols = _.get(section, 'blog_feed_cols', null) || 'four';
        let post = _.get(this.props, 'post_page', null);
        return (
            section_author ? (
            	_.get(post, 'frontmatter.author', null) && ((() => {
            	    let post_author = _.get(post, 'frontmatter.author', null);
            	    return (
                		(post_author.id === _.get(section_author, 'id', null)) && (
                			<BlogPostFeedItem {...this.props} blog_feed_section={section} columns={blog_feed_cols} post_page={post} />
                		)
                	);
            	})())
            ) : (section_category ? (
            	_.get(post, 'frontmatter.category', null) && ((() => {
            	    let post_category = _.get(post, 'frontmatter.category', null);
            	    return (
                		(post_category.id === _.get(section_category, 'id', null)) && (
                			<BlogPostFeedItem {...this.props} blog_feed_section={section} columns={blog_feed_cols} post_page={post} />
                		)
                	);
            	})())
            ) : 
            	<BlogPostFeedItem {...this.props} blog_feed_section={section} columns={blog_feed_cols} post_page={post} />
            )
        );
    }
}
