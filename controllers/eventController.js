const Event = require('../models/events');

const listEvents = async (req,res) => {
    const events = await Event.findAll();
    res.status(200).send(events);
}

const searchByKey = async (req,res) => {
    const event = await Event.findByPk(req.params.id);
    if(!event) {
        res.status(404).send({err: 'Evento não encontrado'});
        return;
    }
    res.status(200).send(event);
}

const saveEvent = async (req,res) => {
    try {
        const event = await Event.create(req.body);
        if (event) res.status(201).send({message: 'Evento criado'});
    } catch(error) {
        res.status(400).send({err: `Falha ao Salvar! Erro: ${error}`});
    }    
}

const deleteEvent = async (req,res) => {
    const event = await Event.findByPk(req.params.id);
    if(!event){
        res.status(404).send({err: 'Evento não encontrado'});
        return;
    }
    await event.destroy();
    res.status(200).send({message: `Evento ${req.params.id} excluído`});
}

const updateEvent = async (req,res) => {
    const event = await Event.findByPk(req.params.id);
    if(!event) {
        res.status(404).send({err: 'Evento não encontrado'});
        return;
    }
    event.set(req.body);
    await event.save();
    res.status(200).send({message: 'Atualizado'});
    
}

module.exports = {
    listEvents,
    searchByKey,
    saveEvent,
    deleteEvent,
    updateEvent
};