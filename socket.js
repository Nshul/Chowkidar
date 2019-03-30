const io = require('socket.io')();
const P2PServer = require('./routes/p2pserver');

io.on('connection', (client) => {
	let state = [
		{
			name: 'Anshul',
			cart: {
				drink: 1,
				chips: 2
			},
			total: 140
		}
	];

	// ,
	// {
	// 	name: 'Parikansh',
	// 	cart: [
	// 		{
	// 			item: 'frozen-food',
	// 			qty: 1
	// 		},
	// 		{
	// 			item: 'shampoo',
	// 			qty: 2
	// 		}
	// 	],
	// 	total: 200
	// },
	// {
	// 	name: 'Sanchit',
	// 	cart: [
	// 		{
	// 			item: 'drink',
	// 			qty: 2
	// 		},
	// 		{
	// 			item: 'chips',
	// 			qty: 3
	// 		}
	// 	],
	// 	total: 140
	// },
	// {
	// 	name: 'Mittal',
	// 	cart: [
	// 		{
	// 			item: 'frozen-food',
	// 			qty: 1
	// 		},
	// 		{
	// 			item: 'shampoo',
	// 			qty: 2
	// 		}
	// 	],
	// 	total: 200
	// }
	// ];

	client.on('subscribeToTimer', (interval) => {
		console.log('client is subscribing to timer with interval ', interval);

		// let ptate = new DBstate(client);
		// p2pServer = new P2PServer(ptate);

		// p2pServer.listen();
		client.emit('timer', state);
	});

	count = 0;
});

class DBstate {
	constructor(client) {
		this.client = client;
		this.state = { users: [ { name: 'Anshul', cart: {}, total: 0 } ] };
	}

	increaseQty(obj) {
		if (this.state.users[0].cart.obj) {
			this.state.users[0].cart.obj += 1;
		} else {
			this.state.users[0].cart.obj = 1;
		}

		this.client.emit('timer', state);
	}

	decreaseQty(obj) {
		if (this.state.users[0].cart.obj) {
			this.state.users[0].cart.obj -= 1;
			if (this.state.users[0].cart.obj == 0) {
				delete this.state.users[0].cart.obj;
			}
		} else {
			this.state.users[0].cart.obj = 1;
		}

		this.client.emit('timer', state);
	}
}

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
