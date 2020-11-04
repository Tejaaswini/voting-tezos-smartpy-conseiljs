import React from "react";
import { TezosNodeWriter, TezosParameterFormat } from "conseiljs";
import "./App.css";
import capM from "./assets/marvel.jpg";
import DS from "./assets/DS.jpg";
import thor from "./assets/thor.jpg";
import iron from "./assets/iron_man.jpg";
import cap from "./assets/cap.jpg";

const tezosNode = "https://carthagenet.smartpy.io";


async function VotingFunction(candidate) {
  console.log(candidate);
  const keystore = {
    publicKey: "edpktt83iQxBtrxCUdS2gjFpSX8TKR48uYa71tqbmut5qrowrBdvwx",
    privateKey:
      "edskRoCT6wfC2nA3erzDuB3w4V8UNLS5pL9GH1sHCJQ1vNxeFRQpAQCmUZ6ByVL2yEnuySHq6Su3VMh6XHTrEE7ahWooD7HcJK",
    publicKeyHash: "tz1ZoNbjZi71oDRJPRciuEDz48fbRCDZ4iJE",
    seed: "",
    storeType: 1,
  };
  const contractAddress = "KT1WRfEe3xmbhqGcq3PCbo96qJnCVkYXpz5F";
  const result = await TezosNodeWriter.sendContractInvocationOperation(
    tezosNode,
    keystore,
    contractAddress,
    0,
    100000,
    "",
    1000,
    750000,
    undefined,
    `"${candidate}"`,
    TezosParameterFormat.Michelson
  );
  console.log(`Injected operation group id ${result.operationGroupID}`);
  return result.operationGroupID;
}

function httpGet() {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open(
    "GET",
    "https://carthagenet.smartpy.io/chains/main/blocks/head/context/contracts/KT1WRfEe3xmbhqGcq3PCbo96qJnCVkYXpz5F/storage",
    false
  );
  xmlHttp.send(null);
  console.log(JSON.parse(xmlHttp.responseText));
}

function App() {
  httpGet()
  return (
    <div>
      <h3 align="center" style={{ marginTop: "5vh" }}>
        Voting dAPP
      </h3>
      <h1 align="center">Vote Your Favorite Marvel</h1>
      <div className="voting">
        <div className="vote-div">
          <img src={capM} alt="" className="vote_img" />
          <button className="vote_button" onClick={() => VotingFunction('Captain Marvel')}>Captain Marvel</button>
        </div>

        <div className="vote-div">
          <img src={iron} alt="" className="vote_img" />
          <button className="vote_button" onClick={() => VotingFunction('Iron Man')}>Iron Man</button>
        </div>

        <div className="vote-div">
          <img src={cap} alt="" className="vote_img" />
          <button className="vote_button" onClick={() => VotingFunction('Captain America')}>Captain America</button>
        </div>
      </div>

      <div className="voting-row2">
        <div className="vote-div">
          <img src={thor} alt="" className="vote_img" />
          <button className="vote_button" onClick={() => VotingFunction('Thor')}>Thor</button>
        </div>

        <div className="vote-div">
          <img src={DS} alt="" className="vote_img" />
          <button className="vote_button" onClick={() => VotingFunction('Doctor Strange')}>Doctor Strange</button>
        </div>
      </div>
    </div>
  );
}

export default App;
