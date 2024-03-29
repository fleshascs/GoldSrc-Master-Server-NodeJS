export const serverToBytes = (server: string): number[] => {
  const parts = server.split(':');
  const ip = parts[0];
  const port = Number(parts[1]);
  return [
    ...ip.split('.').map((section) => Number(Number(section).toString(10))),
    (port >> 8) & 0xff,
    port & 0xff
  ];
};

export function chunkSplit<T>(
  items: string[],
  maxPerChunk: number,
  modifyItem: (item: string) => T
): T[][] {
  const totalChunks = Math.ceil(items.length / maxPerChunk);
  const chunks = [];

  for (let i = 0; i < totalChunks; i++) {
    chunks[i] = [];
  }

  for (let i = 0; i < items.length; i++) {
    const chunkId = Math.floor(i / maxPerChunk);
    chunks[chunkId].push(modifyItem(items[i]));
  }

  return chunks;
}

export async function retry<T extends () => Promise<unknown>>(
  fn: T,
  retriesLeft = 3,
  interval = 1000,
  exponential = false
): Promise<ReturnType<typeof fn>> {
  try {
    return await fn();
  } catch (error) {
    if (retriesLeft) {
      await new Promise((r) => setTimeout(r, interval));
      console.log('retry', error.message);

      return retry(fn, retriesLeft - 1, exponential ? interval * 2 : interval, exponential);
      // } else throw new Error('Max retries reached');
    } else throw error;
  }
}
