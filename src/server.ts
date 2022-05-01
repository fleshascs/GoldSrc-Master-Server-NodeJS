import { createPackages } from './createPackages';

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

console.log('packages', JSON.stringify(createPackages(servers)));
