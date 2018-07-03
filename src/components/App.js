import React from 'react';
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
	componentDidMount(){
		const params = this.props.match.params;
		this.ref = base.syncState(`${params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}
	addFish = fish => {
		// 1. Take a copy of the existing state
		const fishes = { ...this.state.fishes };
		// 2. Add our new fish to the variable
		fishes[`fish${Date.now()}`] = fish;
		// 3. Set the new fishes object to state. Must be done with setState
		this.setState({ fishes });
	};
	loadSampleFishes = () => {
		this.setState({ fishes: sampleFishes });
	}

	addToOrder = (key) => {
		// 1. take a copy of state
		const order = {...this.state.order};
		// 2. add to or update the number in order
		order[key] = order[key] + 1 || 1;
		// 3. Set the order  object to state
		this.setState({ order });
	}

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
				/>
				<Inventory loadSampleFishes={this.loadSampleFishes} addFish={this.addFish} />
			</div>
		);
	}
}

export default App;