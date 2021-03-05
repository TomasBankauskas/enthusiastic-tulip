import React from 'react';
import _ from 'lodash';

import {classNames, getPages} from '../utils';
import BlogFeedItemFilter from './BlogFeedItemFilter';
import SectionActions from './SectionActions';

export default class BlogFeedSection extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let align_x = _.get(section, 'align', null) || 'left';
        let padding_top = _.get(section, 'padding_top', null) || 'medium';
        let padding_bottom = _.get(section, 'padding_bottom', null) || 'medium';
        let bg_color = _.get(section, 'background_color', null) || 'none';
        let has_subtitle = false;
        let section_author = false;
        let section_category = false;
        let posts_all = getPages(this.props.pageContext.pages, '/articles');
        let posts_sorted = _.orderBy(posts_all, 'frontmatter.date', 'desc');
        let show_recent = _.get(section, 'show_recent', null);
        let recent_count = _.get(section, 'recent_count', null);
        let post_count = 0;
        if (_.get(section, 'subtitle', null)) {
             has_subtitle = true;
        }
        if (_.get(section, 'author', null)) {
             section_author = _.get(section, 'author', null);
        }
        if (_.get(section, 'category', null)) {
             section_category = _.get(section, 'category', null);
        }
        return (
            <React.Fragment>
                <section className={classNames('section', 'blog-feed', {'bg-gray': bg_color === 'gray', 'pt-4': padding_top === 'small', 'pt-6': (padding_top === 'medium') || (padding_top === 'large'), 'pt-md-8': padding_top === 'large', 'pb-4': padding_bottom === 'small', 'pb-6': (padding_bottom === 'medium') || (padding_bottom === 'large'), 'pb-md-8': padding_bottom === 'large'})}>
                	<div className="container">
                		{_.get(section, 'title', null) && (
                		<h2 className={classNames('section__title', 'mb-3', {'text-center': align_x === 'center'})}>{_.get(section, 'title', null)}</h2>
                		)}
                		{_.get(section, 'subtitle', null) && (
                		<div className={classNames('section__subtitle', 'mb-3', {'mt-3': _.get(section, 'title', null), 'text-center': align_x === 'center'})}>{_.get(section, 'subtitle', null)}</div>
                		)}
                		<div className={classNames('grid', {'mt-5': _.get(section, 'title', null) || _.get(section, 'subtitle', null)})}>
                			{_.map(posts_sorted, (post, post_idx) => {
                			    let is_post = false;
                			    if ((_.get(post, 'frontmatter.template', null) === 'post')) {
                			         is_post = true;
                			    }
                			    return (<React.Fragment key={post_idx + '.1'}>
                    				{(is_post && ((show_recent === false) || (post_count < recent_count))) && ((() => {
                    				     post_count = post_count + 1;
                    				    return (
                        				<BlogFeedItemFilter key={post_idx} {...this.props} blog_feed_section={section} post_page={post} section_author={section_author} section_category={section_category} />
                        				);
                    				})())}
                    			</React.Fragment>)
                			})}
                		</div>
                		{_.get(section, 'actions', null) && (
                		<div className={classNames('section__actions', 'mt-4', 'btn-group', {'justify-center': align_x === 'center'})}>
                			<SectionActions {...this.props} actions={_.get(section, 'actions', null)} />
                		</div>
                		)}
                	</div>
                </section>
            </React.Fragment>
        );
    }
}
