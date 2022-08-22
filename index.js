const Reddit = require('./services/Reddit');

let redditService = new Reddit(require('./services/user_entries_reddit'));
let userSession = redditService.getUserSession(1);
const authorname = userSession.getSubmission('2np694').author.name
authorname.then((value) => {
     console.log(value);
});
