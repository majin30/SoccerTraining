const fs = require('fs');
const os = require('os');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', 'src', 'config', 'api-generated.json');
const DEFAULT_IP = '10.130.63.144';

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  const candidates = [];

  for (const iface of Object.values(interfaces)) {
    if (!iface) continue;

    for (const addr of iface) {
      if (
        addr.family === 'IPv4' &&
        !addr.internal &&
        !/^169\.254\./.test(addr.address)
      ) {
        candidates.push(addr.address);
      }
    }
  }

  return candidates.length > 0 ? candidates[0] : null;
}

function writeConfig(ip) {
  const value = { ip: ip ?? DEFAULT_IP };
  const json = JSON.stringify(value, null, 2);

  fs.writeFileSync(CONFIG_PATH, `${json}\n`, { encoding: 'utf8' });
  console.log(`API_URL actualizado a http://${value.ip}:5000/api`);
}

function main() {
  try {
    const ip = getLocalIp();

    if (!ip) {
      console.warn('No se encontró una IPv4 válida. Se mantiene la IP por defecto.');
    }

    writeConfig(ip);
  } catch (error) {
    console.error('No se pudo actualizar API_URL automáticamente.');
    console.error(error);
    process.exitCode = 1;
  }
}

main();


