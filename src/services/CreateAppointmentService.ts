import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';

// convenção de nomeação: execute/run; Você esta executando o serviço

// recebimento das informações
// tratativa de erros/exceções
// acesso ao repositório

// Dependency inversion (faz parte do SOLID), quando precisamos e uma depêndencia externa
// (no caso: appointmentsRepository), mas não podemos instanciar essa dependencia no service
// receberemos a dependência através do constructor da classe
interface RequestDTO {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ provider, date }: RequestDTO): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
            // return res
            //     .status(400)
            //     .json({ message: 'This appointment is already booked' });
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
