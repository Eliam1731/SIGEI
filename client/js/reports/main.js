import { getDataServer } from "../utilities/getDataServer.js";
import { renderFollowUp } from "./followUpRender.js";
import { followUpRenderSystems } from "./followUpSystems.js";

const root = document.querySelector('.container-details-resguards');
const buttonExportFileDevices = document.getElementById('export_file_devices');

const header = [
    'MARCA',
    'CODIGO OPC',
    'MODELO',
    'NUMERO DE SERIE',
    'SERVICE TAG',
    'Especificaciones',
    'Direccion mac',
    'Direccion wifi',
    'Resguardante',
    'Area',
    'Estado'
];

let exportFileExcelDevices = {}

document.addEventListener('DOMContentLoaded', async() => {
    try {
        const followUpDevice = await getDataServer('../../server/data/resguardvisualization.php');
        const guardDevicesSystemsUsers = await getDataServer('../../server/data/resguard_systems.php');
        const { sistemas: devices } = guardDevicesSystemsUsers;

        devices.forEach( device => {
            const {
                Nom_marca: brand,
                miId: code,
                Modelo: model,
                Num_serie: numberSeries,
                Service_tag: serviceTag,
                Comentarios: comments,
                Direccion_mac_ethernet: addressMac,
                Direccion_mac_wifi: addressWifi,
                Especificacion: specification,
                Status_id,
                Nom_subcategoria: subcategory
            } = device;

            const collection = [
                brand, code, model, numberSeries, serviceTag, specification, addressMac, addressWifi, 'Edgar Bladimir Gutierrez',
                'Sistemas', comments,Status_id
            ];

            if( !exportFileExcelDevices[ subcategory ] ) {
                exportFileExcelDevices[ subcategory ] = [ header, collection ];

                return;
            }

            exportFileExcelDevices[ subcategory ] = [ ...exportFileExcelDevices[ subcategory ], collection ];
        });

        Object.keys( followUpDevice ).forEach( company => {
            const { Nom_corto, obras } = followUpDevice[company];

            Object.keys( obras ).forEach( work => {
                const { Num_obra, frentes } = obras[ work ];
                const workName = work;

                Object.keys( frentes ).forEach( forehead => {
                    const { numero_frente, empleados } = frentes[ forehead ];
                    const foreheadName = forehead;

                    Object.keys( empleados ).forEach( employee => {
                        const { Nombre, Primer_apellido, Segundo_apellido, equipos } = empleados[ employee ];

                        equipos.forEach( device => {
                            const {
                                Nom_marca, miId, Modelo, Num_serie, Service_tag, Especificacion, Direccion_mac_ethernet, Direccion_mac_wifi,
                                Nom_subcategoria: subcategory
                            } = device;

                            const collection = [
                                Nom_marca, miId, Modelo, Num_serie, Service_tag, Especificacion, Direccion_mac_ethernet, Direccion_mac_wifi,
                                `${ Nombre } ${ Primer_apellido } ${ Segundo_apellido }`, `${ Nom_corto } | ${ workName }(${ Num_obra }) | ${ foreheadName }(${ numero_frente })`,
                                'En resguardo'
                            ];

                            if( !exportFileExcelDevices[ subcategory ] ) {
                                exportFileExcelDevices[ subcategory ] = [ header, collection ];

                                return;
                            }

                            exportFileExcelDevices[ subcategory ] = [ ...exportFileExcelDevices[ subcategory ], collection ];
                        });
                    })
                })
            });
        });

        followUpRenderSystems( guardDevicesSystemsUsers, root);
        renderFollowUp( followUpDevice, root);
    } catch(error) {
        console.error('Error:', error);
    }
});

buttonExportFileDevices.addEventListener( 'click', () => {
    const wb = XLSX.utils.book_new();

    Object.keys( exportFileExcelDevices ).forEach( subcategory => {
        const paper = XLSX.utils.aoa_to_sheet( exportFileExcelDevices[ subcategory ] );

        XLSX.utils.book_append_sheet( wb, paper, subcategory );
    });

    XLSX.writeFile( wb, "inventario.xlsx" );
});