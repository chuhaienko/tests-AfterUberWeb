import React, {Component} from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
	constructor (props) {
		super(props);

		this.state = {
			addressFrom: 'вул. Хрещатик, 1, Київ, Україна',
			addressTo:   'бул. Вацлава Гавела, 6з, Київ, Україна',
			prices:      []
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.Prices = this.Prices.bind(this);
	}

	handleChange (event) {
		this.setState({
			[event.target.name]: event.target.value
		});

		console.log(this.state)
	}

	async handleSubmit (event) {
		event.preventDefault();

		let resp = await axios.get(`http://localhost:8080/prices?addressFrom=${this.state.addressFrom}&addressTo=${this.state.addressTo}`, {crossdomain: true});

		this.setState({prices: resp.data});
	}

	Prices (props) {
		return props.prices.map((it, i) => {
			return (
				<p key={i}>{it.name}: {it.priceFrom} {it.currency} - {it.priceTo} {it.currency}</p>
			);
		});
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1>AfterUber</h1>
					<form onSubmit={this.handleSubmit}>
						<input type="text" name="addressFrom" value={this.state.addressFrom} onChange={this.handleChange} placeholder="Ride from"/><br/>
						<input type="text" name="addressTo" value={this.state.addressTo} onChange={this.handleChange} placeholder="Ride to"/><br/>
						<button type="submit">Get prices</button>
					</form>
					<div>
						<this.Prices prices={this.state.prices} />
					</div>
				</header>
			</div>
		);
	}
}

export default App;
