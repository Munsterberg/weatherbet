import React, {Component} from 'react';
import {Grid, Input, Button} from 'semantic-ui-react';
import WeatherBetsContract from '../contracts/WeatherBets.json';
import getWeb3 from '../utils/getWeb3';
import BetTable from '../components/BetTable';

class Dashboard extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    locations: [],
  };

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
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({web3, accounts, contract: instance}, this.fetchData);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  fetchData = () => {
    // const {contract} = this.state;
    // const locations = contract.methods.locations.call();
    // this.setState({locations});
  };

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  submit = e => {
    e.preventDefault();
    const {contract, address} = this.state;
    if (e.target.name === 'over') {
      // contract.methods.placeBet.call(locationId, true, temp, timestamp, odds);
    }
    // contract.methods.placeBet.call(locationId, false, temp, timestamp, odds);
  };

  // runExample = async () => {
  //   const { accounts, contract } = this.state;
  //
  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });
  //
  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();
  //
  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
        <h2>Over/Under</h2>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <BetTable />
              <form onSubmit={this.submit} name="over">
                <Input
                  onChange={this.handleChange}
                  placeholder="Bet Amount ($)"
                  name="over"
                />
                <Button type="submit">Bet Over</Button>
              </form>
            </Grid.Column>

            <Grid.Column>
              <BetTable />
              <form onSubmit={this.submit} name="under">
                <Input
                  onChange={this.handleChange}
                  placeholder="Bet Amount ($)"
                  name="under"
                />
                <Button type="submit">Bet Under</Button>
              </form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
