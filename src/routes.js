import userRouter from "./app/users/routes";
import app from "./config/express";

app.use('/api/v1/users', userRouter);



export default app;