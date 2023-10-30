import { Request, Response } from 'express';
import { db } from '../db/database';
import { User } from 'src/interfaces/User';

export class TrackingSinceController {
    public static handleTrackingSince(req: Request, res: Response): void {
        console.log('POST /trackingsince');

        const DC_LURKER_ID = "1160542994269741087"
        const { serverId } = req.body;

        db.get<User>(`SELECT joined_at FROM user_info WHERE user_id = ${DC_LURKER_ID} AND server_id = ${serverId} LIMIT 1`, (err, row) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error while querying trackingsince');
                return;
            }
            if (row) {
                const joinedAt = row.joined_at
                return res.json({ trackingSince: joinedAt });
            }

            res.json({ status: 'No Data /trackingsince' });
        });
    }
}
