//SPDX-License-Identifier: Unlicense

import "hardhat/console.sol";

pragma solidity 0.8.9;

contract Deposit  {
    address public owner;
    uint256 public contractBalance; 
    mapping(address=> uint256) public investings;
    
    constructor () payable {
        owner = msg.sender;
        contractBalance += msg.value;
    }

    function invest() public payable {
        investings[msg.sender] = msg.value;
        contractBalance += msg.value;
    }

    function interestRate(uint amount) public pure returns(uint) {
        return amount * 110 / 100;
    }

    function withdraw() public payable{
        require(investings[msg.sender] > 0, "Deposit: No invest");
        uint256 amount = interestRate(investings[msg.sender]);
        investings[msg.sender] = 0;
        contractBalance -= amount;
        payable(msg.sender).transfer(amount);
    }
}
