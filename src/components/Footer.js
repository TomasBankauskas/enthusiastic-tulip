import React from 'react';
import _ from 'lodash';

import {classNames, withPrefix, htmlToReact} from '../utils';
import Action from './Action';
import ActionLink from './ActionLink';

export default class Footer extends React.Component {
    render() {
        return (
            <footer className={classNames('site-footer', 'bg-blue', 'pt-8', 'pb-6', {'bg-text': _.get(this.props, 'pageContext.site.siteMetadata.footer.title', null)})}>
            	<div className="container">
            		{_.get(this.props, 'pageContext.site.siteMetadata.footer.title', null) && (
            		<div className="site-footer__text flex justify-center items-center text-center">{_.get(this.props, 'pageContext.site.siteMetadata.footer.title', null)}</div>
            		)}
            		{(_.get(this.props, 'pageContext.site.siteMetadata.footer.has_social', null) && _.get(this.props, 'pageContext.site.siteMetadata.footer.social_links', null)) && (
            		<div className="site-footer__social mt-4 mb-5">
            			<ul className="menu flex items-center justify-center flex-wrap">
            			{_.map(_.get(this.props, 'pageContext.site.siteMetadata.footer.social_links', null), (action, action_idx) => (
            				<li key={action_idx} className="menu__item mb-3 mx-3">
            					<Action {...this.props} action={action} />
            				</li>
            			))}
            			</ul>
            		</div>
            		)}
            		{_.get(this.props, 'pageContext.site.siteMetadata.footer.logo', null) && (
            		<div className="site-footer__logo text-center mt-4 mb-6">
            			<img src={withPrefix(_.get(this.props, 'pageContext.site.siteMetadata.footer.logo', null))} alt={_.get(this.props, 'pageContext.site.siteMetadata.footer.logo_alt', null)} />
            		</div>
            		)}
            		{(_.get(this.props, 'pageContext.site.siteMetadata.footer.has_nav', null) && _.get(this.props, 'pageContext.site.siteMetadata.footer.nav_links', null)) && (
            		<div className="site-footer__nav mt-4 mb-5">
            			<ul className="menu flex items-center justify-center flex-wrap">
            			{_.map(_.get(this.props, 'pageContext.site.siteMetadata.footer.nav_links', null), (action, action_idx) => (
            				<li key={action_idx} className="menu__item mb-3 mx-3">
            					<Action {...this.props} action={action} />
            				</li>
            			))}
            			</ul>
            		</div>
            		)}
            		{(_.get(this.props, 'pageContext.site.siteMetadata.footer.content', null) || _.get(this.props, 'pageContext.site.siteMetadata.footer.links', null)) && (
            		<div className="site-footer__info text-center mt-4 mb-6">
            			{htmlToReact(_.get(this.props, 'pageContext.site.siteMetadata.footer.content', null))}
            			&nbsp;
            			{_.map(_.get(this.props, 'pageContext.site.siteMetadata.footer.links', null), (action, action_idx) => (
            				<ActionLink key={action_idx} {...this.props} action={action} />
            			))}
            		</div>
            		)}
            	</div>
            </footer>
        );
    }
}
