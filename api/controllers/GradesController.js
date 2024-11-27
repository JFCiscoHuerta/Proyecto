import { EventModel } from "../models/EventsModel.js";
import { GradesModel } from "../models/GradesModel.js";
import { TeamModel } from "../models/TeamsModel.js";

export default {

    createGrade: async (req, res) =>  {
        try {
            const idTeam = req.params.idTeam;
            const group = await TeamModel.findById(idTeam);
            if(!group) {
                return res.status(400).json({msg: "Grupo no encontrado"})
            }

            const round = req.body.round;
            if(!round) {
                return res.status(400).json({msg: "Round es invalida"})
            }

            const idEvent = req.body.idEvent;
            const event = await EventModel.findById(idEvent);
            if(!event) {
                return res.status(400).json({msg: "Evento no encontrad"})
            }
            
            if(!event.groups.includes(group._id)){
                return res.status(400).json({msg: "NO hay correlacion entre el grupo y el evento"})
            }
            const gradesFromDb = await GradesModel.findOne({id_event:event._id, round:round, id_group:group._id})
            if (!gradesFromDb) {
                return res.status(404).json({ msg: "No se encontraron calificaciones para el evento, ronda y grupo dados." });
            }            
            gradesFromDb.grades.filter((grade) => {
                grade.id_judge == req.body.id_judge
            })

            const grades = req.body.grades;

        } catch(error) {}
    }

}