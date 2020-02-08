import solace from 'solclientjs';

class Solace {
    static session;
    static connected = false;

    static initializeConnection = (callback) => {
        const factoryProps = new solace.SolclientFactoryProperties();
        factoryProps.profile = solace.SolclientFactoryProfiles.version10;
        solace.SolclientFactory.init(factoryProps);

        Solace.session = solace.SolclientFactory.createSession({
            url: process.env.SOLACE_URL,
            vpnName: process.env.SOLACE_VPN_NAME,
            userName: process.env.SOLACE_USERNAME,
            password: process.env.SOLACE_PASSWORD,
        });

        Solace.session.on(solace.SessionEventCode.UP_NOTICE, (event) => {
            Solace.connected = true;
            if (callback) {
                callback();
            }
        });

        try {
            Solace.session.connect();
        } catch (error) {
            console.log(error);
        }
    };

    static getSession = () => {
        if (Solace.session == undefined || !Solace.connected) {
            Solace.initializeConnection();
        }

        return Solace.session;
    };

    static createMessage = (message, topic) => {
        const solaceMessage = solace.SolclientFactory.createMessage();
        const solaceTopic = solace.SolclientFactory.createTopicDestination(topic);
        solaceMessage.setDestination(solaceTopic);
        solaceMessage.setSdtContainer(
            solace.SDTField.create(solace.SDTFieldType.STRING, message),
        );

        return solaceMessage;
    };
}

export default Solace;
