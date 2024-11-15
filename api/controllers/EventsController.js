import { EventModel } from "../models/EventsModel.js";
import { GradesModel } from "../models/GradesModel.js";
import { TeamModel } from "../models/TeamsModel.js";

const validateEvent = (metrics, name, max_round) => {

    const data = {
        isValid:false,
        msg: ""
    }

    if (!Array.isArray(metrics)) {
        data.msg = "Metrics no es un array"
        return data;
    }

    if (metrics.length === 0) {
        data.msg = "Metrics está vacío"
        return data;
    }

    const incomplete = metrics.filter(
        (metric) => !metric.description || !metric.max_points
    );

    if (incomplete.length > 0) {
        data.msg = "Metrics está incompleto";
        return data;
    }

    const invalidMetrics = metrics.filter(
        (metric) =>
            metric.description.trim().length === 0 || metric.max_points <= 0
    );

    if (invalidMetrics.length > 0) {
        data.msg = "Metrics contiene métricas inválidas";
        return data;
    }

    if (!name && !name.lenght) {
        data.msg = "El nombre del evento esta vacio";
        return data;
    }

    data.isValid=true
    return data;
}

export default {
    createEvent: async (req, res) => {
        try {
            const {metrics, name, max_round} = req.body;
            const {isValid, msg} = validateEvent(metrics, name, max_round);
            if(!isValid) {
                return req.status(400).json({msg})
            }
            
            const event = {
                name: name,
                metrics: metrics,
                max_round:max_round,
            };

            await EventModel.create(event);
            res.status(201).json({ msg: "Evento creado con éxito" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error al actualizar el evento" });
        }
    },

    updateEvent: async (req, res) => {
        try {
            const idEvent = req.params.id;
            const event = await EventModel.findById(idEvent);

            if (!event) {
                return res.status(400).json({msg: "El evento no existe"})
            }

            const {metrics, name, max_round} = req.body;
            const {isValid, msg} = validateEvent(metrics, name, max_round);
            if(!isValid) {
                return req.status(400).json({msg})
            }

            await EventModel.findByIdAndUpdate(idEvent, {
                $set: {
                    metrics,
                    name, 
                    max_round
                }
            })
            res.status(200).json({ msg: "Evento creado con éxito" });
            
        } catch(error) {
            console.error(error);
            return res.status(500).json({ msg: "Error al crear el evento" });
        }
    },

    changeStatus: async (req, res)=> {
        try {
            const idEvent = req.params.id;
            const event = await EventModel.findById(idEvent);
            if(!event) {
                return res.status(400).json({msg: "El evento no existe"})
            }
            if(!["pending","active","done"].includes(req.body.status.toLowerCase())){
                return res.status(400).json({msg: "El status incluido no es aceptable"})
            }
            await EventModel.findByIdAndUpdate(idEvent, {
                $set: {
                    status: req.body.status
                }
            })
            return res.status(200).json({msg: "Se actualizo el status del evento"})
        } catch(error) {
            return res.status(500).json({msg: "Error al actualizar el status del evento"})
        }
    },

    changeRound: async (req, res)=> {
        try {
            const idEvent = req.params.id;
            const event = await EventModel.findById(idEvent);
            if(!event) {
                return res.status(400).json({msg: "El evento no existe"})
            }
            const teamsPeerRound = req.query.maxTeams ? req.query.maxTeams : 5
            
            const {groups} = event;
            const teamsWithFinalGrade = [];
            for(const group of groups) {
                const gradesPerMetric = [];

                const {grades} = await GradesModel.findOne({id_event:event._id, id_group: group});
                const alreadyChecked = [];
                for (const grade of grades) {
                    const filteredGrades = grades.filter(item=>grade.id_metric === item.id_metric && !alreadyChecked.includes(grades.id_metric));
                    //let gradePerMetric = 0;

                    if (filteredGrades.lenght > 0) {
                        gradesPerMetric = filteredGrades.reduce((a,b)=>a.grade + b.grade);
                    }

                    if (!alreadyChecked.includes(grades.id_metric)){
                        alreadyChecked.push(filteredGrades[0].id_metric)
                        gradesPerMetric.push(
                            {
                                id_metric:grade.id_metric,
                                grade:gradesPerMetric / filteredGrades.lenght
                            })
                    }
                }

                const finalGrade = gradesPerMetric.reduce((a,b) => a.grade + b.grade)  / gradesPerMetric.lenght;

                teamsWithFinalGrade.push({
                    id_group:group,
                    finalGrade,
                    gradesPerMetric
                });
                
            }
            //Mayor a menor
            const sortedTeams = teamsWithFinalGrade.sort((a,b) => a - b);
            //Tomar la cantidad maxima de equipos
            const passedTeams = sortedTeams.slice(0, teamsPeerRound);
            //Actualizar la ronda de equipos y actualizar el arreglo 
            for (const team of passedTeams) {
                await TeamModel.findByIdAndUpdate(group.id_group,{
                    $set:{
                        roud:req.body.roud,
                    }
                });
            }
            const nextTeams = passedTeams.map((i)=>i.id_group);

            await EventModel.findByIdAndUpdate(event._id, {
                $set:{
                    groups:nextTeams,
                    round:req.body.roud
                }
            });

            return res.status(200).json({msg: "Se actualizo la ronda."});

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error al actualizar la ronda del evento" });
        }
    }

    
};
