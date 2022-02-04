import React, { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { address } from "../contracts";
import nftabi from "../contracts/NFT.json";
// import logo from "../logo.png";
import { ethers } from "ethers";
import banner from "../banner.png";
import { notifyMintSuccess, notifyError, notifyNetwork } from "../toast";
import {
  useBalanceOf,
  useTotalSupply,
  useMaxSupply,
  useCost,
  useNftPerAddressLimit,
  useNftPerAddressLimit2,
  useNftPerAddressLimit3,
  useWeiCost,
} from "../hooks";
import axios from "axios";

const Minter = () => {
  const { account, activateBrowserWallet } = useEthers();
  const [hexProof2, setHexProof2] = useState([]);
  const [hexProof3, setHexProof3] = useState([]);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(1);
  const [minting, setMinting] = useState(false);
  const totalSupply = useTotalSupply();
  const maxSupply = useMaxSupply();
  const cost = useCost();
  const weiCost = useWeiCost();
  const nftbalance = useBalanceOf(account);
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

  const limit1 = useNftPerAddressLimit();
  const limit2 = useNftPerAddressLimit2();
  const limit3 = useNftPerAddressLimit3();

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
        // gasLimit: "25000",
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

  async function handleMint2() {
    try {
      setMinting(true);
      console.log(1);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(2);

      const signer = provider.getSigner();
      console.log(3);

      /* next, create the item */
      console.log(4);

      let nftcontract = new ethers.Contract(address, nftInterface, signer);
      console.log(5);

      let transaction = await nftcontract.whiteListedMint2(hexProof2.data, 1, {
        value: weiCost.toString(),
        // gasLimit: "25000",
      });
      console.log(6);

      await transaction.wait();
      console.log(7);

      setMinting(false);
      notifyMintSuccess();
    } catch (error) {
      notifyError();
      console.log(error);
      setMinting(false);
    }
  }

  async function handleMint3() {
    try {
      setMinting(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const txCost = Number(weiCost) * amount;
      /* next, create the item */
      let nftcontract = new ethers.Contract(address, nftInterface, signer);
      let transaction = await nftcontract.whiteListedMint3(
        hexProof3.data,
        amount,
        {
          value: txCost.toString(),
          // gasLimit: "25000",
        }
      );
      await transaction.wait();
      setMinting(false);
      setAmount(1);
      notifyMintSuccess();
    } catch (error) {
      notifyError();
      console.log(error);
      setAmount(1);

      setMinting(false);
    }
  }

  const loadLimit = () => {
    if (hexProof2.status == 200) {
      setLimit(limit2);
    } else if (hexProof3.status == 200) {
      setLimit(limit3);
    } else {
      setLimit(limit1);
    }
  };

  const proof2 = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const res = await axios.get(
      `https://wl2.kodinghandle.com/get-proof-2/${account}`,
      config
    );
    return res;
  };

  const proof3 = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "",
      },
    };
    // const res = "https://www.google.com";
    const res = await axios.get(
      `https://wl3.kodinghandle.com/get-proof-3/${account}`,
      config
    );
    // const res = await axios.get(`http://localhost:8000/get-proof-3/${account}`);

    return res;
  };

  const loadProof3 = () => {
    proof3()
      .then((data) => {
        if (data.error) {
          setError(error);
          console.log(error);
        } else {
          setHexProof3(data);
        }
      })
      .catch((error) => console.log(error));
  };

  const loadProof2 = () => {
    proof2()
      .then((data) => {
        if (data.error) {
          setError(error);
          // console.log(error);
        } else {
          setHexProof2(data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadProof2();
    loadProof3();
    loadLimit();
  });

  // console.log(hexProof2.data);
  console.log(hexProof3.data);

  return (
    <>
      <div className="minter-main">
        <img src={banner} className="banner" alt="banner" />
        {/* <p>{hexProof2}</p> */}
        {/* <img className="img-main" src={logo} alt="logo" /> */}
        <h1 className="minter-h1">Mint Your Dominant Eagle</h1>
        {/* TODO: PRESALE 3 FEB 2022 3PM UTC */}
        {totalSupply < 3000 ? (
          <div className="minting-section">
            {account ? (
              <div className="minting-section">
                <button className="connect btn btn-gradient-blue">{`${account.slice(
                  0,
                  6
                )}...${account.slice(-6)}`}</button>

                {nftbalance < limit ? (
                  <>
                    {limit == limit2 ? (
                      <button
                        onClick={() => handleMint2()}
                        className="btn mint  btn-gradient-blue"
                      >
                        {minting ? "Please Wait" : "Mint"}
                      </button>
                    ) : null}
                    {limit == limit3 ? (
                      <div>
                        <button
                          className="btn btn-round amount  btn-gradient-blue"
                          onClick={() => decrease()}
                        >
                          -
                        </button>

                        <button
                          onClick={() => handleMint3()}
                          className="btn mint  btn-gradient-blue"
                        >
                          {minting ? "Please Wait" : `Mint ${amount}`}
                        </button>
                        <button
                          className="btn btn-round amount  btn-gradient-blue"
                          onClick={() => increase()}
                        >
                          +
                        </button>
                      </div>
                    ) : null}
                    {limit != limit2 && limit != limit3 ? (
                      <div>
                        <button
                          className="btn btn-round amount  btn-gradient-blue"
                          onClick={() => decrease()}
                        >
                          -
                        </button>
                        <button
                          onClick={() => handleMint()}
                          className="btn mint  btn-gradient-blue"
                        >
                          {minting ? "Please Wait" : `Mint ${amount}`}
                        </button>
                        <button
                          className="btn btn-round amount  btn-gradient-blue"
                          onClick={() => increase()}
                        >
                          +
                        </button>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <>
                    {limit != limit2 && limit != limit3 ? (
                      <div>
                        <button
                          // onClick={() => handleMint()}
                          className="btn mint  btn-gradient-blue"
                        >
                          Please Wait for Public Sale
                        </button>
                      </div>
                    ) : (
                      <button
                        style={{ width: "100%" }}
                        className="btn mint  btn-gradient-blue"
                      >
                        You Have Reached Your Mint Limit
                      </button>
                    )}
                    {/* <button
                      style={{ width: "100%" }}
                      className="btn mint  btn-gradient-blue"
                    >
                      You Have Reached Your Mint Limit
                    </button> */}
                  </>
                )}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => activateBrowserWallet(onError)}
                  className="connect btn btn-gradient-blue"
                >
                  Connect Metamask
                </button>
              </div>
            )}
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
              <h2>Live</h2>
            </div>
            <div className="vl"></div>
            <div className="minter-status-card">
              <h6>Price</h6>
              <h2>{cost} ETH</h2>
            </div>
            <div className="vl"></div>
            {account ? (
              <div className="minter-status-card">
                <h6>Your Mint</h6>
                <h2>
                  {nftbalance}/{limit}
                </h2>
              </div>
            ) : null}
            <div className="vl"></div>
            <div className="minter-status-card">
              <h6>To Be Minted</h6>
              <h2>{maxSupply - totalSupply}</h2>
            </div>
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
            <div className="vl"></div>
            <div className="minter-status-card">
              <h6>To Be Minted</h6>
              <h2>
                {/* {maxSupply - totalSupply}/{maxSupply} */}
                0/3000
              </h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Minter;
