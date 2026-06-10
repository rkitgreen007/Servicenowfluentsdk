import { Application } from '@servicenow/sdk/core';
import { ProductRegistrationLoginUI } from './ui_page';
import { GatewayModule } from './navigation';

// Declare and isolate your primary application scope parameters
export default Application({
    scope: 'x_snc_prod_reg',
    name: 'Product Registration Modern Suite',
    version: '1.0.0',
    description: 'Enterprise architecture for managing hardware assets and CSDM compliance alignment.',
    records: [
        ProductRegistrationLoginUI,
        GatewayModule
    ]
});
