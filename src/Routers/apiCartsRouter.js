import { Router } from 'express';

let apiCartsRouter = Router();
export default apiCartsRouter;

apiCartsRouter.get('/', (req, res) => {
    res.send('<h1>Hola</h1>');
});
