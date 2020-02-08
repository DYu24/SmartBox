import { SolaceclientFactory } from 'solclientjs';

class Solace {
    static session;

    static initializeConnection = () => {
        Solace.session = SolaceclientFactory.createSession({
            url: process.env.SOLACE_URL,
            vpnName: process.env.SOLACE_VPN_NAME,
            userName: process.env.SOLACE_USERNAME,
            password: process.env.SOLACE_PASSWORD,
        });

        try {
            Solace.session.connect();
        } catch (error) {
            console.log(error);
        }
    }

    static getSession = () => {
        if (session == undefined) {
            Solace.initializeConnection();
        }

        return Solace.session;
    }
}

export default Solace;
