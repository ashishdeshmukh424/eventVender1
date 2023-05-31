import database from "../data/database";
import { decryptDetails } from "../utils/crypto/decrypt";
export async function matchCardAndAccountNumber(cleanedParagraph, userId) {
  try {

    const accnos = cleanedParagraph.replace(/( )/g, "").match(/\*{3}\d{4}/g);

    if(accnos.length === 0) return false;
    const TrnAccountDetails = await database.TrnAccounts.getAllByUser({UserId:userId});
    let isMatchWithDetails = false;

    for(let i=0; i< TrnAccountDetails.length ; i++){
    const decAccountNumber = decryptDetails(TrnAccountDetails[i].AccountNum)
    const decrCardNumber = decryptDetails(TrnAccountDetails[i].CardNum)
    let isExist = false;
    if(TrnAccountDetails[i].AccountNum && TrnAccountDetails[i].CardNum) {
      isExist = accnos.find((num) => num.slice(-4) === decAccountNumber.slice(-4) || num.slice(-4) === decrCardNumber.slice(-4));
    } else if(TrnAccountDetails[i].AccountNum && !TrnAccountDetails[i].CardNum) {
      isExist = accnos.find((num) => num.slice(-4) === decAccountNumber.slice(-4));
      if(isExist) isMatchWithDetails = true
    }else if(!TrnAccountDetails[i].AccountNum && TrnAccountDetails[i].CardNum) {
      isExist = accnos.find((num) => num.slice(-4) === decrCardNumber.slice(-4));
      if(isExist) isMatchWithDetails = true
    }

    }
    return isMatchWithDetails;
  }catch(error){
  console.log('🚀 ^~^ - error:', error)

  }
}