// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * This simple library assumes the commitments are managed in a contract elsewhere. This is a pure utility solidity contract. 
 */
contract CommitCryptVerifier {
    // Function to verify the commitment
    function verifyCommitment(bytes32 _commitment, string memory _secret) external pure returns (bool) {
        // Reconstruct the commitment from the provided secret
        bytes32 reconstructedCommitment = keccak256(abi.encodePacked(_secret));

        // Check if the reconstructed commitment matches the provided commitment
        return reconstructedCommitment == _commitment;
    }
}
