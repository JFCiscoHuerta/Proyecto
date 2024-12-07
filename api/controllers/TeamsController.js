

import { TeamModel } from "../models/TeamsModel.js";
import {EventModel} from "../models/EventsModel.js"

export default{
    createTeam: async (req,res) => {
        try{
            const team = {
                name: req.body.name,
                id_members: req.body.id_members,
                leader: req.body.id_leader,
    
            };
            await TeamModel.create(team);
            return res.status(201).json({msg:"Grupo creado con exito"});
        } catch(error) {
            console.error
            return res.status(500).json({msg: "Ocurrio un error al guardar el equipo"});
        }
    },
    registerEvent: async (req,res) => {
        try {
            const idTeam = req.params.id;
            const group = await TeamModel.findById(idTeam);
            if(!group) {
                return res.status(400).json({msg: "El equipo no existe"});
            }
            const idEvent = req.params.idEvent;
            const event = await EventModel.findById(idEvent);
            if(!event) {
                return res.status(400).json({msg: "El evento no existe"});
            }

             await EventModel.findByIdAndUpdate(idEvent, {
                $push: {
                    "groups": idTeam
                }
             })
             return res.status(201).json({msg: "Se inscribio el equipo al evento correctamente!"})
        } catch(error) {
            return res.status(500).json({msg: "Fallo al registrar evento"})
        }
    },

    
    getTeams: async (req, res) => {
        try {
            const teams = await TeamModel.find();
            return res.status(200).json(teams)
        } catch (error) {
            res.status(500).json({msg: "Ocurrio un error al obtener los teams"})
            console.log(error)
        }
    }
}