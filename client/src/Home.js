import React, { Component } from 'react';
import { subscribeToTimer } from './api';
import './App';

class Home extends Component {
	constructor(props) {
		super(props);

		subscribeToTimer((err, users) => {
			console.log(users);
			this.setState({
				users
			});
		});
	}

	state = {
		users: []
	};

	renderCartItemsOfUser(items) {
		let Items = [];

		for (var i in items) {
			Items.push({
				item: i,
				qty: items[i]
			});
		}

		return Items.map((item, i) => {
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
		console.log(this.state);
		return this.state.users.map((user, i) => {
			return (
				<div className="card">
					<div className="card-top">
						<div className="card-head">
							<div>
								<img className="card-top-icon" src="/image/man.png" />
							</div>
							<div className="card-head-text">{user.name}</div>
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
		return <div className="contain">{this.renderCards()}</div>;
	}
}

export default Home;
