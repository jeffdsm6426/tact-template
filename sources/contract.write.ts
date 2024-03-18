import { Address, contractAddress, toNano } from "@ton/core";
import { TonClient4, WalletContractV4 } from "@ton/ton";
import {Add, Minus, Multiply, Divide, SampleTactContract} from "./output/sample_SampleTactContract";
import { mnemonicToPrivateKey } from "@ton/crypto";

const Sleep = (ms: number)=> {
    return new Promise(resolve=>setTimeout(resolve, ms))
}

(async () => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });

    // open wallet v4 (notice the correct wallet version here)
    const mnemonic = "engine civil gun clinic enrich kiss garden clown second sponsor giggle year neglect month fix diamond abstract patrol kid awake tortoise random reopen source"; // your 24 secret words (replace ... with the rest of the words)
    const key = await mnemonicToPrivateKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
    
    // open wallet and read the current seqno of the wallet
    const walletContract = client.open(wallet);
    const walletSender = walletContract.sender(key.secretKey);

    // open the contract address
    let owner = Address.parse("0QDojPyVulj6TcWvEd3E3-DLIyXbfRrU15-70xM0lVnqgzPO");
    let init = await SampleTactContract.init(owner);
    let contract_address = contractAddress(0, init);
    let contract = await SampleTactContract.fromAddress(contract_address);
    let contract_open = await client.open(contract);

    // send message to contract
    console.log("Ori Counter Value: " + (await contract_open.getCounter()));

    // console.log("Increment");
    // await contract_open.send(walletSender, { value: toNano(1) }, "increment");
    // console.log("Counter Value: " + (await contract_open.getCounter()));
    
    // console.log("Decrement");
    // await contract_open.send(walletSender, { value: toNano(1) }, "decrement");
    // console.log("Counter Value: " + (await contract_open.getCounter()));
    let i = Math.floor(Math.random() * 4);
    console.log(i)
    switch (i){
        case 0:
            console.log("Add");
            await contract_open.send(walletSender, { value: toNano(1) }, {$$type: 'Add', amount: 2n} as Add);
            break; 
        case 1:
            console.log("Minus");
            await contract_open.send(walletSender, { value: toNano(1) }, {$$type: 'Minus', amount: 2n} as Minus);
            break; 
        case 2:
            console.log("Multiply");
            await contract_open.send(walletSender, { value: toNano(1) }, {$$type: 'Multiply', amount: 10n} as Multiply);
            break; 
        case 3:
            console.log("Divide");
            await contract_open.send(walletSender, { value: toNano(1) }, {$$type: 'Divide', amount: 2n} as Divide);
            break; 
    }

    await Sleep(20000);
    console.log("Counter Value: " + (await contract_open.getCounter()));


})();