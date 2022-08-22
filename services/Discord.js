class Discord extends Service
{
    async prepareUserSession(apiKey) {
        await client.login(apiKey);
        return client;
    }

    async sendDirectMessage(params) {
        const authorApiKey = params.apiKey ?? null;
        const recieverId = params.reciever ?? null;
        const message = params.message ?? null;
        if (
            !authorApiKey
            || !recieverId
            || message
        ) {
            return false;
        }

        if (params.delay) {
            this._delay(params.delay);
        }

        this.#sessions[authorApiKey].users.fetch(recieverId, false).then((user) => {
            user.send(message)
                .then(() => {
                    console.log(
                        'Message ' + message +
                        ' send to ' + recieverId +
                        ' from ' + authorApiKey
                    );
                })
                .catch(() => {
                    console.log(
                        'Message ' + message +
                        ' FAILED to send to ' + recieverId +
                        ' from ' + authorApiKey
                    );
                })
            ;
        });
    }
}