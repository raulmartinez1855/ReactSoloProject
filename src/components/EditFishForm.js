import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
	static propTypes = {
		updatedFish: PropTypes.func,
		fish: PropTypes.shape({
			image: PropTypes.string,
			name: PropTypes.string,
			desc: PropTypes.string,
			status: PropTypes.string,
			price: PropTypes.number,
		}),
		index: PropTypes.string,
	}
	handleChange = (event) => {
		console.log(event.currentTarget.value);
		// update that fish
		// 1. Take a copy of the current fish
		const updatedFish = {
			...this.props.fish,
			[event.currentTarget.name]: event.currentTarget.value
		 };
		this.props.updateFish(this.props.index, updatedFish)
	}
	render() {
		return (
			<div className="fish-edit">
				<input
					name="name"
					type="text"
					onChange={this.handleChange}
					value={this.props.fish.name}
				/>
				<input
					name="price"
					type="text"
					onChange={this.handleChange}
					value={this.props.fish.price}
				/>
				<select
					name="status"
					type="text"
					onChange={this.handleChange}
					value={this.props.fish.status}
				>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea
					name="desc"
					type="text"
					onChange={this.handleChange}
					value={this.props.fish.desc}
				/>
				<input
					name="image"
					type="text"
					onChange={this.handleChange}
					value={this.props.fish.image}
				/>
				<button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
			</div>
		)
	}
}

export default EditFishForm;