import React from 'react';
import _ from 'lodash';

import {Link, withPrefix, classNames} from '../utils';
import Action from './Action';
import Icon from './Icon';
import HeaderMenu from './HeaderMenu';

export default class Header extends React.Component {
    render() {
        return (
            <header className="site-header py-3">
            	<div className="container">
            		<nav className="navbar flex items-center justify-between" aria-label="Main Navigation">
            			<Link className="sr-only" to="#content">Skip to main content</Link>
            			{(_.get(this.props, 'pageContext.site.siteMetadata.header.has_left_nav', null) && _.get(this.props, 'pageContext.site.siteMetadata.header.left_nav_links', null)) && (
            			<div className="navbar__left">
            				<ul className="menu flex flex-wrap items-center">
            				{_.map(_.get(this.props, 'pageContext.site.siteMetadata.header.left_nav_links', null), (action, action_idx) => (
            					<li key={action_idx} className="menu__item my-2 mr-3">
            						<Action {...this.props} action={action} />
            					</li>
            				))}
            				</ul>
            			</div>
            			)}
            			<div className="navbar__branding">
            				<Link to={withPrefix('/')}>
            					{_.get(this.props, 'pageContext.site.siteMetadata.header.logo', null) ? (
            					<img className="navbar__logo" src={withPrefix(_.get(this.props, 'pageContext.site.siteMetadata.header.logo', null))} alt={_.get(this.props, 'pageContext.site.siteMetadata.header.logo_alt', null)} />
            					) : 
            					<div className="navbar__title h1 m-0">{_.get(this.props, 'pageContext.site.siteMetadata.header.title', null)}</div>
            					}
            					{_.get(this.props, 'pageContext.site.siteMetadata.header.subtitle', null) && (
            					<div className="navbar__subtitle">{_.get(this.props, 'pageContext.site.siteMetadata.header.subtitle', null)}</div>
            					)}
            				</Link>
            			</div>
            			{(_.get(this.props, 'pageContext.site.siteMetadata.header.has_hidden_nav', null) && _.get(this.props, 'pageContext.site.siteMetadata.header.hidden_nav_link_groups', null)) && (<React.Fragment>
            			<div className="navbar__actions text-right">
            				<button aria-label="Menu" className="btn btn--clear navbar__menu-btn js-nav-toggle my-2 ml-3">Menu</button>
            			</div>
            			<div className="navbar__right">
            				<div className="navbar__scroller">
            					<div className="navbar__inner p-4 p-xs-6">
            						<button aria-label="Close" className="btn btn--icon btn--clear navbar__close-btn js-nav-toggle">
            							<span className="sr-only">Close</span>
            							<Icon {...this.props} icon={'close'} />
            						</button>
            						<div className="navbar__menu">
            							{_.map(_.get(this.props, 'pageContext.site.siteMetadata.header.hidden_nav_link_groups', null), (nav_group, nav_group_idx) => {
            							    let font_size = _.get(nav_group, 'font_size', null) || 'regular';
            							    let divider = _.get(nav_group, 'divider', null) || 'none';
            							    return (<React.Fragment key={nav_group_idx + '.2'}>
                								<HeaderMenu key={nav_group_idx} {...this.props} header_menu={_.get(nav_group, 'nav_links', null)} font_size={font_size} />
                								{(divider !== 'none') && (
                								<div key={nav_group_idx + '.1'} className={classNames('navbar__sep', 'mb-4', {'navbar__sep--thick': divider === 'thick', 'mt-6': divider === 'thick', 'mt-4': divider === 'thin'})}/>
                								)}
                							</React.Fragment>)
            							})}
            						</div>
            					</div>
            				</div>
            			</div>
            			</React.Fragment>)}
            		</nav>
            	</div>
            </header>
        );
    }
}
