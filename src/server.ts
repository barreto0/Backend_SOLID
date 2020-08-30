import './database';
import 'reflect-metadata';

import express from 'express';
import routes from './routes/index';

const app = express();
app.use(express.json());

app.use(routes);

const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`👁 👄👁  Server started on port: ${port}`);
});
