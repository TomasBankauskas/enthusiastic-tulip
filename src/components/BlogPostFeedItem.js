import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {classNames, Link, withPrefix} from '../utils';
import BlogPostCategory from './BlogPostCategory';

export default class BlogPostFeedItem extends React.Component {
    render() {
        let post = _.get(this.props, 'post_page', null);
        let blog_feed_section = _.get(this.props, 'blog_feed_section', null);
        let columns = _.get(this.props, 'columns', null);
        return (
            <article className={classNames('cell-12', 'mb-5', 'mb-md-4', {'cell-md-6': columns === 'two', 'cell-md-4': columns === 'three', 'cell-md-3': columns === 'four'})}>
            	<div className="post-card">
            		{(_.get(blog_feed_section, 'show_image', null) && _.get(post, 'frontmatter.thumb_image', null)) && (
            		<div className="post-card__image mb-4">
            			<Link to={withPrefix(_.get(post, 'url', null))}>
            				<img src={withPrefix(_.get(post, 'frontmatter.thumb_image', null))} alt={_.get(post, 'frontmatter.thumb_image_alt', null)} />
            				<div className="post-card__overlay"><span className="post-card__overlay-text">Read</span></div>
            			</Link>
            		</div>
            		)}
            		<div className="post-card__body">
            			{(_.get(blog_feed_section, 'show_category', null) && _.get(post, 'frontmatter.category', null)) && (
            			<div className="post-card__cat mb-2">
            				<BlogPostCategory {...this.props} category={_.get(post, 'frontmatter.category', null)} />
            			</div>
            			)}
            			{_.get(blog_feed_section, 'title', null) ? (
            			<h3 className={classNames('post-card__title', 'mt-0', {'h2': columns === 'one', 'h5': columns !== 'one'})}><Link to={withPrefix(_.get(post, 'url', null))}>{_.get(post, 'frontmatter.title', null)}</Link></h3>
            			) : 
            			<h2 className={classNames('post-card__title', 'mt-0', {'h2': columns === 'one', 'h5': columns !== 'one'})}><Link to={withPrefix(_.get(post, 'url', null))}>{_.get(post, 'frontmatter.title', null)}</Link></h2>
            			}
            			{(_.get(blog_feed_section, 'show_excerpt', null) && _.get(post, 'frontmatter.excerpt', null)) && (
            			<p className="post-card__copy">
            				{_.get(post, 'frontmatter.excerpt', null)}
            			</p>
            			)}
            			{(_.get(blog_feed_section, 'show_author', null) && _.get(post, 'frontmatter.author', null)) && ((() => {
            			    let author_data = _.get(post, 'frontmatter.author', null);
            			    return (
                				<div className="post-card__meta">{author_data.link ? (<Link to={withPrefix(author_data.link)}>{author_data.first_name} {author_data.last_name}</Link>) : <span>{author_data.first_name} {author_data.last_name}</span>}</div>
                			);
            			})())}
            			{_.get(blog_feed_section, 'show_date', null) && (
            			<div className="post-card__meta"><time dateTime={moment(_.get(post, 'frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'frontmatter.date', null)).strftime('%B %d, %Y')}</time></div>
            			)}
            		</div>
            	</div>
            </article>
        );
    }
}
