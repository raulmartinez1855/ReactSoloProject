import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
	state = {
		fishes: {},
		order: {}
	};

	static propTypes = {
		match: PropTypes.object
	}
	componentDidMount(){
		const params = this.props.match.params;
		// first reinstate our local storage
		const localStorageRef = localStorage.getItem(params.storeId);
		if(localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) })
		}
		this.ref = base.syncState(`${params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});
	};

	componentDidUpdate() {
		const localParams = this.props.match.params.storeId;
		const jsonOrder = JSON.stringify(this.state.order);
		localStorage.setItem(localParams, jsonOrder);
	};

	componentWillUnmount() {
		base.removeBinding(this.ref);
	};

	addFish = fish => {
		// 1. Take a copy of the existing state
		const fishes = { ...this.state.fishes };
		// 2. Add our new fish to the variable
		fishes[`fish${Date.now()}`] = fish;
		// 3. Set the new fishes object to state. Must be done with setState
		this.setState({ fishes });
	};

	updateFish = (key, updatedFish) => {
		// 1. Take a copy of the current state
		const fishes = { ...this.state.fishes };
		// 2. Update the state
		fishes[key] = updatedFish;
		// 3. set that to state
		this.setState({ fishes })
	};


	deleteFish = (key) => {
		// 1. Take a copy of the current state
			const fishes = { ...this.state.fishes }
		// 2. Update the state (by removing one)
			fishes[key] = null;
		// 3. Set the state
		this.setState({ fishes })
	};


	loadSampleFishes = () => {
		this.setState({ fishes: sampleFishes });
	};

	addToOrder = (key) => {
		// 1. take a copy of state
		const order = {...this.state.order};
		// 2. add to or update the number in order
		order[key] = order[key] + 1 || 1;
		// 3. Set the order  object to state
		this.setState({ order });
	};

	removeFromOrder = (key) => {
		// 1. take a copy of the state
		const order = { ...this.state.order }
		// 2. update the copy of the current state
		delete order[key];
		// 3. set the state with the new object
		this.setState({ order });
	};

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="fishes">
						{Object.keys(this.state.fishes).map(key =>
							<Fish
								key={key}
								index={key}
								details={this.state.fishes[key]}
								addToOrder={this.addToOrder}
							/>
						)}
					</ul>
				</div>
				<Order
					fishes={this.state.fishes}
					order={this.state.order}
					removeFromOrder={this.removeFromOrder}
				/>
				<Inventory
					loadSampleFishes={this.loadSampleFishes}
					addFish={this.addFish}
					updateFish={this.updateFish}
					deleteFish={this.deleteFish}
					fishes={this.state.fishes}
					storeId={this.props.match.params.storeId}
				/>
			</div>
		);
	}
}

export default App;