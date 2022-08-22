const snoowrap = require('snoowrap');

class Reddit extends require('./Service') {

    prepareUserSession(userId, userSessionData) {
        const clientId = userSessionData.clientId ?? null;
        const clientSecret = userSessionData.clientSecret ?? null;

        if (!clientId || !clientSecret) {
            return false;
        }

        return new snoowrap({
            userAgent: 'Reddit app',
            clientId: clientId,
            clientSecret: clientId,
            username: "satonysatony",
            password: "Tonysoprano02"
        });

    }

    async replyToMessage(params) {
        const userId = params.userId;

        if (!userId) {
            return false;
        }


    }
}

module.exports = Reddit;
