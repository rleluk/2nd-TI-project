const mongodb = require('./config/mongodb');
const app = require('./app');

app.set('port', process.env.PORT || 41237);

mongodb.connect(() => {
    const server = app.listen(app.get('port'), () => {
        console.log(`Listening on ${ server.address().port }`);
    });
});