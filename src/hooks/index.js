import { ethers } from "ethers";
import { useContractCall, useContractFunction } from "@usedapp/core";
import nftabi from "../contracts/NFT.json";
import { address } from "../contracts";
import { formatUnits } from "ethers/lib/utils";

const nftInterface = new ethers.utils.Interface(nftabi);

export function useTotalSupply() {
  const [totalSupply] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "totalSupply",
      args: [],
    }) ?? [];
  const formatedTotoalSupply = totalSupply ? totalSupply.toNumber() : 0;
  return formatedTotoalSupply;
}

export function useNftPerAddressLimit() {
  const [nftPerAddressLimit] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "nftPerAddressLimit",
      args: [],
    }) ?? [];
  const formatedNftPerAddressLimit = nftPerAddressLimit
    ? nftPerAddressLimit.toNumber()
    : 0;
  return formatedNftPerAddressLimit;
}

export function useNftPerAddressLimit2() {
  const [nftPerAddressLimit2] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "nftPerAddressLimit2",
      args: [],
    }) ?? [];
  const formatedNftPerAddressLimit2 = nftPerAddressLimit2
    ? nftPerAddressLimit2.toNumber()
    : 0;
  return formatedNftPerAddressLimit2;
}

export function useNftPerAddressLimit3() {
  const [nftPerAddressLimit3] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "nftPerAddressLimit3",
      args: [],
    }) ?? [];
  const formatedNftPerAddressLimit3 = nftPerAddressLimit3
    ? nftPerAddressLimit3.toNumber()
    : 0;
  return formatedNftPerAddressLimit3;
}

export function useMaxSupply() {
  const [maxSupply] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "maxSupply",
      args: [],
    }) ?? [];
  const formatedMaxSupply = maxSupply ? maxSupply.toNumber() : 0;
  return formatedMaxSupply;
}

export function useCost() {
  const [cost] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "cost",
      args: [],
    }) ?? [];
  const formattedCost = cost ? parseFloat(formatUnits(cost, 18)) : 0;
  return formattedCost;
}

export function useWeiCost() {
  const [cost] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "cost",
      args: [],
    }) ?? [];
  return cost;
}

export function useBalanceOf(ownerAddress) {
  const [balanceOf] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "balanceOf",
      args: [ownerAddress],
    }) ?? [];
  const formatedBalanceof = balanceOf ? balanceOf.toNumber() : 0;
  return formatedBalanceof;
}
