
// obtener eventos

const {Router} = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const router = Router();

router.use(validarJWT);

router.get('/',getEvents);
router.post('/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ], createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);


module.exports = router