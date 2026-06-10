import { ApplicationMenu, Module } from '@servicenow/sdk/core';
import { ProductRegistrationLoginUI } from './ui_page';

// Create the parent Application Menu categorization
const ProdRegMenu = ApplicationMenu({
    sysId: 'x_snc_prod_reg_menu',
    title: 'Product Registration Hub',
    active: true,
    roles: ['x_snc_prod_reg.user']
});

// Create the specific sub-link module pointing to our custom Fluent UI Page
export const GatewayModule = Module({
    sysId: 'x_snc_prod_reg_gateway_module',
    title: 'Portal Gateway',
    application_menu: ProdRegMenu,
    order: 100,
    active: true,
    // Links explicitly to the endpoint name defined in our UI Page metadata block
    link_type: 'URL_FROM_ARGUMENTS',
    arguments: 'x_snc_prod_reg_prod_registration_gateway.do' 
});
