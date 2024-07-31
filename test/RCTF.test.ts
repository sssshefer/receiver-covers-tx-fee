import { loadFixture, ethers, expect } from "./setup";
//import type { RCTF } from "../typechain-types";

describe("RCTF", function () {
  async function deploy() {
    const [user1, user2, user3] = await ethers.getSigners();

    const Factory = await ethers.getContractFactory("RCTF", user1);
    const rctf = await Factory.deploy();
    await rctf.waitForDeployment();

    return { user1, user2, user3, rctf }
  }

  it("Deploy test", async function () {
    const { user1, user2, user3, rctf } = await loadFixture(deploy);


  });
})