// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

/**
 * @title BaseTokenStoreAd
 * @dev ERC-721A token that allows users to mint tokens with specified tokenIds if not already minted.
 * Also implements ERC-2981 for royalty enforcement.
 */
contract BaseTokenStoreAd is ERC721A, Ownable, IERC2981 {
    // Mapping from token ID to token URI
    mapping(uint256 => string) private _tokenURIs;
    
    // Track censored tokenIDs to prevent abuse
    mapping(uint256 => bool) private _censoredTokens;

    // Mint price in wei
    uint256 public mintPrice;

    // Royalty information
    struct RoyaltyInfo {
        address recipient;
        uint16 bps; // Basis points for royalty percentage (1% = 100 bps)
    }

    RoyaltyInfo private _royalties;

    /**
     * @dev Constructor that sets the token name and symbol.
     * @param name The name of the token.
     * @param symbol The symbol of the token.
     */
    constructor(string memory name, string memory symbol) ERC721A(name, symbol) {}

    /**
     * @notice Mint new tokens with specified tokenIds.
     * @dev Only allows minting if the tokenId has not been minted before.
     * @param to The address that will own the minted tokens.
     * @param tokenIds The IDs of the tokens to be minted.
     * @param uris The URIs of the tokens to be minted.
     */
    function mint(address to, uint256[] calldata tokenIds, string[] calldata uris) external payable {
        require(tokenIds.length == uris.length, "TokenIds and URIs length mismatch");
        require(msg.value == tokenIds.length * mintPrice, "Incorrect Ether value sent");
        
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _safeMint(to, tokenIds[i]);
            _setTokenURI(tokenIds[i], uris[i]);
        }

        // Transfer the Ether to the contract owner
        (bool success, ) = payable(owner()).call{value: msg.value}("");
        require(success, "Transfer failed.");
    }

    /**
     * @notice Update the URI of a specific token.
     * @dev Only the owner of the token can update its URI.
     * @param tokenId The token identifier to update.
     * @param newTokenURI The new URI for the token.
     */
    function updateTokenURI(uint256 tokenId, string memory newTokenURI) external {
        require(ownerOf(tokenId) == msg.sender, "Caller is not the owner");
        _setTokenURI(tokenId, newTokenURI);
    }

    /**
     * @notice Censor a token with a specified tokenId (used to prevent abuse).
     * @dev Only the owner can censor it.
     * @param tokenId The token identifier to censor.
     */
    function censor(uint256 tokenId) external onlyOwner {
        _censoredTokens[tokenId] = true;
    }

    /**
     * @notice Set the token URI for a given token.
     * @param tokenId The ID of the token.
     * @param newTokenURI The URI to be associated with the token.
     */
    function _setTokenURI(uint256 tokenId, string memory newTokenURI) internal {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = newTokenURI;
    }

    /**
     * @notice Get the token URI for a given token.
     * @param tokenId The ID of the token.
     * @return The URI associated with the token.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    /**
     * @notice Set royalty information.
     * @dev Can only be called by the contract owner.
     * @param recipient The address to receive the royalties.
     * @param bps The basis points for the royalty percentage (1% = 100 bps).
     */
    function setRoyalties(address recipient, uint16 bps) external onlyOwner {
        require(bps <= 10000, "Basis points must be <= 10000");
        _royalties = RoyaltyInfo(recipient, bps);
    }

    /**
     * @notice Get royalty information for a token sale.
     * @dev The `tokenId` parameter is required by the EIP-2981 standard and can be utilized for token-specific royalties in future extensions.
     * @param salePrice The sale price of the token.
     * @return receiver The address to receive the royalties.
     * @return royaltyAmount The amount of royalties to be paid.
     */
    function royaltyInfo(uint256 /*tokenId*/, uint256 salePrice)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        RoyaltyInfo memory royalties = _royalties;
        receiver = royalties.recipient;
        royaltyAmount = (salePrice * royalties.bps) / 10000;
    }

    /**
     * @notice Indicates if the contract implements the specified interface.
     * @param interfaceId The interface identifier, as specified in ERC-165.
     * @return bool True if the contract implements the specified interface.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721A, IERC165)
        returns (bool)
    {
        return
            interfaceId == type(IERC2981).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
