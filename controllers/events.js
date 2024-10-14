const { response } = require("express");
const Event = require("../models/Event")

const getEvents = async(req, res= response) => {

    const events = await Event.find().populate('user', 'name');

    return res.json({
        ok: true,
        events
    })   
}

const createEvent = async(req, res = response) => {

    const evento = new Event( req.body );
    try{
        evento.user = req.uid;
       const eventSaved = await evento.save();
        return res.json({
            ok: true,
            msg: 'createEvent',
            eventSaved
        }) 
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al registrar el evento'
        });
    }
}

const updateEvent = async(req, res = response) => {

    const eventId = req.params.id;
    const {uid} = req;
    try{
        const event = await Event.findById(eventId);

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento'
            });
        }

        if(event.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No autorizado'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, {new: true} );

        return res.json({
            ok: true,
            evento: eventUpdated
        })  
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el evento'
        });
    } 
}

const deleteEvent = async(req, res = response) => {
    

    const eventId = req.params.id;
    try{
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento'
            });
        }

        if(event.user.toString() !== req.uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No autorizado'
            });
        }

        const eventDeleted = await Event.findByIdAndDelete( eventId );

        return res.json({
            ok: true,
            eventDeleted
        })  
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el evento'
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}