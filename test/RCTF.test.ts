import { loadFixture, ethers, expect } from "./setup";
import type { RCTF } from "../typechain-types";

describe("RCTF", function () {
  async function deploy() {
    const [owner, receiver, user] = await ethers.getSigners();

    const Factory = await ethers.getContractFactory("RCTF", owner);
    const rctf: RCTF = await Factory.deploy({ value: ethers.parseUnits("2", "ether") });
    await rctf.waitForDeployment();

    return { owner, receiver, user, rctf }
  }

  it("Should allow to receive and send payments", async function () {
    const { owner, receiver, user, rctf } = await loadFixture(deploy);

    const amount = ethers.parseUnits("2", "ether");
    const nonce = 1;

    const hash = ethers.solidityPackedKeccak256(["address", "uint256", "uint256", "address"], [receiver.address, amount, nonce, await rctf.getAddress()]);

    const messageHashBin = ethers.toBeArray(hash);
    const signature = await owner.signMessage(messageHashBin);

    const tx = await rctf.connect(receiver).claim(amount, nonce, signature);

    expect(tx).to.changeEtherBalance(receiver, amount);
  });

  it("Should not allow to receive fake amount", async function () {
    const { owner, receiver, user, rctf } = await loadFixture(deploy);

    const amount = ethers.parseUnits("2", "ether");
    const nonce = 1;

    const hash = ethers.solidityPackedKeccak256(["address", "uint256", "uint256", "address"], [receiver.address, amount, nonce, await rctf.getAddress()]);

    const messageHashBin = ethers.toBeArray(hash);
    const signature = await owner.signMessage(messageHashBin);

    const moreThanSignedAmount = ethers.parseUnits("3", "ether");
    await expect(rctf.connect(receiver).claim(moreThanSignedAmount, nonce, signature)).to.be.revertedWith("Invalid signature!")
  });

  it("Should not allow to receive amount more than 1 time", async function () {
    const { owner, receiver, user, rctf } = await loadFixture(deploy);

    const amount = ethers.parseUnits("2", "ether");
    const nonce = 1;

    const hash = ethers.solidityPackedKeccak256(["address", "uint256", "uint256", "address"], [receiver.address, amount, nonce, await rctf.getAddress()]);

    const messageHashBin = ethers.toBeArray(hash);
    const signature = await owner.signMessage(messageHashBin);

    const tx = await rctf.connect(receiver).claim(amount, nonce, signature);
    await expect(rctf.connect(receiver).claim(amount, nonce, signature)).to.be.revertedWith("Nonce alreade used!")
  });
})