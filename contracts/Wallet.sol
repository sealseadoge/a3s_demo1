// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// error Wallet__NotOwner();

contract Wallet {
    address private immutable i_owner;
    string a;

    // modifier onlyOwner() {
    //     if (msg.sender != i_owner) revert Wallet__NotOwner();
    //     _;
    // }

    constructor() {
        i_owner = msg.sender;
    }

    function deposit() public payable {}

    function withdraw(address payable receiveAddress, uint256 amount)
        public
        payable
    // onlyOwner
    {
        require(msg.sender == i_owner, "msg.sender should be owner");
        require(amount <= this.getWalletBalance(), "balance is not enough");
        receiveAddress.transfer(amount);
    }

    function getSender() public view returns (address) {
        return msg.sender;
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getFlag() public view returns (bool) {
        return (msg.sender == i_owner);
    }

    // function changeOwner(address newOwner) public returns (Wallet) {
    //     require(msg.sender == i_owner);
    //     i_owner = newOwner;
    //     return this;
    // }

    function getWalletAddress() public view returns (address) {
        return address(this);
    }

    function getWalletBalance() public view returns (uint256) {
        return address(this).balance;
    }

    fallback() external payable {
        deposit();
    }

    receive() external payable {
        deposit();
    }
}
