export interface ConfigMap {
    ServerPort: string;
}

const configMap: ConfigMap = {
    ServerPort: process.env.port || '5000',
};

export const SERVER_PORT: string = configMap.ServerPort;
