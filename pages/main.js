import React, { Component } from 'react';
import Link from 'next/link';

class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="uk-card uk-card-default uk-width-1-2@m">
				<div className="uk-card-header">
					<div className="uk-grid-small uk-flex-middle" uk-grid>
						<div className="uk-width-auto">Head</div>
						<div className="uk-width-expand">
							<h3 className="uk-card-title uk-margin-remove-bottom">Title</h3>
							<p className="uk-text-meta uk-margin-remove-top">
								<time datetime="2016-04-01T19:00">April 01, 2016</time>
							</p>
						</div>
					</div>
				</div>
				<div className="uk-card-body">
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
				</div>
				<div className="uk-card-footer">
					<Link href="/about">
						<a className="uk-button uk-button-text">About Page</a>
					</Link>
				</div>
			</div>
		);
	}
}

export default Main;
