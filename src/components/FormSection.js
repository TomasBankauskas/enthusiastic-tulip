import React from 'react';
import _ from 'lodash';

import {classNames} from '../utils';
import FormField from './FormField';

export default class FormSection extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
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
                <section className={classNames('section', 'form-section', {'bg-blue': bg_color === 'blue', 'bg-gray': bg_color === 'gray', 'pt-4': padding_top === 'small', 'pt-6': (padding_top === 'medium') || (padding_top === 'large'), 'pt-md-8': padding_top === 'large', 'pb-4': padding_bottom === 'small', 'pb-6': (padding_bottom === 'medium') || (padding_bottom === 'large'), 'pb-md-8': padding_bottom === 'large'})}>
                	<div className="container">
                		{has_text && (
                		<div className={classNames('section__body', {'text-center': align_x === 'center'})}>
                			{_.get(section, 'title', null) && (
                			<h2 className="section__title mb-3">{_.get(section, 'title', null)}</h2>
                			)}
                			{_.get(section, 'subtitle', null) && (
                			<div className={classNames('section__subtitle', 'mb-3', {'mt-3': _.get(section, 'title', null)})}>{_.get(section, 'subtitle', null)}</div>
                			)}
                		</div>
                		)}
                		<div className={classNames('section__form', {'mt-4': has_text})}>
                			<form name={_.get(section, 'form_id', null)} id={_.get(section, 'form_id', null)}{...(_.get(section, 'form_action', null) ? ({action: _.get(section, 'form_action', null)}) : null)} method="POST" data-netlify="true" data-netlify-honeypot={_.get(section, 'form_id', null) + '-bot-field'}>
                				<div className="sr-only">
                					<label id={_.get(section, 'form_id', null) + '-honeypot-label'} htmlFor={_.get(section, 'form_id', null) + '-honeypot'}>Don't fill this out if you're human:</label>
                					<input aria-labelledby={_.get(section, 'form_id', null) + '-honeypot-label'} id={_.get(section, 'form_id', null) + '-honeypot'} name={_.get(section, 'form_id', null) + '-bot-field'} />
                				</div>
                				<input aria-labelledby={_.get(section, 'form_id', null) + '-honeypot-label'} type="hidden" name="form-name" value={_.get(section, 'form_id', null)} />
                				{_.get(section, 'form_fields', null) && (
                					_.map(_.get(section, 'form_fields', null), (field, field_idx) => (
                					<div key={field_idx} className="mb-3">
                						<FormField {...this.props} field={field} />
                					</div>
                					))
                				)}
                				<div className="form__submit mt-4">
                					<button type="submit" className="btn btn--primary">{_.get(section, 'submit_label', null)}</button>
                				</div>
                			</form>
                		</div>
                	</div>
                </section>
            </React.Fragment>
        );
    }
}
