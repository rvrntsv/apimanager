const Reddit = require('./services/Reddit');

let redditService = new Reddit(require('./services/user_entries_reddit'));
let userSession = redditService.getUserSession(1);
userSession.getSubreddit('rap').find()
userSession.getSubreddit('rap').getHot().then((posts) => {
    console.log(posts)
    posts.map(post => {
        post.reply('Thanks').then(e => {
            console.log(e)
        });
    })
});
userSession.getHot().map(post => post.title)
    .then(e => {
        console.log(e);
    });

