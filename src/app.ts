import express from 'express';
import cors from 'cors';
import heartbeatRouter from './routes/heartbeat';
import runningSinceRouter from './routes/runningSince';
import usersRouter from './routes/users';
import downtimes from './routes/downtimes';
import checkServers from './routes/checkServers';
import trackingSince from './routes/trackingSince';
import bodyParser from 'body-parser';
import fs from 'fs';
import http from 'http';
import https from 'https';

const app = express();

const corsOptions = {
    origin: ['http://discord-lurker.com', 'https://discord-lurker.com'], 
    optionsSuccessStatus: 200
};
// deploytest2
app.use(cors(/*corsOptions*/));

app.use(bodyParser.json());

app.use(heartbeatRouter);
app.use(runningSinceRouter);
app.use(usersRouter);
app.use(downtimes);
app.use(checkServers);
app.use(trackingSince);

app.get('/secret', (req, res) => {
    fs.readFile('not_a_secret.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('error: Fehler beim Lesen der Datei :(');
            return;
        }
        res.send(data);
    });
});

const httpServer = http.createServer(app);
const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/archive/discord-lurker.com/privkey1.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/archive/discord-lurker.com/cert1.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/archive/discord-lurker.com/chain1.pem')
};
const httpsServer = https.createServer(httpsOptions, app);

httpServer.listen(3080, () => {
    console.log('HTTP-Server lauscht auf Port 3080');
});

httpsServer.listen(3000, () => {
    console.log('HTTPS-Server lauscht auf Port 3000');
});
