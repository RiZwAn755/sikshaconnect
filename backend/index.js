// for app.listen
import './config/db.js'
import app from './server.js';

app.listen(3000, () => {
    console.log("Server running on port 3000");
});