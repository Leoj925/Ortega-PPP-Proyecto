const validateUser= [
    body("nombre").trim().notEmpty().isAlpha().withMessage("Solo caracteres alfabéticos"),
    body("apellido").trim().notEmpty().isAlpha().withMessage("Solo caracteres alfabéticos"),
    body("fechaNacim").trim().notEmpty().isDate().withMessage("Solo formato fecha"),
    body("email").trim().notEmpty().isEmail().withMessage("Solo direcciones de email"),
    body("emailConfirm").trim().notEmpty().isEmail().custom((value, { req }) => {
        if (value !== req.body.email) {
            throw new Error('Los correos electrónicos no coinciden');
          }
          return true;
        }),
    body("password").trim().notEmpty().isLength(8).withMessage("Minimo 8 caracteres alfanumericos"),
    body("passwordConfirm").trim().notEmpty().isLength(8).custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
          }
          return true;
        })
];

module.exports (validateUser)