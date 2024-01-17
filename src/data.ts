import { getDb } from "./db";

interface AddressInfo { balance: number; transactions: []}

async function getAddressInfo(address: string) : Promise<AddressInfo> {
  if (getDb().hasOwnProperty(address)) {
    console.log('hit')
    return getDb()[address] as AddressInfo
  }
  else {
    throw new Error("miss")
    
    console.log('miss: ' + address)

    const blockchainServiceUrl = "https://blockchain.info/"

    const res = await fetch (`${blockchainServiceUrl}/rawaddr/${address}]`)

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}, Status Text: ${res.statusText}`);
    }

    const body = await res.json()
    if (body['error']) { throw new Error("failed to get info :" + address) }

    const info: AddressInfo = { balance: body.final_balance,
                                transactions: body.txs}


    getDb()[address] = info

    console.log('saved: ' + address)
    console.log(info)

    return info
  }
}

async function getBalance(address: string) {
  const info = await getAddressInfo(address)
  return info.balance
}

const Service = { getBalance }

export { Service } 