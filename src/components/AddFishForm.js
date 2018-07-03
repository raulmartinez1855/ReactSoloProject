import React from 'react';

class AddFishForm extends React.Component {
	nameRef = React.createRef();
	priceRef = React.createRef();
	descRef = React.createRef();
	imageRef = React.createRef();
	createFish = (e) => {
		// 1. stop form from submitting
		e.preventDefault();
		const fish = {
			name: this.nameRef.value.value,
			price: this.priceRef.value.value,
			desc: this.descRef.value.value,
			image: this.imageRef.value.value
		}
		this.props.addFish(fish);
		// 2. Refresh the form
		e.currentTarget.reset();
	}
	render() {
		return (
			<form className="fish-edit" onSubmit={this.createFish}>
				<input name="name" ref={this.nameRef} type="text" placeholder="Name"/>
				<input name="price" ref={this.priceRef} type="text" placeholder="Price"/>
				<select name="status">
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea name="desc" ref={this.descRef} type="text" placeholder="Desc"/>
				<input name="image" ref={this.imageRef} type="text" placeholder="Image"/>
				<button type="Submit">+ Add Fish</button>
			</form>
		);
	}
}

export default AddFishForm;