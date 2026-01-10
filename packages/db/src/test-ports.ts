
import net from 'net';

const host = '172.64.149.246';
const ports = [5432, 6543, 443];

ports.forEach(port => {
    console.log(`Testing ${host}:${port}...`);
    const socket = new net.Socket();
    socket.setTimeout(2000);

    socket.on('connect', () => {
        console.log(`✅ OPEN: ${host}:${port}`);
        socket.destroy();
    });

    socket.on('timeout', () => {
        console.log(`❌ TIMEOUT: ${host}:${port}`);
        socket.destroy();
    });

    socket.on('error', (err) => {
        console.log(`❌ ERROR: ${host}:${port} - ${err.message}`);
    });

    socket.connect(port, host);
});
