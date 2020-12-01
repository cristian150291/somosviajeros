 /** Nueva SUCURSAL MODELS
 * @Observations : Modelos de estructura para nueva sucursal
 * 
 * Ingreso de nueva sucursal
 */
export class NuevaSucursalModel {
    constructor (
        public token: string, 
        public nombre: string,
        public baja: any,
        public latlong: any,
        public empresa: any,
        public marker: any,
        public tipo: string
    ){

    }
}
