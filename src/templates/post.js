import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import {graphql} from 'gatsby';

import components, {Layout} from '../components/index';
import {classNames, withPrefix, Link, htmlToReact} from '../utils';
import BlogPostCategory from '../components/BlogPostCategory';
import Icon from '../components/Icon';

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`;

export default class Post extends React.Component {
    render() {
        let has_image = false;
        let image_pos = _.get(this.props, 'pageContext.frontmatter.image_position', null) || 'top';
        if (_.get(this.props, 'pageContext.frontmatter.image', null)) {
             has_image = true;
        }
        return (
            <Layout {...this.props}>
            <article className="post pt-4 pb-6">
            	<div className={classNames('post__hero', 'container', {'container--medium': (image_pos === 'top') || (has_image === false)})}>
            		<div className={classNames('mb-6', {'grid': image_pos !== 'top'})}>
            			{has_image && (
            			<div className={classNames('post__image', 'mb-4', 'mb-sm-6', {'mb-lg-0': image_pos !== 'top', 'cell-12': image_pos !== 'top', 'cell-md-6': image_pos !== 'top'})}>
            				<img src={withPrefix(_.get(this.props, 'pageContext.frontmatter.image', null))} alt={_.get(this.props, 'pageContext.frontmatter.image_alt', null)} />
            			</div>
            			)}
            			<header className={classNames('post__header', 'text-center', {'cell-12': image_pos !== 'top', 'cell-md-6': image_pos !== 'top', 'order-md-first': has_image && (image_pos === 'right'), 'mt-md-7': has_image && (image_pos !== 'top')})}>
            				{_.get(this.props, 'pageContext.frontmatter.category', null) && (
            				<div className="post__cat mb-3">
            					<BlogPostCategory {...this.props} category={_.get(this.props, 'pageContext.frontmatter.category', null)} />
            				</div>
            				)}
            				<h1 className="post__title mt-0">{_.get(this.props, 'pageContext.frontmatter.title', null)}</h1>
            				{_.get(this.props, 'pageContext.frontmatter.excerpt', null) && (
            				<div className="post__subtitle">{_.get(this.props, 'pageContext.frontmatter.excerpt', null)}</div>
            				)}
            				{_.get(this.props, 'pageContext.site.siteMetadata.domain', null) && ((() => {
            				    let domain = _.trim(_.get(this.props, 'pageContext.site.siteMetadata.domain', null), '/');
            				    let page_rel_url = withPrefix(_.get(this.props, 'pageContext.url', null));
            				    let page_abs_url = domain + page_rel_url;
            				    return (
                				<div className="post__share flex justify-center mt-4">
                					<Link className="btn btn--icon btn--primary mb-3 mx-2" target="_blank" to={'https://www.linkedin.com/shareArticle?mini=true&url=' + page_abs_url} rel="noopener">
                						<span className="sr-only">LinkedIn</span>
                						<Icon {...this.props} icon={'linkedin'} />
                					</Link>
                					<Link className="btn btn--icon btn--primary mb-3 mx-2" target="_blank" to={'https://www.facebook.com/sharer/sharer.php?u=' + page_abs_url} rel="noopener">
                						<span className="sr-only">Facebook</span>
                						<Icon {...this.props} icon={'facebook'} />
                					</Link>
                					<Link className="btn btn--icon btn--primary mb-3 mx-2" target="_blank" to={'https://twitter.com/intent/tweet?url=' + page_abs_url} rel="noopener">
                						<span className="sr-only">Twitter</span>
                						<Icon {...this.props} icon={'twitter'} />
                					</Link>
                				</div>
                				);
            				})())}
            			</header>
            		</div>
            	</div>
            	<div className="container container--medium">
            		<div className="post__meta flex-lg mb-4">
            			{_.get(this.props, 'pageContext.frontmatter.author', null) && ((() => {
            			    let author_data = _.get(this.props, 'pageContext.frontmatter.author', null);
            			    return (
                				<div className="mr-1">Von {author_data.link ? (<Link to={withPrefix(author_data.link)}>{author_data.first_name} {author_data.last_name}</Link>) : <span>{author_data.first_name} {author_data.last_name}</span>},</div>
                			);
            			})())}
            			<div className="mr-1">veröffentlicht am <time dateTime={moment(_.get(this.props, 'pageContext.frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(this.props, 'pageContext.frontmatter.date', null)).strftime('%d.%m.%Y')}</time>.</div>
            			{_.get(this.props, 'pageContext.frontmatter.credits', null) && (
            			<div className="mr-1">{_.get(this.props, 'pageContext.frontmatter.credits', null)}</div>
            			)}
            		</div>
            		<div className="post__body text-block">
            			{htmlToReact(_.get(this.props, 'pageContext.html', null))}
            		</div>
            	</div>
            </article>
            {_.map(_.get(this.props, 'pageContext.frontmatter.sections', null), (section, section_idx) => {
                let component = _.upperFirst(_.camelCase(_.get(section, 'type', null)));
                let Component = components[component];
                return (
                	<Component key={section_idx} {...this.props} section={section} site={this.props.pageContext.site} section_index={section_idx + 1} page={this.props.pageContext} />
                )
            })}
            </Layout>
        );
    }
}
