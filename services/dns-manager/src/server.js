const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Service "dns-manager" started listening on 3000 port.');
});
