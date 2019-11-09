import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import WeatherBetsContract from "./contracts/WeatherBets.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  state = { bets: [], web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = WeatherBetsContract.networks[networkId];
      const instance = new web3.eth.Contract(
        WeatherBetsContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  createBet = async () => {
    const { accounts, contract } = this.state;
    await contract.methods
      .placeBet(1, true, 19, 1573329000, 2)
      .send({ from: accounts[0], value: 10000000000 });

    const response = await contract.methods.bets(1).call();
    console.log(response);
  };

  cancelBet = async () => {
    const { accounts, contract } = this.state;
    await contract.methods.cancelBet(0).send({ from: accounts[0] });

    const response = await contract.methods.bets(1).call();
    console.log(response);
  };

  takeBet = async () => {
    const { accounts, contract } = this.state;
    await contract.methods
      .acceptBet(0)
      .send({ from: accounts[0], value: 10000000000 });

    const response = await contract.methods.bets(1).call();
    console.log(response);
  };

  payoutBet = async () => {
    const { accounts, contract } = this.state;
    await contract.methods.payoutBet(0).send({ from: accounts[0] });

    const response = await contract.methods.bets(1).call();
    console.log(response);
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <button onClick={this.createBet}>Create Bet</button>
        <button onClick={this.cancelBet}>Cancel Bet</button>
        <button onClick={this.takeBet}>Take Bet</button>
        <button onClick={this.payoutBet}>Payout Bet</button>
      </div>
    );
  }
}

export default App;

cancelBet;
placeBet;
