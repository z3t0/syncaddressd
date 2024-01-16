import * as res1 from "../res/1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F.json";


export function getRes1() {return res1 }

function getBalance(address: string) {
  // FIXME: use hte address
  getRes1()['final_balance']
}

const Service = { getBalance }

export { Service } 