const express = require('express');
const app = express();
const PORT = process.env.PORT || 20005;

app.get('/api/time', (req, res) => {
    // Usa process.hrtime para mayor precisión en el backend
    const now = new Date();
    const hrtime = process.hrtime.bigint(); // nanosegundos desde algún punto fijo

    res.json({
        currentTime: now.toISOString(),
        timestamp: now.getTime(),
        hrtime: hrtime.toString(), // nanosegundos como string
        utc: {
            year: now.getUTCFullYear(),
            month: now.getUTCMonth() + 1,
            day: now.getUTCDate(),
            hour: now.getUTCHours(),
            minute: now.getUTCMinutes(),
            second: now.getUTCSeconds(),
            millisecond: now.getUTCMilliseconds(),
        },
        peru: {
            currentTime: now.toLocaleString('es-PE', { timeZone: 'America/Lima' }),
            year: Number(now.toLocaleString('es-PE', { timeZone: 'America/Lima', year: 'numeric' })),
            month: Number(now.toLocaleString('es-PE', { timeZone: 'America/Lima', month: '2-digit' })),
            day: Number(now.toLocaleString('es-PE', { timeZone: 'America/Lima', day: '2-digit' })),
            hour: Number(now.toLocaleString('es-PE', { timeZone: 'America/Lima', hour: '2-digit', hour12: false })),
            minute: Number(now.toLocaleString('es-PE', { timeZone: 'America/Lima', minute: '2-digit' })),
            second: Number(now.toLocaleString('es-PE', { timeZone: 'America/Lima', second: '2-digit' })),
            millisecond: Number(now.toLocaleString('es-PE', { timeZone: 'America/Lima', fractionalSecondDigits: 3 })),
        },
        timezone: 'UTC',
        server: {
            hostname: require('os').hostname(),
        }
    });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.get('/', (req, res) => {
    res.redirect(301, '/api/time');
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});