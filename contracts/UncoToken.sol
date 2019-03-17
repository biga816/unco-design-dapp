pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/payment/PullPayment.sol";

contract UncoToken is ERC721Full {
  // Mapping from token ID to miner
  mapping (uint256 => address) internal tokenMiner;

  // Mapping from tokenURI to tokenId
  mapping (string => uint256) internal tokenUriToTokenId;

  // Mapping from tokenURI to status for eaech owner
  mapping(address => mapping (string => bool)) private registrationStatus;

  constructor() ERC721Full("UncoToken", "UNC") public {
  }

  /**
   * @dev Mint a new token & set the token URI for a given token
   * Reverts if the token ID does not exist
   * @param _uri string URI to assign
   */
  function mint(string memory _uri) public {
    require(!isExistTokenUri(_uri), "exists uri");

    uint256 tokenId = super.totalSupply();
    tokenMiner[tokenId] = msg.sender;
    tokenUriToTokenId[_uri] = tokenId;
    registrationStatus[msg.sender][_uri] = true;

    super._mint(msg.sender, tokenId);
    super._setTokenURI(tokenId, _uri);
  }

  /**
   * @dev Gets the owner of the specified token ID
   * @param _tokenId uint256 ID of the token to query the owner of
   * @return miner address currently marked as the owner of the given token ID
   */
  function minerOf(uint256 _tokenId) public view returns (address) {
    address owner = tokenMiner[_tokenId];
    require(owner != address(0), "invalid tokenId");
    return owner;
  }

  /**
   * @dev Get the token ID of the token uri
   * @param _uri string URI to assign
   */
  function tokenIdOf(string memory _uri) public view returns (uint256) {
    require(isExistTokenUri(_uri), "invalid uri");
    return tokenUriToTokenId[_uri];
  }

  /**
   * @dev Returns whether the given uri is exist
   * @param _uri string URI to assign
   */
  function isExistTokenUri(string memory _uri) public view returns (bool){
    return registrationStatus[msg.sender][_uri];
  }
}
