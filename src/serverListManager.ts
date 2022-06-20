import fetch from 'node-fetch';
import schedule from 'node-schedule';
import { createPackages } from './createPackages';
import { retry } from './utils';

interface Server {
  id: string;
  address: string;
  hostname: string;
  players: string;
  maxplayers: string;
  map: string;
  status: string;
  game: string;
  date_create: string;
  date_end: string;
  type: string;
  rounds: string;
  num: number;
}

interface Servers {
  boostedServers: Server[];
  top50servers: Server[];
}

async function getServerListChunks() {
  const servers: Servers = await fetch('https://cs-boost.lt/api/servers.php?full=1').then((res) =>
    res.json()
  );
  const ips: Server['address'][] = servers.boostedServers.map((s) => s.address);
  return { chunks: createPackages(ips), count: ips.length };
}

export function serverListManager(): { getPackage: () => Promise<Buffer> } {
  let chunks: Buffer[] = [];
  let isServerListReady = false;
  let serverListPromise;

  updateServerListChunks();
  schedule.scheduleJob('*/20 * * * *', function () {
    updateServerListChunks();
  });

  async function updateServerListChunks() {
    serverListPromise = retry(() => getServerListChunks());
    const serverList = await serverListPromise;
    isServerListReady = true;
    chunks = serverList.chunks;
    console.log('Server list updated, total servers: ' + serverList.count);
  }

  async function getPackage() {
    if (!isServerListReady) await serverListPromise; // only for initial server loading
    if (!chunks.length) throw new Error('No server list chunks');
    return chunks[0];
  }

  return { getPackage };
}
