module.exports = class Service {
    #sessions = [];
    #userDataPool;

    constructor(userData) {
        this.#userDataPool = userData;

        this.#userDataPool.forEach((user) => {
            const userSession = this.prepareUserSession(user.id, user);
            this.setUserSession(user.id, userSession);
        });

    }

    _delay(delayObj) {
        const toMilliseconds = (hrs, min , sec) => (hrs * 60 * 60 + min * 60 + sec) * 1000;
        setTimeout(toMilliseconds(
            delayObj.hours ?? 0,
            delayObj.minutes ?? 0,
            delayObj.seconds ?? 0,
        ));
    }

    prepareUserSession(userId, userData) {

    }

    setUserSession(userid, userSession) {
        this.#sessions[userid] = userSession;
    }


    getUserSession(userId) {
        return this.#sessions[userId] ?? null;
    }

    sendByPattern(pattern) {
        for (messageNode of pattern) {
            this.processMessageNode(messageNode);
        }
    }

    async processMessageNode(node, parentMessageId = null) {
        for (messageObj of node) {
            if (
                messageObj.message
                && messageObj.author
            ) {
                if (!this.#sessions) {
                    const userSession = this.prepareUserSession();
                    if (userSession) {
                        this.setUserSession(this.prepareUserSession());
                    }
                }

                if (messageObj.delay) {
                    this._delay(messageObj.delay);
                }

                if (parentMessageId) {
                    messageObj.parentMessageId = parentMessageId;
                    const messageId = this.replyToMessage(messageObj);
                } else {
                    const messageId = this.sendMessage(messageObj);
                }

                if (messageId && node.replies) {
                    for (replyMessageNode of node.replies) {
                        this.processMessageNode(replyMessageNode, messageId);
                    }
                }
            }
        }
    }

    sendMessage(messageParams) {}

    replyToMessage(messageParams) {}

    createPost(params) {}

    sendDirectMessage(params) {}

    fetchUserId() {}

    likeMessage(params) {}
}

