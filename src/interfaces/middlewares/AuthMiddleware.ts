import { Request, Response, NextFunction } from 'express';
import { getAuth } from 'firebase-admin/auth';

export class AuthMiddleware {
    public static async isAuthenticated(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Token de autenticação não fornecido ou inválido! '});
        }

        const idToken = authHeader.replace(/^Bearer\s+/, "");

        if (!idToken) {
            return res.status(401).json({ error: 'Token de autenticação não fornecido ou inváiido' });
        }

        try {
            const decodedToken = await getAuth().verifyIdToken(idToken);

            req.user = {
                uid: decodedToken.uid,
                email: decodedToken.email || '',
                role: decodedToken.role || 'patient'
            };

            return next();
        }
        catch (error) {
            return res.status(401).json({ error: 'Acesso negado. Token inválido ou espirado.' });
        }
    }

    public static isRole(allowedRoles: ('patient' | 'caregiver')[]) {
        return(req: Request, res: Response, next: NextFunction) => {
            if (!req.user) {
                return res.status(401).json({ error: 'Usuário não autenticado. '});
            }

            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ error: 'Acesso proibido. Seu perfil não tem permissão para esta ação. '});
            }

            return next();
        };
    }
}