import React, { useState } from "react";
import { useEthers } from "@usedapp/core";
import { address } from "../contracts";
import nftabi from "../contracts/NFT.json";
import { ethers } from "ethers";
import banner from "../banner.png";
import { notifyMintSuccess, notifyError, notifyNetwork } from "../toast";
import {
  useTotalSupply,
  // useMaxSupply,
  useCost,
  useWeiCost,
  useBalanceOf,
  useNftPerAddressLimit,
} from "../hooks";

const Minter = () => {
  const { account, activateBrowserWallet } = useEthers();
  const [minting, setMinting] = useState(false);
  const totalSupply = useTotalSupply();
  // const maxSupply = useMaxSupply();
  const cost = useCost();
  const weiCost = useWeiCost();
  const balance = useBalanceOf(account);
  const limit = useNftPerAddressLimit();
  const [amount, setAmount] = useState(1);

  const increase = () => {
    if (amount < 3) {
      setAmount(amount + 1);
    }
  };

  const decrease = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const nftInterface = new ethers.utils.Interface(nftabi);

  const onError = () => {
    notifyNetwork();
  };

  async function handleMint() {
    try {
      setMinting(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const txCost = Number(weiCost) * amount;
      /* next, create the item */
      let nftcontract = new ethers.Contract(address, nftInterface, signer);
      let transaction = await nftcontract.mint(amount, {
        value: txCost.toString(),
      });
      await transaction.wait();
      setMinting(false);
      setAmount(1);
      notifyMintSuccess();
    } catch (error) {
      notifyError();
      setAmount(1);
      console.log(error);
      setMinting(false);
    }
  }

  return (
    <>
      <div className="minter-main">
        <img src={banner} className="banner" alt="banner" />
        <h1 className="minter-h1">Mint Your Dominant Eagle</h1>
        <div style={{ marginTop: 30, padding: 10 }}>
          <h3 className="minter-h1">Public Sale On 19 FEB 5 PM UTC</h3>
        </div>

        {totalSupply < 3000 ? (
          <div className="minting-section">
            <button
              onClick={() => activateBrowserWallet(onError)}
              className="connect btn btn-gradient-blue"
            >
              Public Sale Soon
            </button>
          </div>
        ) : (
          <div className="minting-section">
            <button className="connect btn btn-gradient-blue">
              Sale Ended
            </button>
          </div>
        )}

        {totalSupply < 3000 ? (
          <div className="minter-status">
            <div className="minter-status-card">
              <h6>Status</h6>
              <h2>Soon</h2>
            </div>
            <div className="vl"></div>
            <div className="minter-status-card">
              <h6>Price</h6>
              <h2>0.15 ETH</h2>
            </div>
            <div className="vl"></div>
            {account ? (
              <div className="minter-status-card">
                <h6>Per Transaction</h6>
                <h2>3</h2>
              </div>
            ) : null}
            {/* <div className="vl"></div> */}
            {/* <div className="minter-status-card">
              <h6>To Be Minted</h6>
              <h2>{maxSupply - totalSupply}</h2>
            </div> */}
          </div>
        ) : (
          <div className="minter-status">
            <div className="minter-status-card">
              <h6>Status</h6>
              <h2>Ended</h2>
            </div>
            <div className="vl"></div>
            <div className="minter-status-card">
              <h6>Price</h6>
              <h2>0.15 ETH</h2>
            </div>

            {/* <div className="vl"></div> */}
            {/* <div className="minter-status-card">
              <h6>To Be Minted</h6>
              <h2>0/3000</h2>
            </div> */}
          </div>
        )}
      </div>
    </>
  );
};

export default Minter;
