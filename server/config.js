const config = {
    firebase: {
        type: process.env.type || true,
        project_id: process.env.project_id || true,
        private_key_id: process.env.private_key_id || true,
        private_key: process.env.private_key || true,
        client_email: process.env.client_email || true,
        client_id: process.env.client_id || true,
        auth_uri: process.env.auth_uri || true,
        token_uri: process.env.token_uri || true,
        auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url || true,
        client_x509_cert_url: process.env.client_x509_cert_url || true,
        universe_domain: process.env.universe_domain || true,
    }
}

module.exports = config;