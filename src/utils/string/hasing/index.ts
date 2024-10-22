import crypto from 'crypto';

const stringHashing = (str: string) => {
	return crypto.createHash('base64').update(str).digest('hex');
};

export default stringHashing;