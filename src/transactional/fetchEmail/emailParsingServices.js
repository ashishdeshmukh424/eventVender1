
//return JSON object having tokens for parsing email
exports.getTokenToParseEmail = function () {
    // logger.info('Fetching the emails having gmail provider');
    return new Promise((resolve, reject) => {
        //Creating token for  reading email
        UserToken.findAll({
            raw: true,
            where: { Provider: 'Gmail', IsDeleted: false }
        }).then(result => {
            resolve(result);
        }).catch(err => {
            reject();
        });
    });
}
