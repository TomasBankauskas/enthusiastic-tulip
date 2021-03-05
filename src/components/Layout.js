import React from 'react';
import {Helmet} from 'react-helmet';
import _ from 'lodash';

import '../sass/main.scss';
import Header from './Header';
import Footer from './Footer';

export default class Body extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{_.get(this.props, 'pageContext.frontmatter.title', null) && (_.get(this.props, 'pageContext.frontmatter.title', null) + ' | ')}{_.get(this.props, 'pageContext.site.siteMetadata.title', null)}</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initialScale=1.0" />
                    <meta name="google" content="notranslate" />
                    <meta name="description" content="" />
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,700;1,700&family=Nunito:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
                    <body className={_.get(this.props, 'pageContext.frontmatter.template', null) + '-template'} />
                </Helmet>
                <div id="site-wrap" className="site">
                	<Header {...this.props} />
                	<main id="content" className="site-content">
                		{this.props.children}
                	</main>
                	<Footer {...this.props} />
                </div>
                {(_.get(this.props, 'pageContext.site.siteMetadata.header.has_hidden_nav', null) && _.get(this.props, 'pageContext.site.siteMetadata.header.hidden_nav_link_groups', null)) && (
                <div className="nav-overlay js-nav-toggle" />
                )}
            </React.Fragment>
        );
    }
}
