// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Wallet.sol";

contract A3S is ERC721 {
    uint256 private s_tokenCounter;
    mapping(uint256 => Wallet) private tokenIdToWallet;

    constructor() ERC721("A3S_decentralized_wallet", "A3S") {
        s_tokenCounter = 0;
    }

    function mintNft() public returns (uint256) {
        Wallet wallet = new Wallet();
        _safeMint(msg.sender, s_tokenCounter);
        tokenIdToWallet[s_tokenCounter] = wallet;
        s_tokenCounter = s_tokenCounter + 1;
        return s_tokenCounter;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "tokenId : ";
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }

    function getWalletAddressByTokenId(uint256 tokenId)
        public
        view
        returns (address)
    {
        return address(tokenIdToWallet[tokenId]);
    }

    function getWalletBalanceByTokenId(uint256 tokenId)
        public
        view
        returns (uint256)
    {
        return tokenIdToWallet[tokenId].getWalletBalance();
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: caller is not token owner or approved"
        );
        // Wallet wallet = tokenIdToWallet[tokenId];
        // Wallet newWallet = wallet.changeOwner(to);
        // tokenIdToWallet[tokenId] = newWallet;
        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public virtual override {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: caller is not token owner or approved"
        );
        // Wallet wallet = tokenIdToWallet[tokenId];
        // wallet.changeOwner(to);
        _safeTransfer(from, to, tokenId, data);
    }

    function withdraw(
        uint256 tokenId,
        address payable to,
        uint256 amount
    ) public payable {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: caller is not token owner or approved"
        );
        Wallet wallet = tokenIdToWallet[tokenId];
        wallet.withdraw(to, amount);
    }

    function getMessageSender() public view returns (address) {
        return msg.sender;
    }

    function getIowner(uint256 tokenId) public view returns (address) {
        Wallet wallet = tokenIdToWallet[tokenId];
        return wallet.getOwner();
    }

    function getSender(uint256 tokenId) public view returns (address) {
        Wallet wallet = tokenIdToWallet[tokenId];
        return wallet.getSender();
    }

    function getFlag(uint256 tokenId) public view returns (bool) {
        Wallet wallet = tokenIdToWallet[tokenId];
        return wallet.getFlag();
    }
}
