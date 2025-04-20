var crypto = require('crypto')

module.exports = {
    calculateSessionHash: function(accountId, sessionId, serverType, hourAdd) {
        /*
        var date = new Date()
        var hourDiff = date.getHours()
        var hourId = '1'
        var hourVal = hourDiff <= hourId ? hourId - hourDiff : (24 - (hourDiff - hourId))
        hourFinal = (hourVal + date.getHours()) % 24;
        console.log(hourFinal)
        */
        //hourAdd = 0
        // getUTCHours before...
        var finalHour = new Date().getHours()// + parseInt(hourAdd)
        if(finalHour === 24) {
            finalHour = 0
        }
        var data = accountId + '' + sessionId + '' + serverType + '' + finalHour
		return crypto.createHash('md5').update(data).digest('hex').substring(0, 27)
	}
}