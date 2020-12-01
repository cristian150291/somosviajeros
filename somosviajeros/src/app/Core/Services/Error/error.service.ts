
export class errorService {
    private errores: any = {
        'usrerr:001' : 'Datos incompletos',
        'usrerr:002' : 'Acceso denegado (error en token)',
        'usrerr:003' : 'Email no registrado',
        'usrerr:004' : 'El email se encuentra en uso.',
        'usrerr:005' : 'Email en proceso de registro',
        'usrnue:001' : 'Direccion de e-mail vacia',
        'usrnue:002' : 'No se pudo enviar correo de confirmacion',
        'usrnue:003' : 'No se pudo completar la solicitud de registro (DB)',
        'usrlog:001' : 'Contraseña incorrecta',
        'usrlog:002' : 'Usuario deshabilitado',
        'usrcre:001' : 'No se pudo confirmar el registro (DB)',
        'usrcre:002' : 'El email no esta en proceso de registro',
        'usrcre:003' : 'No se pudo completar el registro (DB)',
        'usrcpe:001' : 'No se pueden obtener los datos del usuario (DB)',
        'usrcpe:002' : 'No se pudieron actualizar los datos (DB)',
        'usrcpa:001' : 'No se pudo cambiar la contraseña (DB)',
        'usrcpa:002' : 'Las contraseñas no coinciden',
        'usrbaj:001' : 'No se completo la solicitud de baja de usuario (DB)',
        'usrpol:001' : 'No se pudo enviar email de confirmacion',
        'usrpol:002' : 'No se pudo completar la peticion de restauracion de contraseña (DB)',
        'usrrpa:001' : 'Error al completar a peticion de restaurar contraseña (DB) (limpiar solicitud)',
        'usrrpa:002' : 'Error al completar a peticion de restaurar contraseña (DB) (Crear solicitud)',
        'usrrpa:003' : 'No existe peticion de cambio de contraseña',
        'usrlex:001' : 'Login externo no permitido (no coinciden las credenciales)',
        'emperr:001' : 'Datos incompletos',
        'emperr:002' : 'Acceso denegado (error en token)!',
        'empnue:001' : 'No se pudo relacionar el usuario a la empresa (DB)',
        'empnue:002' : 'No se pudo crear la empresa (DB)',
        'empnue:003' : 'Ya posee empresa asignada.',
        'empdat:001' : 'No tiene empresa asignada.',
        'empnsu:001' : 'No se pudo cargar la sucursal (DB)',
        'empnsu:002' : 'No tiene empresa asignada.',
        'MSGSPAM'    : 'Por favor revisar casilla de correo o spam.',
        'INVMAIL'    : 'Correo con formato invalido.',
        'ERRPWD'     : 'Error contraseñas diferentes.',
        'BNVIDA'     : 'Bienvenido a RODDAPP.',        
        'SVERROR'    : 'Error interno, intente mas tarde.',
        'CUITERROR'  : 'Formato de cuit incorrecto.'
    };

    private es: any = { 
        'MSGSPAM'    : '"¡Enviamos un código a tu mail! (Por favor verifica también en spam).',
        'MSGNAMEDUPLICADO'    : 'Este nombre ya está en uso, por favor use otro !!!.',
        'CUITERROR'  : 'Formato de cuit incorrecto.'
    };

    private en: any = { 
        'MSGSPAM'    : 'We send a code to your mail! (Please check also in spam).',
        'MSGNAMEDUPLICADO'    : 'This name is already in use, please use another one !!!.',
        'CUITERROR'  : 'Wrong cuit format.'
    };

    private pt: any = { 
        'MSGSPAM'    : 'Enviámos um código para o seu e-mail! (Por favor, verifique também em spam).',
        'MSGNAMEDUPLICADO'    : 'Este nome já está em uso, por favor use outro !!!.',
        'CUITERROR'  : 'Formato de cuit errado.'
    };

    constructor() {
    }

    meesageErrorLang(llave : string, idioma : string):string{
        let mensage: any;

        switch (idioma) {
            case 'es':
                Object.entries(this.es).forEach((key, value) => {
                    if (llave == key[0]){
                        mensage = key[1];
                    }
                });
            break;

            case 'en':
                Object.entries(this.en).forEach((key, value) => {
                    if (llave == key[0]){
                        mensage = key[1];
                    }
                });
            break;

            case 'pt':
                Object.entries(this.pt).forEach((key, value) => {
                    if (llave == key[0]){
                        mensage = key[1];
                    }
                });            
            break;
        
            default:
                Object.entries(this.es).forEach((key, value) => {
                    if (llave == key[0]){
                        mensage = key[1];
                    }
                });
            break;
        }
        return mensage;
    }

    meesageError(llave:string):string{
        let mensage: any;
        Object.entries(this.errores).forEach((key, value) => {
            if (llave == key[0]){
                mensage = key[1];
            }
        });
        return mensage;
    }
}
