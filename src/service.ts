import { getDb } from "./db";

interface AddressInfo { balance: number; transactions: []}

async function getAddressInfoFromBlockchainCom(address: string) : Promise<AddressInfo> {
  const blockchainServiceUrl = "https://blockchain.info"

  const url = `${blockchainServiceUrl}/rawaddr/${address}`
  const res = await fetch (url)

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}, Status Text: ${res.statusText} for GET ${url}`);
  }

  const body = await res.json()
  if (body['error']) { throw new Error("failed to get info :" + address) }

  const info: AddressInfo = { balance: body.final_balance,
                              transactions: body.txs}

  return info
}

async function getAddressInfo(address: string) : Promise<AddressInfo> {
  if (getDb().hasOwnProperty(address)) {
    console.log('hit')
    return getDb()[address] as AddressInfo
  }
  else {
    console.log('miss: ' + address)

    getDb()[address] = getAddressInfoFromBlockchainCom(address)

    console.log('saved: ' + address)

    return getDb()[address] 
  }
}

// Rough idea
function syncAddresses() {

  function deepCopy(obj: any) : any {
    const json = JSON.stringify(obj)
    const copy = JSON.parse(json)

    return copy
  }
  // deep clone db
  const dbCopy = deepCopy(getDb())

  // get all addresses
  const addresses = Object.keys(dbCopy)

  // get new data for addresses

  // use rate limit to avoid being blocked

  // save it back, but use spread to keep new entries since sync
  // operation started.

}


async function getBalance(address: string) {
  const info = await getAddressInfo(address)
  return info.balance
}

async function getTransactions(address: string) {
  const info = await getAddressInfo(address)
  return info.transactions
}

const Service = { getBalance, getTransactions }

export { Service } 