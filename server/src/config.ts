export interface ConfigMap {
    ServerPort: string;
    MongoConfig: string;
}

const configMap: ConfigMap = {
    ServerPort: process.env.port || '5000',
    MongoConfig: process.env.MONGO_CONFIG || '#{MONGO_CONFIG}#',
};

export const SERVER_PORT: string = configMap.ServerPort;
export const MONGO_CONFIG: string = configMap.MongoConfig;
