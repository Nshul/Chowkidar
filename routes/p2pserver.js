const Websocket = require('ws');
const P2P_PORT = process.env.P2P_PORT || 8002;

const peers = process.env.PEER ? process.env.PEER : [];

const MESSAGE_TYPES = {
	entry: 'ENTRY',
	exit: 'EXIT',
	objectPick: 'OBJECTPICK',
	objectDrop: 'OBJECTDROP'
};

let alreadyPresent = [];

class P2PServer {
	constructor(state) {
		this.sockets = [];
		this.state = state;
	}

	listen() {
		const server = new Websocket.Server({ port: P2P_PORT });
		server.on('connection', (socket) => this.connectSocket(socket));

		this.connectToPeers();

		console.log(`Listening for Peer-to-peer connections on: ${P2P_PORT}`);
	}

	connectToPeers() {
		peers.forEach((peer) => {
			//  ws://localhost:5001
			const socket = new Websocket(peer);

			socket.on('open', () => this.connectSocket(socket));
		});
	}

	connectSocket(socket) {
		this.sockets.push(socket);
		console.log('Socket connected');

		this.messageHandler(socket);
		this.sendChain(socket);
	}

	messageHandler(socket) {
		socket.on('message', (message) => {
			const data = JSON.parse(message);

			switch (data.type) {
				case MESSAGE_TYPES.objectPick:
					this.state.increaseQty(data.data);
					break;
				case MESSAGE_TYPES.objectDrop:
					this.state.decreaseQty(data.data);
					break;

				default:
					console.log('Default reached for switch case in messageHandler at p2pServer');
			}
		});
	}
}

module.exports = P2PServer;
