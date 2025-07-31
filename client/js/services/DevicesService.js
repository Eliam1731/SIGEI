import { sendDataServer } from '../utilities/sendDataServer.js';

export class DevicesService {
    static URL = '../../server/data/equipment/visualization.php';

    static async getDevicesByIndexes( index, amountDevices ) {
        const request = await sendDataServer(DevicesService.URL, {
            Index: index,            // ✅ "Index" con I mayúscula
            amountDevices: amountDevices
        });       

        console.log( 'DevicesService: ', request );
    }

    static async getDataDevice( id ) {
        throw new Error('Metodo no implementado');
    }

    static async updateDataDevice( id ) {
        throw new Error('Metodo no implementado');
    }
}