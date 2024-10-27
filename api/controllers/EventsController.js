import { EventModel } from "../models/EventsModel.js";

export default {
    createEvent: async (req, res) => {
        try {
            const metrics = req.body.metrics;

            if (!Array.isArray(metrics)) {
                return res.status(400).json({ msg: "Metrics no es un array" });
            }

            if (metrics.length === 0) {
                return res.status(400).json({ msg: "Metrics está vacío" });
            }

            const incomplete = metrics.filter(
                (metric) => !metric.description || !metric.max_points
            );

            if (incomplete.length > 0) {
                return res.status(400).json({ msg: "Metrics está incompleto" });
            }

            const invalidMetrics = metrics.filter(
                (metric) =>
                    metric.description.trim().length === 0 || metric.max_points <= 0
            );

            if (invalidMetrics.length > 0) {
                return res.status(400).json({ msg: "Metrics contiene métricas inválidas" });
            }

            const event = {
                name: req.body.name,
                metrics,
                max_round: req.body.max_round,
            };

            await EventModel.create(event);
            res.status(201).json({ msg: "Evento creado con éxito" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error al crear el evento" });
        }
    },
};
