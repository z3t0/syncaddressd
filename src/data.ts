import * as res1 from "../res/1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F.json";

import fs from "fs"


export function getRes1() {return res1 }

interface AddressInfo { balance: number; transactions: []}

let _db: any

function db() {
  if (!_db) {
    try {
      const persisted = fs.readFileSync('db.json', 'utf8')
      _db = JSON.parse(persisted)
      console.log('loaded db.json')
    }
    catch (err) {
      console.log('err reading db.json')
      console.log(err)
      _db = {}
      persistDb()
    }
  }

  return _db
}

async function getAddressInfo(address: string) : Promise<AddressInfo> {
  if (db().hasOwnProperty(address)) {
    console.log('hit')
    return db()[address] as AddressInfo
  }
  else {
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


    db()[address] = info

    console.log('saved: ' + address)
    console.log(info)

    return info
  }
}
function persistDb() {
  console.log('writing to db.json')
  fs.writeFileSync('db.json',
                   JSON.stringify(db()),
                   'utf-8')
  console.log('writing done to db.json')
}

function initDbPersist() {
  setInterval(persistDb, 30000)
}


initDbPersist()

// todo: load db from disk on start
// todo: save db to disk periodically

async function getBalance(address: string) {
  // Check if we have the address cached
  const info = await getAddressInfo(address)
  return info.balance
}

const Service = { getBalance }

export { Service } 