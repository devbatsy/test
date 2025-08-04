const { Squid } = require("@0xsquid/sdk");
const { BotLimits } = require("../utils/botUiAssets");
const squidAssets = {
    squidLib:null,
    chainsUtils:null,
    tokenUtils:null,
    isSquidInstantiated:false
}

class instantiateSquidChains{
    constructor(chainsArr)
    {
        this.axelarNames = group_func(chainsArr.map(chain =>{return chain.axelarChainName}));

        this.chainID = new Object();

        this.chainNames_ID = new Object();

        chainsArr.forEach(chain =>{
            this.chainID[`${chain.axelarChainName}`] = chain.chainId;

            this.chainNames_ID[`${chain.chainId}`] = chain.axelarChainName;
        });


    }
}

class instantiateSquidTokens{
    constructor(tokenArr)
    {
        console.log(`Number of supported tokens: ${tokenArr.length}`);
        
        this.token_chain = (() =>{
            const mainObj = {};
            tokenArr.forEach(token =>{
                if(!mainObj[`${token.chainId}`])
                {
                    mainObj[`${token.chainId}`] = new Array();
                }

                mainObj[`${token.chainId}`].push(
                    {
                        name:token.name,
                        adx:token.address,
                        chainId:`${token.chainId}`,
                        usdPrice:token.usdPrice,
                        symbol:token.symbol
                    }
                )
            })

            return mainObj;
        })();

        (() =>{
            Object.keys(this.token_chain).forEach(chainsID =>{
                this.token_chain[chainsID] = group_func(this.token_chain[chainsID]);
            })
        })();

        // console.log(this.token_chain)
    }
}

const getSDK = async () =>{
    const squid = new Squid({
    baseUrl: "https://v2.api.squidrouter.com",
    integratorId: "tg_bot_swap-97e299b2-fe83-45cf-8321-bec1a077c17c"
    });

    squidAssets.squidLib = squid;

    await squidAssets.squidLib.init();

    squidAssets.isSquidInstantiated = true;
    
    squidAssets.chainsUtils = new instantiateSquidChains(squid.chains);

    squidAssets.tokenUtils = new instantiateSquidTokens(squid.tokens);
};

const getSquid = () => squidAssets.squidLib;


function group_func(arr)
{
    const rawLogits = arr.length / BotLimits.btnLimit;

    const containers_size = Math.floor(rawLogits) < rawLogits ? Math.floor(rawLogits) + 1 : Math.floor(rawLogits);

    const container = [];

    (() =>{for(let i = 0; i < containers_size; i++){container.push([])}})();

    for(let i = 0; i < arr.length; i+=containers_size)
    {
        for(let j = 0; j < containers_size; j++)
        {
            if(arr[i + j])
            {
                container[j].push(arr[i + j]);
            }
        }
    }

    return container
}


module.exports = {
    getSquidSdk:getSDK,
    getSquid,
    getSquidChains:() => squidAssets.chainsUtils,
    getSquidTokens:() => squidAssets.tokenUtils,
    isSquidInstantiated:() => squidAssets.isSquidInstantiated
}