const io = require('socket.io')();
const P2PServer = require('./routes/p2pserver');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://user:password123@ds137596.mlab.com:37596/chowkidaar');

var rejected = new mongoose.Schema({
	name: String
});

var Rejected = mongoose.model('Rejected', rejected);

// Rejected.deleteMany({}).then((items) => {
// 	console.log(items);
// });

io.on('connection', (client) => {
	let state = {
		users: [
			{
				name: 'Sanchit Aggarwal',
				cart: {},
				total: 0
			}
		],
		rejectedItems: []
	};

	client.on('subscribeToTimer', (interval) => {
		console.log('client is subscribing to timer with interval ', interval);

		let ptate = new DBstate(client);
		p2pServer = new P2PServer(ptate);

		p2pServer.listen();
		client.emit('timer', state);
	});

	count = 0;
});

class DBstate {
	constructor(client) {
		this.client = client;
		this.state = {
			users: [ { name: 'Anshul', cart: {}, total: 0 } ],
			usermapping: {
				Anshul: 0
			},
			rejectedItems: [],
			emotion: ''
		};

		Rejected.deleteMany({}).then((items) => {
			console.log(items);
		});
	}

	increaseQty(obj) {
		console.log('INCREASE QTY');

		if (this.state.users[0].cart[obj]) {
			this.state.users[0].cart[obj] += 1;
		} else {
			this.state.users[0].cart[obj] = 1;
		}

		this.state.users[0].total += 100;

		Rejected.find({}).then((items) => {
			this.state.rejectedItems = items;
			console.log(this.state);
			this.client.emit('timer', this.state);
		});
	}

	emotion(obj) {
		this.state.emotion = obj;
		this.client.emit('timer', this.state);
	}

	decreaseQty(obj) {
		console.log(`DECREASE QTY ${obj}`);

		if (this.state.users[0].cart[obj]) {
			this.state.users[0].cart[obj] -= 1;

			if (this.state.users[0].cart[obj] == 0) {
				delete this.state.users[0].cart[obj];
			}

			this.state.users[0].total -= 100;

			Rejected.find({
				name: obj
			})
				.then((data) => {
					if (data.length == 0) {
						Rejected.create({ name: obj })
							.then((newdata) => {
								console.log(newdata);

								Rejected.find({}).then((items) => {
									this.state.rejectedItems = items;
									console.log(this.state);
									this.client.emit('timer', this.state);
								});
							})
							.catch((err) => {
								console.log(err);
							});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}

	entryPoint(obj) {
		if (!this.state.usermapping[obj]) {
			this.state.usermapping[obj] = this.state.users.length;
			this.state.users.push({
				name: obj,
				cart: {},
				total: 0
			});
		}
	}

	exitPoint(obj) {
		// Rejected.deleteMany({}).then((items) => {
		// 	console.log(items);
		// });
	}
}

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
