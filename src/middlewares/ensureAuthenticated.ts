import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    // validação do token JWT
    // token vem pelo header da requisição

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('JWT token is missing');
    }

    // Bearer aksdkajsdjasdjaçlsdçasd

    const [type, token] = authHeader.split(' ');

    try {
        const tokenDecoded = verify(token, authConfig.jwt.secret);

        // sub contém o id do usuário autenticado

        const { sub } = tokenDecoded as TokenPayload;

        // queremos fazer o request persistir as informações de id do usuário para todas as outras rotas
        // já que inserimos o user dentro do request
        // a partir do momento que alguma rota utilizar esse middleware, dentro da rota vamos ter a informação do usuário
        request.user = {
            id: sub,
        };

        return next();
    } catch (err) {
        throw new Error('Invalid JWT token');
    }
}
