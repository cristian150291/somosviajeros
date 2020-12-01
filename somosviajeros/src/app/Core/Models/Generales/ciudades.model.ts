 /** CIUDEADES MODELS
 * @Observations : Modelo de datos para carga de ciuades
 */
export class CiudadesModel {
    constructor (
        public id:string, 
        public nombre:string, 
        public idnacion:string,
        public idprovincia:string      
    ){
    }
}
