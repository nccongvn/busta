import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Card from "../components/common/Card";
import Spinner from "../components/common/Spinner";
import { initWeb3 } from "../utils.js";
import BusdStacking from "../contracts/LeadStake.json";
import toast, { Toaster } from 'react-hot-toast';


const HomePage = () => {
  
  const [loading, setLoading] = useState(false);
  const [stakeLoading, setStakeLoading] = useState(false);
  const [depositLoading, setDepositLoading] = useState(false);
  const [reinvestLoading, setReInvestLoading] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [dailyCompoundBonus,setDailyCompoundBonus] = useState('0');
  const [canSell, setCanSell] = useState(true);
  const [error, setError] = useState("");
  const [web3, setWeb3] = useState();
  const [accounts, setAccounts] = useState();
  const [busdstacking, setBusdStacking] = useState();
  const [busdToken, setBusdToken] = useState();
  const [balance, setBalance] = useState('0');
  const [approved, setApproved] = useState('0');
  const [totalStaked, setTotalStaked] = useState();
  const [referralRewards, setReferralRewards] = useState();
  const [referralCount, setReferralCount] = useState();
  const [amount, setAmount] = useState('');
  const [amountDeposit, setAmountDeposit] = useState();
  const [showModal, setShowModal] = useState(false);
  const [earning, setEarning] = useState('0');
  const [userdeposit, setUserDeposit] = useState('0');
  const [initialdeposit,setInitialDeposit] = useState('0');
  const [totalWithdrawn,setTotalWithdrawn] = useState('0');
  const [depositcount,setDepositCount] = useState();
  const [miner,setMiner] = useState('0');
  const [myreflink, setMyrefflink] = useState('');
  const [minerBUSD,setMinerBUSD] = useState('0');
  const [compoundNoTax,setCompoundNoTax] = useState('0');
  const [bonus,setBonus] = useState('0');
  const [bonusMax,setBonusMax] = useState('0');
  const [refPercent,setRefPercent] = useState('0');
  const [tax,setTax] = useState('0');
  const [copied, setCopied] = useState(false);
  const [formatedAccount, setFormattedAccount] = useState(false);
  
  const busdTokenAbi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
  const BusdAddressToken = "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7";
  const BusdStackingAddress = "0x9D2707624BC9E6e65A567daf08Fd6bE28D2045aC";

  function readableBUSD(amount, decimals) {
    return (amount / 1e18).toFixed(decimals);
  }

  const enterAmount = () => toast.error('Please re-enter amount!');
  const approveSuccess = () => toast.success('Approve BUSD Successfully!');
  const depositSuccess = () => toast.success('Hire Miners Successfully!');
  const copySuccess = () => toast.success('Copied!');
  const compoundSuccess = () => toast.success('Add compound Successfully!');
  const pleaseAprove = () => toast.error('Please Approve BUSD!');


  var textToCopy = myreflink;
    const copyToClipboard = () => {
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 10000);
        },
        (err) => {
          console.log("failed to copy", err.mesage);
        }
      );
    };
  
  const init = async () => {
    if (isReady()) {
      return;
    }
    setLoading(true);
    let web3;
    try {
      web3 = await initWeb3();
    } catch (err) {
      console.error(err);
      setLoading(false);
      return;
    }

 
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();

    if (networkId !== 97) {
      setError("Please connect BSC Mainnet");
      setLoading(false);
      return;
    }
    //FORMAT ACCOUNT
    const formatAccount = accounts.slice(0, 5) + '...' + accounts.slice(-5)
    setFormattedAccount(formatAccount)
  
    //BUSD TOKEN CONTRACT
    const busdToken = new web3.eth.Contract(
      busdTokenAbi,
      BusdAddressToken
    ); 
    const balance = await busdToken.methods.balanceOf(accounts[0]).call();
    const approved = await busdToken.methods.allowance(accounts[0],BusdStackingAddress).call();
    
    //BUSDSTAKING CONTRACT
    const busdstacking = new web3.eth.Contract(
      BusdStacking.abi,
      BusdStackingAddress
    ); 

    const siteInfor = await busdstacking.methods.getSiteInfo().call();
    const userInfo = await busdstacking.methods.users(accounts[0]).call();
    // const earning = await busdstacking.methods.getAvailableEarnings(accounts[0]).call();
    const compoundNoTax = await busdstacking.methods.COMPOUND_FOR_NO_TAX_WITHDRAWAL().call();
    const bonus = await busdstacking.methods.COMPOUND_BONUS().call();
    const bonusMax = await busdstacking.methods.COMPOUND_BONUS_MAX_TIMES().call();
    const refPercent = await busdstacking.methods.REFERRAL().call();

    var amountToWei = web3.utils.toWei('100'); 
    var minerPerday = 24*60*60 * userInfo.miners;
    var minerBUSD = await busdstacking.methods.calculateMinersSellForYield(minerPerday,amountToWei).call();
    

    //my referral link
    let myreflink = window.location.origin + "?ref=" + accounts[0];

    setMyrefflink(myreflink);  
    setWeb3(web3);
    setAccounts(accounts);
    setBusdStacking(busdstacking);
    setBusdToken(busdToken);
    setBalance(balance);
    setApproved(approved);
    setBonus(bonus);
    setMinerBUSD(minerBUSD);
    setBonusMax(bonusMax);
    setRefPercent(refPercent);
    setCompoundNoTax(compoundNoTax);
    setReferralRewards(userInfo.referralMinerRewards);//ref reward
    setReferralCount(userInfo.referralsCount);        //count ref
    setUserDeposit(userInfo.userDeposit);             //total invest
    setInitialDeposit(userInfo.initialDeposit);       //init depposit
    setMiner(userInfo.miners)                         //miner
    setTotalWithdrawn(userInfo.totalWithdrawn);       //total withdraw
    setDailyCompoundBonus(userInfo.dailyCompoundBonus); //
    setEarning(earning);                              //earning
    setTotalStaked(siteInfor._totalStaked);           //total staked
    setDepositCount(siteInfor._totalDeposits);        //count deposit

    

    
    window.ethereum.on("accountsChanged", (accounts) => {
      setAccounts(accounts);
    });
    setLoading(false);
  };

  const isReady = () => {
    return !!busdstacking && !!web3 && !!accounts;
  };

  useEffect(() => {
    const triggerAlreadyInjectedWeb3 = async () => {
      if (window.ethereum) {
        if (
          window.ethereum.selectedAddress &&
          window.ethereum.networkVersion === "97"
        ) {
          await init();
        }
      }
    };
    triggerAlreadyInjectedWeb3();
  }, []);

 

  async function updateAll() {
    await Promise.all([
      updateInitDeposit(),
      updateTotalStaked(),
      updateAccountWithdraw(),
      updateEarning(),
      updateInvesting(),
      updateApprove(),
      updatebalance(),
      updateDailyCompoundBonus(),
      updateEarnperday(),
      updateTotalDeposit(),
      updateTax(),
    ]);
  }

  useEffect(() => {
    if (isReady()) {
      updateAll();
    }
  }, [busdstacking, busdToken, web3, accounts]);

  async function updateApprove() {
    if (busdToken) {
     const approveds = await busdToken.methods.allowance(accounts[0],BusdStackingAddress).call();
      setApproved(approveds);
      return approved;
    }
  }
  async function updatebalance() {
    if (busdToken) {
     const balance = await busdToken.methods.balanceOf(accounts[0]).call();
      setBalance(balance);
      return balance;
    }
  }
  async function updateDailyCompoundBonus() {
    if (busdstacking) {
      const userInfoUpdate = await busdstacking.methods.users(accounts[0]).call();
      setDailyCompoundBonus(userInfoUpdate.dailyCompoundBonus);
      return dailyCompoundBonus;
    }
  }
  async function updateEarnperday() {
    if (busdstacking) {
    var amountToWei = web3.utils.toWei('100'); 
      const userinfo = await busdstacking.methods.users(accounts[0]).call();
      var minerPerday = 24*60*60 * userinfo.miners;
      const userInfoUpdate = await busdstacking.methods.calculateMinersSellForYield(minerPerday,amountToWei).call();
      setMinerBUSD(userInfoUpdate);
      return minerBUSD;
    }
  }
  async function updateInitDeposit() {
    if (busdstacking) {
      const userInfoUpdate = await busdstacking.methods.users(accounts[0]).call();
      setInitialDeposit(userInfoUpdate.initialDeposit);
      return initialdeposit;
    }
  }

  async function updateInvesting() {
    if (busdstacking) {
      const userInfoUpdate = await busdstacking.methods.users(accounts[0]).call();
      setUserDeposit(userInfoUpdate.userDeposit);
      return userdeposit;
    }
  }
  async function updateAccountWithdraw() {
    if (busdstacking) {
      const userInfoUpdate = await busdstacking.methods.users(accounts[0]).call();
      setTotalWithdrawn(userInfoUpdate.totalWithdrawn);
      return totalWithdrawn;
    }
  }

  async function updateEarning() {
    if (busdstacking) {
      let earning = await busdstacking.methods.getAvailableEarnings(accounts[0]).call();
      await setEarning(earning);
      return earning;
    }
  }
  async function updateTotalStaked() {
    if (busdstacking) {
      const totalStakeds = await busdstacking.methods.totalStaked().call();
      setTotalStaked(totalStakeds);
      return totalStaked;
    }
  }
  async function updateTotalDeposit() {
    if (busdstacking) {
      const totaldeposits = await busdstacking.methods.totalDeposits().call();
      setDepositCount(totaldeposits);
      return depositcount;
    }
  }

  async function updateTax() {
    if(dailyCompoundBonus < compoundNoTax){
      if (busdstacking) {
        const taxWithdraw = await busdstacking.methods.WITHDRAWAL_TAX().call();
        setTax(taxWithdraw);
        return tax;
      }  
    }else {
     var tax = '0';
      return tax;
    }
   
  }
