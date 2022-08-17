import Head from "next/head";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TokenPair from "components/TokenPair";
import { API_URL } from "../constants/index";

// import styles from "../styles/Home.module.css";

export default function Home({}) {
  const [slippage, setSlippage] = useState("");
  const [gasPrice, setGasPrice] = useState("");
  const [gasLimit, setGasLimit] = useState("");
  const [profit, setProfit] = useState("");
  const [liquidity, setLiquidity] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [bnbAmount, setBnbAmount] = useState("");

  const saveSetting = (e) => {
    e.preventDefault();
    if (slippage == "" || gasPrice == "" ||gasLimit == "" ||profit == "" ||liquidity == "" ||timeLimit == "" ||bnbAmount == "") {
      alert("invalid parameter!");
      return;
    }
    fetch(`${API_URL}/save_config`, {
      method: 'POST',
      body: JSON.stringify({
        slippage:slippage,
        gas_price:gasPrice,
        gas_limit:gasLimit,
        profit:profit,
        liquidity:liquidity,
        time_limit:timeLimit,
        bnb_amount:bnbAmount

      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': "*"
      }
    }).then(res => {
      alert("Successfly saved the new bot parameters")
      console.log(res);
    }).catch(error => {
      alert("Failed to save the new parameter!");
      console.error('There was an error!', error);
  });
  };
// slippage, gas_price, gas_limit, profit, liquidity, time_limit, bnb_amount
  useEffect(() => {
    fetch(`${API_URL}/get_config`)
      .then((res) => res.json())
      .then((data) => {
        setSlippage(data.slippage);
        setGasPrice(data.gas_price);
        setGasLimit(data.gas_limit);
        setProfit(data.profit);
        setLiquidity(data.liquidity);
        setTimeLimit(data.time_limit);
        setBnbAmount(data.bnb_amount);
      });
  }, []);

// const loadPriceData = (_baseTokenAddr) => {
//   fetch(`${DEX_SCREENER_API}/tokens/${baseToken}`)
//   .then((res) => res.json())
//   .then((data) => {
//     setTokenPairs(data.pairs);
//     console.log(data);
//   });
// }
  return (
    <div>
      <Head>
        <title>Next.js</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="row">
        <div className="col-md-4 col-sm-12 col-12 col-lg-3 p-5">
          <h1>Bot Setting</h1>
          <div className="form-controls">
            <label htmlFor="slippage" className="form-label">
              Slippage{" "}
            </label>
            <input
              type="text"
              name=""
              id="slippage"
              className="form-control"
              value={slippage}
              onChange={(e) => {
                setSlippage(e.target.value);
              }}
            />
          </div>
          <div className="form-controls">
            <label htmlFor="gasPrice" className="form-label">
              Gas Price:{" "}
            </label>
            <input
              type="text"
              name=""
              id="gasPrice"
              className="form-control"
              value={gasPrice}
              onChange={(e) => {
                setGasPrice(e.target.value);
              }}
            />
          </div>
          <div className="form-controls">
            <label htmlFor="gasLimit" className="form-label">
              Gas Limit:{" "}
            </label>
            <input
              type="number"
              name=""
              id="gasLimit"
              className="form-control"
              value={gasLimit}
              onChange={(e) => {
                setGasLimit(e.target.value);
              }}
            />
          </div>
          <div className="form-controls">
            <label htmlFor="profit" className="form-label">
              Min Profit (`(%)`):{" "}
            </label>
            <input
              type="text"
              name=""
              id="profit"
              className="form-control"
              value={profit}
              onChange={(e) => {
                setProfit(e.target.value);
              }}
            />
          </div>
          <div className="form-controls">
            <label htmlFor="liquidity" className="form-label">
              Min Liquidity:{" "}
            </label>
            <input
              type="number"
              name=""
              id="liquidity"
              className="form-control"
              value={liquidity}
              onChange={(e) => {
                setLiquidity(e.target.value);
              }}
            />
          </div>
          <div className="form-controls">
            <label htmlFor="timeLimit" className="form-label">
              Transaction Execution Timeout:{" "}
            </label>
            <input
              type="number"
              name="timeLimit"
              className="form-control"
              value={timeLimit}
              onChange={(e) => {
                setTimeLimit(e.target.value);
              }}
            />
          </div>
          <div className="form-controls">
            <label htmlFor="bnbAmount" className="form-label">
              BNB IN AMOUNT:{" "}
            </label>
            <input
              type="text"
              name=""
              id="bnbAmount"
              className="form-control"
              value={bnbAmount}
              onChange={(e) => {
                setBnbAmount(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              className="btn btn-primary btn-block my-3"
              onClick={(e) => {
                saveSetting(e);
              }}
            >
              Save Setting
            </button>
          </div>
        </div>
        <div className="col-md-8 col-sm-12 col-12 col-lg-9 p-5">
          <h1>Bot History</h1>
          <TokenPair />
        </div>
      </main>
    </div>
  );
}
