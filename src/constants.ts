export const RESPONSE_START = Buffer.from([0xff, 0xff, 0xff, 0xff, 0x66, 0x0a]);
export const RESPONSE_END = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

export const CHUNK_SIZE = 231;