console.log(tax)

//APPROVE BUSD
  async function approvebusd() {
    
    if (!amount || amount === '0' || amount < 0){
      enterAmount();
      setAmount('');
    } else {
      setStakeLoading(true);
      let convertToWei = web3.utils.toWei(amount, 'Ether');
    try {
      await busdToken.methods
        .approve("0x9D2707624BC9E6e65A567daf08Fd6bE28D2045aC", convertToWei)
        .send({ from: accounts[0] })
      
    } catch (err) {
      console.error(err);
    }
    await updateAll();
    setAmount('');
    setStakeLoading(false);
    //  approveSuccess();
  }
}
  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) { return pair[1]; }
    }
    return (false);
}
  //DEPOSIT BUSD
  async function deposit() {
    if(approved=== '0'){
      pleaseAprove();
    }
    if (!amountDeposit || amountDeposit === '0' || amountDeposit < 0) {
      setAmount('');
      enterAmount();
    } else {
      setDepositLoading(true);
    let convertToWei = web3.utils.toWei(amountDeposit, 'Ether');
    let ref = getQueryVariable('ref');
    try {
      if (!web3.utils.isAddress(ref)) { ref = accounts[0] }
      await busdstacking.methods
      .Deposit(ref,convertToWei)
      .send({ from: accounts[0] });
      await updateAll();
    } catch (err) {
      console.error(err);
    }
    setAmountDeposit('');
    setDepositLoading(false);
    // depositSuccess();
    }
  }

  async function reinvest() {

    if (canSell) {
      setCanSell(false);
      console.log( accounts[0])
      setReInvestLoading(true);
      try {
      
        await busdstacking.methods
        .hatchMiners(true)
        .send({ from: accounts[0] });
        await updateAll();
      } catch (err) {
        console.error(err);
        setTimeout(function(){
          setCanSell(true);
      },3000);
      }
      setReInvestLoading(false);
      // compoundSuccess();
    }
  }

  async function withdraw() {
    if (canSell) {
      setCanSell(false);
      console.log('selling miner')
    setWithdrawLoading(true);
    try {
      await busdstacking.methods
      .Withdraw()
      .send({ from: accounts[0] });
      await updateAll();
    } catch (err) {
      console.error(err);
    }
    setTimeout(function(){
      setCanSell(true);
  },10000);
    setWithdrawLoading(false);
  }else {
    console.log('Cannot sell yet....')
  }
}

  return (
    <div className="w-full overflow-hidden">
       <div><Toaster /></div>
      {showModal && (
        <Modal title="" onClose={() => setShowModal(false)}>
          <div className="text-2xl mb-2">
           error
          </div>
          <div>1. Please check your account and retry again...</div>
          <div>2. Your referrer's address is a registered member if any</div>

          <div className="my-2">
            Thanks for your support and feel free to{" "}
            <a href="https://localhost:3000" className="text-blue-500">
              contact us
            </a>
          </div>

          <div className="flex flex-row justify-center">
            <Button onClick={() => setShowModal(false)}>Close</Button>
          </div>
        </Modal>
      )}
      {/* <div className="relative z-20 w-full top-0">
        <img
          src="/images/nosiy.png"
          alt=""
          className="absolute z-10 top-noisy"
        />
        <img
          src="/images/nosiy.png"
          alt=""
          className="absolute z-10 second-noisy"
        />
      </div> */}

      <div className="relative z-10 w-full top-0">
        <div className="absolute w-full home-gradient"></div>
      </div>

      <div className="relative w-full z-30">
        <Header />

        <div className="container mx-auto pb-18 px-4 force-height">

          {!accounts && (
            <div className="w-full py-6 text-center">
                 <div id='controls'>
               {/* <Link id='toggler' to='/' >Switch To Ethereum Chain</  Link> */}
             </div>
              <Button
                className="w-full md:w-2/5 text-2xl flex flex-row justify-center mx-auto"
                uppercase={false}
                onClick={async () => await init()}
            
              >
                {loading && <Spinner color="#181A20" size={40} />}
                {!loading && (error !== "" ? error : "CONNECT METAMASK")}
              </Button>

              <div className="text-white text-center mt-6 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
                <h1>Stake Your BUSD Token</h1>
              </div>
              <div className="w-full md:w-3/6 justify-center mx-auto mt-6">
                <Card title="Rules">
                  <div className="flex flex-col pt-8 pb-4 text-white ">
                  <span>
                    <strong >Important Note!</strong>
                    <p>
                      To ensure sustainability and longevity of the project,
                      AND as an enhancement from the previous similar miner game, the crops farmers team has implemented
                      a
                      feature that would encourage/enforce farmers to continuously compound before taking profit.
                    </p><p>
                    </p><p>
                      Users should compound X no. of times before they can withdraw.
                      Should a farmer decide not to compound or hire more farmers using his earnings, and continuously
                      withdraw,
                      farmer will be charged with a 80% feedback tax that will remain part of the contract.
                    </p><p>
                      In Addition, to further encourage the community to re-hire/compound, there will be an additional
                      3% bonus for each compound action that the user will do,
                      which can stack up to 40% for 10 consecutive times / 5 days. By doing so, this will ensure the
                      long term potential profit of every investor.
                    </p><p>
                      The best strategy that the team can recommend is to re-hire/compound for 5 days and harvest 1 day
                      a week.
                      This will increase the users investment at the same time increasing the daily yield earnings. This
                      strategy has already been tried and tested by several project and is proven effective.
                    </p></span>
                  </div>
                </Card>
                <div className="flex flex-col pt-8 px-2">
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
                <Card noLine>
                  <div className="flex flex-col px-2">
                    <div className="text-center pb-4">
                      <div className="text-white text-xs">
                        <p><strong className="text-red-500">High Risk!</strong> Funds that are used to initially hire farmers
                      (including re-hire) cannot be withdrawn,
                      however your farmers will indefinitely work and grow crops for you. Please use the application at
                      your own risk.
                  
                </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {accounts && (
            
            <div className="grid grid-col-1 md:grid-cols-2 gap-6 mt-10">
              <Card title="BUSD STACKING Contract">
                <div className="flex flex-col pt-8 pb-4 text-white">
                <span className="text-lg text-gray-400 text-center">
                       Total BUSD locked
                      </span>
                  <div className="text-center">
                 
                    <span className="text-white text-5xl">
                   
                      {readableBUSD(totalStaked,2) }
                    </span>
                    <span className="text-white text-2xl ml-2">BUSD</span>
                  </div>
                  <span className="text-lg text-gray-400 text-center">
                  Deposit count
                      </span>
                 
                  <div className="text-center">
                 
                  <span className="text-white text-2xl">{depositcount}</span>
                 </div>
                
                </div>
              </Card>
              <Card title="Stacking">
                <div className="flex flex-col pt-8 px-2">
                  <div className="text-center pb-8">
                    <div className="text-gray-400 text-lg font-thin">
                      <ul>
                        <li>
                          Investing:{"  "}
                          <span className="text-white text-2xl">
                            {readableBUSD(userdeposit,2) }{" "}
                            BUSD
                          </span>
                        </li>
                        <li>
                        Miners:{" "}
                          <span className="text-white text-2xl">
                            {miner} miners
                          </span>
                        </li>
                        <li>
                        Expected profit:{"  "}
                          <span className="text-white text-2xl">
                            {readableBUSD(minerBUSD/2,2)}{' '}BUSD/Daily 
                          </span>
                        </li>
                        <li>
                          Withdrawals:{"  "}
                          <span className="text-white text-2xl">
                          {readableBUSD(totalWithdrawn,2) }{" "} BUSD
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>


              {/* {!registeredStatus ? ( */}
                <Card title="Hire Miners">
                  <div className="flex flex-col pt-8 px-2">
                    <div className="text-center pb-4">
                      <span className="text-lg text-gray-400">
                       Initial Deposit:{" "}
                      </span>
                      <span className="text-white text-3xl">
                        {readableBUSD(initialdeposit,1) }
                      </span>
                      <span className="text-white text-2xl ml-2">BUSD</span>
                    </div>
                    <div className="text-center pb-4">
                      <span className="text-lg text-gray-400">
                       My wallet:{" "}
                      </span>
                      <span className="text-white text-3xl">
                        {readableBUSD(balance,2)}
                      </span>
                      <span className="text-white text-2xl ml-2">BUSD</span>
                    </div>
                    <span className="text-lg text-gray-400">
                     My Approve:{' '}{readableBUSD(approved,1)}{' '}BUSD
                    </span>
                     {/* APPROVE AMOUNT TRANSFER */}
                    <div className="rounded-md border-b-2  border-primary mb-6 p-2 flex justify-between items-center">
                      <input
                        type="number"
                        placeholder="Approve BUSD"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="text-white font-extrabold flex-shrink text-2xl w-full bg-transparent focus:outline-none  focus:text-white px-2"
                      />
                      <Button
                        onClick={() => approvebusd()}
                        className="flex flex-row items-center w-48 justify-center"
                      >
                        {stakeLoading ? (
                          <Spinner size={30} />
                        ) : (
                          <>
                            {/* <img src="/images/unlocked.svg" width="25" alt="" /> */}
                            <span className="w-16">Aprove</span>{" "}
                          </>
                        )}
                      </Button>
                      
                    </div>
                    <span className="text-lg text-gray-400">
                     Deposit to buy miners:
                    </span>
                    {/* DEPOSI TO POOL */}
                    <div className="rounded-md border-b-2  border-primary p-2 flex justify-between items-center">
                      <input
                        type="number"
                        placeholder="BUSD To Stake"
                        value={amountDeposit}
                        onChange={(e) => setAmountDeposit(e.target.value)}
                        className="text-white font-extrabold flex-shrink text-2xl w-full bg-transparent focus:outline-none  focus:text-white px-2"
                      />
                      <Button
                        onClick={() => deposit()}
                        className="flex flex-row items-center w-48 justify-center"
                      >
                        {depositLoading ? (
                          <Spinner size={30} />
                        ) : (
                          <>
                            {/* <img src="/images/locked.svg" width="25" alt="" /> */}
                            <span className="w-16">STAKING</span>{" "}
                          </>
                        )}
                      </Button>
                    </div>

       
                  </div>
                </Card>
      
             
              <Card title="Earnings">
                <div className="flex flex-col pt-6 pb-2 px-2">
                  <div className="text-center pb-3">
                    <span className="text-white text-5xl">
                      {readableBUSD(earning,3)}
                      
                    </span>
                    <span className="text-white text-2xl ml-2">BUSD</span>
                  </div>
                  
                  <div className="text-center text-white text-2xl mt-1 mx-2">
                   
                    <div>
                        <span className="text-gray-400 text-lg ">
                        Miners will be full in:{" "}
                        </span>
                        00:00:00
                      </div>
               
                    
                    <div>
                     
             
                      <div>
                        <span className="text-gray-400 text-lg">
                         Compound Count:
                        </span>{" "}
                        {dailyCompoundBonus}{' '}Times
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-center">
                    
                    </div>
                  <div className="flex flex-row justify-center">
                  <Button
                      type="submit"
                      className="flex flex-row items-center justify-center w-225 ml-4 px-3 "
                      onClick={() => reinvest()}
                    >
                      {reinvestLoading ? (
                        <Spinner size={30} />
                      ) : (
                        <>
                          {/* <img src="/images/unlocked.svg" width="25" alt="" /> */}
                          <span className="w-225">COMPOUND (+{bonus/10}% bonus)</span>{" "}
                        </>
                      )}
                    </Button>
                    <Button
                      type="submit"
                      className="flex flex-row items-center justify-center w-225 ml-4 px-3"
                      onClick={() => withdraw()}
                    >
                      {withdrawLoading ? (
                        <Spinner size={30} />
                      ) : (
                        <>
                          {/* <img src="/images/unlocked.svg" width="25" alt="" /> */}
                          <span className="w-225">WITHDRAW 
                         
                          -80%Tax</span>{" "}
                        </>
                      )}
                    </Button>
                  </div>
                        <div>
                        <span className="text-gray-400 text-lg">
                  Time until next hire bonus is activated: 00:00:00</span>
                          </div>
                          <div>
                        <span className="text-gray-400 text-lg">
                  Time until next Withdraw : 00:00:00</span>
                          </div>
                  <div>
                 
                        <span className="text-gray-400 text-lg">
                        Every time you hire or re-hire Miners after the time interval, the compound counter will increase and your
            hire bonus grows by {' '}{bonusMax*(bonus/10)}{'%'} (max +{bonusMax}%). Withdraw will reset your bonus to 0
                        </span>
                       
                      </div>
                </div>
              </Card>
              
              <Card title="Referral" >
                <div className="flex flex-col pt-8 px-2 mb-6">
                <div className="text-center text-white text-2xl mt-1 mx-2">
                     <div>
                       <span className="text-gray-400 text-lg">
                       Referral Rewards:{" "}
                       </span>
                       {readableBUSD(referralRewards,1) } BUSD
                     </div>
                     
                   
                   <div>
                    
                     <div>
                       <span className="text-gray-400 text-lg">
                         Referral user:
                       </span>{" "}
                       {referralCount}
                     </div>
                
                   </div>
                 </div>
                  <div className="text-center pb-4">
                    <span className="text-lg text-gray-400">
                     <p>{myreflink}</p> 
                     <p>{accounts[0].replace(accounts[0].substring(5, 39), "***")}</p>
                    </span>
                    <span className="text-lg text-gray-400">
                    Earn {refPercent/10}% when someone uses your referral link!
                      </span>
                  </div>
                 
            
                    <Button
                    onClick={copyToClipboard}
                      className="flex flex-row items-center w-48 justify-center"
                    >
         
                     {copied ? copySuccess()&& "Copied!" : "Copy"}
                    </Button>
                  
                </div>
              </Card>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;

