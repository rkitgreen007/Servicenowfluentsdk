import { UIPage } from '@servicenow/sdk/core';

export const ProductRegistrationLoginUI = UIPage({
    sysId: 'x_snc_prod_reg_login_ui',
    name: 'prod_registration_gateway',
    client_callable: true,
    // HTML / Jelly template defining a modern, clean entry portal wrapper
    html: `
        <?xml version="1.0" encoding="utf-8" ?>
        <jelly :jelly="true" xmlns:g="glide" xmlns:j="jelly:core" xmlns:g2="null">
            <g:evaluate object="true">
                // Server-side evaluation to check the active user status
                var currentUser = gs.getUser();
                var greetingName = currentUser.getFirstName() || "Valued Partner";
                greetingName;
            </g:evaluate>
            
            <div class="login-wrapper" style="padding: 30px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 500px; margin: 50px auto; border: 1px solid #e0e0e0; border-radius: 6px; background: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div class="header" style="text-align: center; margin-bottom: 25px;">
                    <h2 style="color: #181d1f; margin-bottom: 5px;">Product Registration</h2>
                    <p style="color: #63727a; font-size: 14px;">Welcome back, \${jelly.greetingName}</p>
                </div>
                
                <form id="registration_gateway_form" onsubmit="return handleGatewaySubmit();">
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label for="reg_code" style="display: block; margin-bottom: 5px; font-weight: 600; font-size: 13px; color: #343d40;">Enter Verification or License Token:</label>
                        <input type="text" id="reg_code" name="reg_code" required="true" style="width: 100%; padding: 10px; border: 1px solid #b5bec2; border-radius: 4px; box-sizing: border-box;" placeholder="XXXX-XXXX-XXXX"/>
                    </div>
                    
                    <button type="submit" style="width: 100%; padding: 12px; background-color: #293e40; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; transition: background 0.2s;">
                        Validate Passport Identity
                    </button>
                </form>
                
                <div id="msg_banner" style="margin-top: 15px; display: none; padding: 10px; border-radius: 4px; font-size: 13px;"></div>
            </div>
        </jelly>
    `,
    // Client script managing form validation and API handshake
    client_script: `
        function handleGatewaySubmit() {
            var token = g_form.getValue('reg_code') || document.getElementById('reg_code').value;
            var banner = document.getElementById('msg_banner');
            
            if (!token || token.length < 5) {
                banner.style.display = 'block';
                banner.style.backgroundColor = '#fce8e6';
                banner.style.color = '#a81c1c';
                banner.innerHTML = '<strong>Error:</strong> Please enter a valid registration tracking token.';
                return false;
            }
            
            banner.style.display = 'block';
            banner.style.backgroundColor = '#e6f4ea';
            banner.style.color = '#137333';
            banner.innerHTML = 'Identity verified. Redirecting to your CSDM Dashboard...';
            
            // Redirect smoothly to your custom application service portal or page route
            setTimeout(function() {
                window.location.href = '/x_snc_prod_reg_dashboard_home.do';
            }, 1500);
            
            return false;
        }
    `
});
