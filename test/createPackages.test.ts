import { createPackages } from '../src/createPackages';

const servers: string[] = [
  '91.211.246.1:27015',
  '91.211.246.2:27015',
  '91.211.246.3:27015',

  '91.211.246.4:27015',
  '91.211.246.5:27015',
  '91.211.246.6:27015',

  '91.211.246.7:27015',
  '91.211.246.8:27015',
  '91.211.246.9:27015',

  '91.211.246.10:27015'
];

test('should return server bytes in a single chunk', () => {
  expect(JSON.stringify(createPackages(servers))).toBe(
    '[{"type":"Buffer","data":[255,255,255,255,102,10,91,211,246,1,105,135,91,211,246,2,105,135,91,211,246,3,105,135,91,211,246,4,105,135,91,211,246,5,105,135,91,211,246,6,105,135,91,211,246,7,105,135,91,211,246,8,105,135,91,211,246,9,105,135,91,211,246,10,105,135,0,0,0,0,0,0]}]'
  );
});