import { CHUNK_SIZE, RESPONSE_END, RESPONSE_START } from './constants';
import { chunkSplit, serverToBytes } from './utils';

export function createPackages(servers: string[]): Buffer[] {
  const chunks = chunkSplit<Buffer>(servers, CHUNK_SIZE, (item) =>
    Buffer.from(serverToBytes(item))
  );
  chunks[0].unshift(RESPONSE_START);
  chunks[chunks.length - 1].push(RESPONSE_END);

  const packages = chunks.reduce((pkgs, chunk) => {
    pkgs.push(Buffer.concat(chunk));
    return pkgs;
  }, []);

  return packages;
}
