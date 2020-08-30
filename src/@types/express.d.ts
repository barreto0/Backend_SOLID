declare namespace Express {
    export interface Request {
        // anexa as informações abaixo à biblioteca original do express
        user: {
            id: string;
        };
    }
}
