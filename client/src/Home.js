import React, { Component } from 'react';
import { subscribeToTimer } from './api';
import './App';

class Home extends Component {
	constructor(props) {
		super(props);

		subscribeToTimer((err, users) =>
			this.setState({
				users
			})
		);
	}

	state = {
		users: [
			{
				name: 'Anshul',
				cart: [
					{
						item: 'drink',
						qty: 2
					},
					{
						item: 'chips',
						qty: 3
					}
				],
				total: 140
			},
			{
				name: 'Parikansh',
				cart: [
					{
						item: 'drink',
						qty: 2
					},
					{
						item: 'chips',
						qty: 3
					}
				],
				total: 200
			}
		]
	};

	renderCartItemsOfUser(items) {
		return items.map((item, i) => {
			return (
				<div className="card-item">
					<div className="card-item-name">
						<a className="card-icon" uk-icon="cart" />
						<div>{item.item}</div>
					</div>

					<div>Quantity: {item.qty}</div>
				</div>
			);
		});
	}

	renderCards() {
		return this.state.users.map((user, i) => {
			return (
				// <div>
				// 	<br />
				// 	<div className="uk-card uk-card-default uk-width-1-2@m">
				// 		<div className="uk-card-header">
				// 			<div className="uk-grid-small uk-flex-middle" uk-grid>
				// 				<div className="uk-width-auto" />
				// 				<div className="uk-width-expand">
				// 					<h3 className="uk-card-title uk-margin-remove-bottom">{user.name}</h3>
				// 				</div>
				// 			</div>
				// 		</div>
				// 		<div className="uk-card-body">
				// 			<dl class="uk-description-list uk-description-list-divider">{this.renderCartItemsOfUser(user.cart)}</dl>
				// 		</div>
				// 		<div className="uk-card-body">
				// 			<dl class="uk-description-list uk-description-list-divider">{this.renderCartItemsOfUser(user.cart)}</dl>
				// 		</div>
				// 		<div className="uk-card-footer">Total: {user.total}</div>
				// 	</div>
				// </div>
				<div className="card">
					<div className="card-top">
						<div className="card-head">
							<a className="card-top-icon" uk-icon="user" />
							{user.name}
						</div>
					</div>
					<div>{this.renderCartItemsOfUser(user.cart)}</div>
					<div className="card-item card-footer">
						<div className="card-item-name">
							<a className="card-icon" uk-icon="database" />
							<div>Total Amount</div>
						</div>

						<div>{user.total}</div>
					</div>
				</div>
			);
		});
	}

	render() {
		return <div>{this.renderCards()}</div>;
	}
}

export default Home;
