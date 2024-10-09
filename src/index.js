import dotenv from 'dotenv';

// load .env variables into process.env
dotenv.config();

import app from './routes';

import { converter, notFound, handler } from './utils/errorHandler';
import { connectDB } from './config/mongoose';

// connect mongodb
connectDB();

// if error is not an instanceOf APIError, convert it.
app.use(converter);

// catch 404 and forward to error handler
app.use(notFound);

// error handler, send stacktrace only during development
app.use(handler);

app.listen(process.env.PORT, () => {
    console.log(`Application running on port ${process.env.PORT}`);
});
