const formatedMail = (rawMail) => {
//Email String
// const rawMail = `[Investec Bank Limited]<http://www.investec.com> [Investec Bank Limited] Dear MR DOVE A purchase has been authorised on your Investec card ending 1122 for ZAR79.00 at Amazon on 04/03/2023. Your available balance is R79,000.11. If you require any further assistance, please contact 
// our Client Support Centre on 0860 110 161 or +27 11 286 9663. Regards Investec Private Banking [http://communication.investecprivatebank.co.za/Marketing/cardfinance/Footer_NonCI.JPG] Investec Specialist Bank, a division of Investec Bank Limited registration number 1969/004763/06. Investec Specialist Bank is committed to the Code of Banking Practice as regulated by the Ombudsman for Banking Services. Copies of the Code and the Ombudsman's details are available on request or visit www.investec.co.za<http://www.investec.co.za>. A registered credit provider registration number NCRCP9. Disclaimer This e-mail and any attachments thereto may contain confidential and proprietary information. This e-mail is intended for the addressee only and should only be used by the addressee for the related purpose. If you are not the 
// intended recipient of this e-mail, you are requested to delete it immediately. Any disclosure, copying, distribution of or any action taken or omitted in reliance on this information is prohibited and may be unlawful. The views expressed in this e-mail are, unless otherwise stated, those of the sender and not those of the Investec Group of Companies or its management. E-mails cannot be guaranteed to be secure or free of errors or viruses. No liability or responsibility is accepted for any interception, corruption, destruction, loss, late arrival or incompleteness of or tampering or interfering with any of the information contained in this e-mail or for its incorrect delivery or non-delivery or for its effect on any electronic device of the recipient. For more information on the Investec Group of Companies see www.investec.com<https://www.investec.co.za/>.`;


let modifiedString = null;

// Regular expression pattern to match image links
const imageRegex = /\[http[^\]]+\]/g;
// Regular expression pattern to match hyperlinks
const hyperlinkRegex = /https?:\/\/\S+/gi;
// Regular expression pattern to match copyright warnings
const copyrightRegex = /(?:disclaimer|never ask for|never ask you for|registration number)\b[\s\S]*/gi;
// Regular expression pattern to match the rawMail stating "If you are unable to view this message"
const viewMessageRegex = /If you are unable to view this message| if you have any queries,*$/;
// Regular expression pattern to match salutations
const salutationRegex = /(Many thanks|Your's sincerely|Thanks and Regards|Kind regards|Best regards|Regards|Yours sincerely|Yours faithfully|Warm regards|Sincerely|Thank you|With appreciation|Have a great day|All the best|Take care|Wishing you well|Trusting this finds you well|Looking forward to your response|With gratitude|With thanks|Hoping for a prompt reply|Have a wonderful day|Best wishes|With kind regards|With warmest regards|Yours respectfully|With appreciation and gratitude|Best wishes for your financial goals|Wishing you financial success|Thank you for banking with us|Have a prosperous day|With highest regards|Sincerely yours|With kindest regards and appreciation|We value your business|Best regards and continued support|With great respect and admiration|Hoping to serve you again soon|With sincere gratitude for your loyalty|Trusting our service meets your expectations|Wishing you financial peace of mind|Thank you for your continued trust|With utmost professionalism and care|Thank you for your support,|With appreciation,|Warm regards,|Wishing you wellness and financial success,|Have a great day,|Looking forward to assisting you further,|Thank you for your business,|Wishing you continued financial growth,|Have a successful day).*$/i;
// Remove hyphens and backticks
const hypensBackticksRegex = /[-_`]/g;
// Remove content between < and >
const hyperlinkTags = /<[^>]+>/g;
// Remove [Image] or [image]
const squareBrackets  = /\[[^\]]*\]/g;
// Remove queriesRegex
const queriesRegex = /(if you have |if you need any assistance|If you require any)\b[\s\S]*/gi;


modifiedString = rawMail.replace('`',"'").replace(imageRegex, '').replace(copyrightRegex, '').replace(viewMessageRegex, '').replace(salutationRegex, '')
.replace(hypensBackticksRegex,'').replace(hyperlinkTags,'').replace(squareBrackets, '').replace(hyperlinkRegex,'').replace(queriesRegex,'');

// Filtered String
const strippedString = modifiedString;

return strippedString


}

export default formatedMail;

