export default {
    host: 'wss://mr2hd0llj3vw0r.messaging.solace.cloud:8443',
    username: 'solace-cloud-client',
    password: 'c0nvib5l7i28pf91ioo293o2cd',
    clientId: 'myUniqueClientId',
    keepalive: 10,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 10000,
    will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
    },
    rejectUnauthorized: false
};
