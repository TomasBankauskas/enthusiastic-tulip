import React from 'react';
import _ from 'lodash';

import {classNames} from '../utils';

export default class MailchimpNewsletterSection extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let section_index = _.get(this.props, 'section_index', null);
        let padding_top = _.get(section, 'padding_top', null) || 'medium';
        let padding_bottom = _.get(section, 'padding_bottom', null) || 'medium';
        let align_x = _.get(section, 'align', null) || 'left';
        let bg_color = _.get(section, 'background_color', null) || 'none';
        let has_text = false;
        if ((_.get(section, 'title', null) || _.get(section, 'subtitle', null))) {
             has_text = true;
        }
        return (
            <React.Fragment>
                <section className={classNames('section', 'newsletter-section', {'bg-blue': bg_color === 'blue', 'bg-gray': bg_color === 'gray', 'pt-4': padding_top === 'small', 'pt-6': (padding_top === 'medium') || (padding_top === 'large'), 'pt-md-8': padding_top === 'large', 'pb-4': padding_bottom === 'small', 'pb-6': (padding_bottom === 'medium') || (padding_bottom === 'large'), 'pb-md-8': padding_bottom === 'large'})}>
                	<div className="container">
                		<div className="grid items-center justify-center">
                			{has_text && (
                			<div className={classNames('section__body', 'cell-12', 'cell-md-6', {'text-center': align_x === 'center'})}>
                				{_.get(section, 'title', null) && (
                				<h2 className="section__title mb-3">{_.get(section, 'title', null)}</h2>
                				)}
                				{_.get(section, 'subtitle', null) && (
                				<div className={classNames('section__subtitle', 'mb-3', {'mt-3': _.get(section, 'title', null)})}>{_.get(section, 'subtitle', null)}</div>
                				)}
                			</div>
                			)}
                			<div className={classNames('section__form', 'cell-12', 'cell-md-6', 'mt-md-0', {'mt-3': has_text})}>
                				<form className="mc-form" name={_.get(section, 'form_id', null)} id={_.get(section, 'form_id', null)} action={_.get(section, 'form_action', null)} method="POST">
                					<div className="flex flex-column flex-lg-row flex-lg-wrap">
                						<label id={'email-' + section_index + '-label'} className="email-field flex-auto">
                							<span className="sr-only">{_.get(section, 'email_label', null)}</span>
                							<input type="email" id={'EMAIL-' + section_index} name="EMAIL" placeholder={_.get(section, 'email_placeholder', null)} required />
                						</label>
                						{_.get(section, 'confirmation_label', null) && (
                						<label id={'checkbox-' + section_index + '-label'} className="checkbox-field flex items-center mt-3">
                							<input className="checkbox-input" type="checkbox" id={'checkbox-' + section_index} name={'checkbox-' + section_index} required/>
                							<div className="checkbox-custom-input" />
                							<span className="checkbox-label">{_.get(section, 'confirmation_label', null)}</span>
                						</label>
                						)}
                						<div className="mc-form__submit mt-3 mt-lg-0 ml-lg-3">
                							<button type="submit" className="btn btn--primary">{_.get(section, 'submit_label', null)}</button>
                						</div>
                					</div>
                				</form>
                			</div>
                		</div>
                	</div>
                </section>
            </React.Fragment>
        );
    }
}
