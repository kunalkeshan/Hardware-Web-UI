/**
 * Application Configuration
 */

export const isProduction = process.env.NODE_ENV === 'production';

interface IConfig {
	BASE_URL: undefined | string;
}

// Configuration Container
const configuration: IConfig = {
	BASE_URL: isProduction ? undefined : 'http://localhost:8000',
};

export default configuration;
