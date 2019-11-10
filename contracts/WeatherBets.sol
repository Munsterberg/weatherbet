pragma solidity ^0.4.24;

import "chainlink/contracts/ChainlinkClient.sol";

contract WeatherBets is ChainlinkClient {
   address public owner;
   string[] public locations = ['Vancouver', 'Toronto'];
   string[] private coords = ['49.2827,-123.1207', '43.6532,-79.3831'];
   Bet[] public bets;
   mapping (uint => int8) timeToTemp;
   mapping (uint => bool) timeToTempFetched;
   uint public currentEndTime;

   struct Bet {
      bool taken;
      bool settled;
      address overAddress;
      address underAddress;
      uint256 endTime;
      uint256 overAmount;
      uint256 underAmount;
      uint8 locationId;
      int8 temperature;
   }

   event NewBet(address maker, uint256 betId);
   event BetAccepted(address taker, uint256 betId);
   event BetCancelled(address maker, uint256 betId);
   event BetPayout(uint256 amount, uint256 betId);

   modifier untakenBet(uint256 betId) {
      require (betId < bets.length, 'Invalid bet id');
      require(!bets[betId].settled, 'Bet has already been settled');
      require(!bets[betId].taken, 'Bet has already been taken');
      require(bets[betId].endTime > now, 'Bet has ended, payout to claim funds');
      _;
   }

   modifier endedBet(uint256 betId) {
      require (betId < bets.length, 'Invalid bet id');
      require(bets[betId].endTime < now, 'Bet has not ended');
      require(!bets[betId].settled, 'Bet has already been settled');
      _;
   }

   modifier onlyOwner() {
     require(msg.sender == owner);
     _;
   }

   constructor() {
      owner = msg.sender;
      setChainlinkToken(0x20fE562d797A42Dcb3399062AE9546cd06f6328);
      setChainlinkOracle(0xc99B3D447826532722E41bc36e644ba3479E4365);
  }

   function() external payable {
      revert();
   }

   function placeBet(uint8 locationId, bool over, int8 temperature, uint256 endTime, uint8 odds) external payable {
      require(msg.value > 0, 'No bet amount sent');
      require(endTime > now, 'End time must be in the future');
      uint256 id;
      if (over == true) {
         id = bets.push(Bet(false, false, msg.sender, address(0), endTime, msg.value, msg.value * odds - msg.value, locationId, temperature));
      } else {
         id = bets.push(Bet(false, false, address(0), msg.sender, endTime, msg.value * odds - msg.value, msg.value, locationId, temperature));
      }
      emit NewBet(msg.sender, id);
   }

   function acceptBet(uint256 betId) external payable untakenBet(betId) {
      Bet storage bet = bets[betId];
      if (bet.overAddress == address(0)) {
         require(msg.value >= bet.overAmount);
         bet.overAddress = msg.sender;
      } else {
         require(msg.value >= bet.underAmount);
         bet.underAddress = msg.sender;
      }
      bet.taken = true;
      emit BetAccepted(msg.sender, betId);
   }

   function cancelBet(uint256 betId) external payable untakenBet(betId) returns(uint256) {
      require(bets[betId].overAddress == msg.sender || bets[betId].underAddress == msg.sender);
      Bet storage bet = bets[betId];
      if (bet.overAddress == msg.sender) {
              msg.sender.transfer(bet.overAmount);
          } else {
              msg.sender.transfer(bet.underAmount);
          }
      bet.settled = true;
      emit BetCancelled(msg.sender, betId);
   }

   function payoutBet(uint256 betId) external payable endedBet(betId) {
      require(bets[betId].overAddress == msg.sender || bets[betId].underAddress == msg.sender);
      Bet storage bet = bets[betId];
      if (!bet.taken) {
          uint256 amount;
          if (bet.overAddress == msg.sender) {
              amount = bet.overAmount;
          } else {
              amount = bet.underAmount;
          }
          bet.settled = true;
          msg.sender.transfer(amount);
          emit BetPayout(amount, betId);
      } else {
         require(timeToTempFetched[bet.endTime], 'Temperature data not yet confirmed');
          int temperature = timeToTemp[bet.endTime];
      if (temperature > bet.temperature) {
         bet.overAddress.transfer(bet.underAmount + bet.overAmount);
      } else if (temperature < bet.temperature) {
         bet.underAddress.transfer(bet.overAmount + bet.underAmount);
      } else {
         bet.overAddress.transfer(bet.overAmount);
         bet.underAddress.transfer(bet.underAmount);
      }
      bet.settled = true;
      emit BetPayout(bet.overAmount + bet.underAmount, betId);
      }
   }

   // Creates a Chainlink request with the uint256 multiplier job
  function requestTemperature(address _oracle, bytes32 _jobId, uint256 _payment, uint8 locationId)
    public
  {
     require(now > currentEndTime, 'Betting period has not ended yet');
    // newRequest takes a JobID, a callback address, and callback function as input
    Chainlink.Request memory req = buildChainlinkRequest(_jobId, this, this.fulfill.selector);
    // Adds a URL with the key "get" to the request parameters
    req.add("get", string(abi.encodePacked("https://api.darksky.net/forecast/a7af029cf133f569356fafbb04c2c438/", coords[locationId] , ",", currentEndTime)));
    // Uses input param (dot-delimited string) as the "path" in the request parameters
    req.add("path", "current.temperature");
    // Adds an integer with the key "times" to the request parameters
    //req.addInt("times", 100);
    // Sends the request with the amount of payment specified to the oracle
    sendChainlinkRequestTo(_oracle, req, _payment);
  }

  // fulfill receives a uint256 data type
  function fulfill(bytes32 _requestId, int256 _temperature)
    public
    // Use recordChainlinkFulfillment to ensure only the requesting oracle can fulfill
    recordChainlinkFulfillment(_requestId)
  {
    timeToTemp[currentEndTime] = int8(_temperature);
    timeToTempFetched[currentEndTime] = true;
    currentEndTime += 3 days;
  }

  // withdrawLink allows the owner to withdraw any extra LINK on the contract
  function withdrawLink()
    public
    onlyOwner
  {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
  }
}
