const { Squid } = require("@0xsquid/sdk");
const ethers = require("ethers");

const getSDK = () =>{
    const squid = new Squid({
    baseUrl: "https://v2.api.squidrouter.com",
    integratorId: "tg_bot_swap-97e299b2-fe83-45cf-8321-bec1a077c17c"
    });

    return squid
};

const amount = 10000000000000000;

(async () =>{
    try
    {
        const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth/0ee1f8179603a2cfc09d7598195d7c9e6f1832b7f0ae28c4ab9f2a91b4927406");

        const signer = new ethers.Wallet("0x07db6261633832d1a89f0c3fa333bfcd67ce1b47a24ec592545b46ea0bbaf79b" , provider); //dummy private key

        const squid = getSDK();

        await squid.init();

        console.log("squid initiated");

        const tokens = squid.tokens;

        const chains = squid.chains;

        // console.log(chains.map(val =>{return {name:val.chainId}}))

        tokens.forEach(val =>{
            if(val.chainId === "1") console.log(val.address)
        })

        console.log("non found")

        // const {route} = await squid.getRoute({
        //     toAddress:signer.address,
        //     fromAddress:signer.address,
        //     fromChain:"43114",
        //     fromToken:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        //     fromAmount:amount,
        //     toChain:"10",
        //     toToken:"0xEB466342C4d449BC9f53A865D5Cb90586f405215",
        //     slippage:1,
        // });

        // const tx = await squid.executeRoute({
        //     signer,
        //     route
        // });

        // const reciept = await tx.wait();

        // console.log(reciept)
    }catch(err)
    {
        if(err.response)
        {
            if(err.response.data)
            {
                if(err.response.data.message)
                {
                    console.log(err.response.data.message)
                }else console.log(err.response.data)
            }else console.log(err.response)
        }else console.log(err)
        
    }
});