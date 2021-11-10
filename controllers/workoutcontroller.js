const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { LogModel } = require("../models");

router.post("/", validateJWT, async (req, res) => {
    let { description, definition, result } = req.body.log;
    let { id } = req.user;

    let logEntry = {
        description,
        definition,
        result,
        owner_id: id,
    };
    try {
        const workoutLog = await LogModel.create(logEntry);
        res.status(201).json({
            message: "Log successfully created",
            name: workoutLog,
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to create log",
        });
    }
});

router.get("/", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const entries = await LogModel.findAll({
            where: {
                owner_id: id,
            },
        });
        res.status(201).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/:id", validateJWT, async (req, res) => {
    const logId = req.params.id;
    const { id } = req.user;
    try {
        const userLogs = await LogModel.findAll({
            where: {
                id: logId,
                owner_id: id,
            },
        });
        res.status(200).json(userLogs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.put("/:id", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const logId = req.params.id;
    let userId = req.user.id;

    const query = {
        where: {
            id: logId,
            owner_id: userId,
        },
    };

    const updateLog = {
        description: description,
        definition: definition,
        result: result,
    };

    try {
        const update = await LogModel.update(updateLog, query);
        res.status(200).json({ update, message: "Log has been updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.delete("/:id", validateJWT, async (req, res) => {
    const userId = req.user.id;
    const logId = req.params.id;

    try {
        const query = {
            where: {
                id: logId,
                owner_id: userId,
            },
        };
        await LogModel.destroy(query);
        res.status(201).json({ message: "Log has been deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;