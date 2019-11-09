pragma solidity ^0.5.8;

contract WeatherBets {
   address public owner;
   string[] public locations = ['Vancouver', 'Toronto'];
   Bet[] public bets;
   mapping (uint => address) betToAddress;

   struct Bet {
      bool taken;
      bool settled;
      address payable overAddress;
      address payable underAddress;
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

   constructor() public {
      owner = msg.sender;
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
      betToAddress[id] = msg.sender;
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
          int8 temperature = 20;
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

   function getTemperature(uint8 locationId, uint256 time) private returns (int8) {
      return 20;
   }


}
