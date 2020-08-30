import { Router } from 'express';

import CreateUsersService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const createUser = new CreateUsersService();

        const user = await createUser.execute({ name, email, password });

        delete user.password; // pra não mostrar a senha criada no body da resposta

        return res.json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default usersRouter;
