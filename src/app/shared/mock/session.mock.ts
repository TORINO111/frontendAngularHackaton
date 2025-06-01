import { Session } from "../models/session.model"
import { User } from "../models/user.model"
import { MOCK_COURS } from "./cours.mock"

export const MOCK_SESSION: Session[] = [
    {
        id: 1,
        heureDebut: "2024-05-27T08:00:00",
        heureFin: "2024-05-27T12:30:00",
        coursId: MOCK_COURS[0].id
    },
    {
        id: 2,
        heureDebut: "2024-05-27T13:00:00",
        heureFin: "2024-05-27T17:00:00",
        coursId: MOCK_COURS[2].id
    },

]