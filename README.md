<img src="https://github.com/user-attachments/assets/78052828-6734-402f-8359-a20156f4f840" alt="digital-signature-image"/>

# Receiver Covers TX Fee

## Table of Contents

- [Introduction](#introduction)
- [Theory Notes](#theory-notes)
  - [Digital Signatures: Signing, Verifying, and Extracting the Public Address](#digital-signatures-signing-verifying-and-extracting-the-public-address)
- [Features and Functionality](#features-and-functionality)
- [Implementation](#implementation)
  - [Contract Overview](#contract-overview)
  - [Tests](#tests)
- [Running the Project Locally](#running-the-project-locally)

## Introduction

This project implements a system where the sender signs a transaction data off-chain and sends the signature to the receiver, who then pays the transaction fee instead of the sender. A more advanced and secure implementation can be found on the OpenZeppelin website.

## Theory Notes

### Digital Signatures: Signing, Verifying, and Extracting the Public Address

Digital signatures provide a way to ensure the authenticity and integrity of a message. In the context of this project, the following elements are crucial:
- **Signing**: The sender creates a digital signature using their private key, which is used to confirm the authenticity of the data.
- **Verifying**: The receiver verifies the signature using the sender's public key to ensure the message has not been tampered with.
- **Extracting the Public Address**: The process involves retrieving the sender's address from the signed message to validate the sender's identity.

## Features and Functionality

- **Off-chain Signature**: The sender signs the transaction data off-chain, reducing the need for the sender to pay transaction fees.
- **Nonce Management**: Nonce values prevent replay attacks by ensuring each transaction can only be processed once.
- **Signature Verification**: The contract verifies the signature to confirm the authenticity and integrity of the transaction data.

## Implementation

### Contract Overview

The contract, `RCTF`, implements the core functionality:
- **Owner Initialization**: The contract is initialized with an owner and a deposit of ETH.
- **Claim Function**: Allows the receiver to claim the specified amount if they provide a valid signature.
- **Signature Recovery**: Utilizes `ecrecover` to extract the signer's address from the provided signature.
- **Nonce Management**: Ensures that each nonce is used only once to prevent replay attacks.

### Tests

The test suite covers:
- **Successful Payment**: Ensures the receiver can successfully claim the payment with a valid signature.
- **Fake Amount Prevention**: Verifies that claims with amounts greater than signed are rejected.
- **Nonce Reuse Prevention**: Confirms that a nonce cannot be reused for multiple claims.

## Running the Project Locally

To run this project locally, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/sssshefer/receiver-covers-tx-fee.git
    cd receiver-covers-tx-fee
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Compile Contracts**:
    ```bash
    npx hardhat compile
    ```

4. **Run Tests**:
    ```bash
    npx hardhat test
    ```

This setup ensures that you can develop, test, and deploy the contract locally using Hardhat.

<a href="https://ru.freepik.com/free-vector/znacok-biometriceskoi-identifikacii_23182515.htm#fromView=search&page=1&position=1&uuid=17aafe63-81d9-48e0-9c0e-202683d1dd44">Pic from macrovector on Freepik</a>

*** Happy Hacking ***
