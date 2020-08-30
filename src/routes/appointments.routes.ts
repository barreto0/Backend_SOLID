/* eslint-disable camelcase */
import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated); // todas as rotas usarão esse middleware

//  http://localhost:3000/appointments

// SoC: Separation of Concerns
// Preocupação da rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

// const appointmentsRepository = new AppointmentsRepository();

appointmentRouter.get('/', async (req, res) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return res.json(appointments);
});

appointmentRouter.post('/', async (req, res) => {
    try {
        const { provider_id, date } = req.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider_id,
        });

        return res.json(appointment);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default appointmentRouter;
