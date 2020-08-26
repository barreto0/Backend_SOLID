import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();

//  http://localhost:3000/appointments

// SoC: Separation of Concerns
// Preocupação da rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

const appointmentsRepository = new AppointmentsRepository();

appointmentRouter.get('/', (req, res) => {
    const appointments = appointmentsRepository.all();

    return res.json(appointments);
});

appointmentRouter.post('/', (req, res) => {
    try {
        const { provider, date } = req.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(
            appointmentsRepository,
        );

        const appointment = createAppointment.execute({
            date: parsedDate,
            provider,
        });

        return res.json(appointment);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default appointmentRouter;
