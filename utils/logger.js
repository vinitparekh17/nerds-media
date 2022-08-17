const { mem, cpu, drive, os } = require("node-os-utils");
const Webhook = require("./webhook");

const Logger = async () => {
    try {
        function msToTime(s) {

            // Pad to 2 or 3 digits, default is 2
            function pad(n, z) {
                z = z || 2;
                return ('00' + n).slice(-z);
            }
            var ms = s % 1000;
            s = (s - ms) / 1000;
            var secs = s % 60;
            s = (s - secs) / 60;
            var mins = s % 60;
            var hrs = (s - mins) / 60;

            return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
        }

        const count = await cpu.count();
        const cpuUsage = await cpu.usage();
        const avaliableUsage = (await cpu.free()).toFixed(2);
        const memoryInfo = await mem.info();
        const uptime = await os.uptime();
        const hostName = await os.hostname();
        const osType = await os.type();
        
        return `**Server information**\n\`\`\`bash\n
CPU Count: ${count} cores
CPU Usage: ${cpuUsage} %
Avaliable CPU Usage: ${avaliableUsage} %
Total RAM: ${(memoryInfo.totalMemMb / 1024).toFixed(2)} GB
Free RAM: ${(memoryInfo.freeMemMb / 1024).toFixed(2)} GB
Used RAM: ${(memoryInfo.usedMemMb / 1024).toFixed(2)} GB
Uptime: ${msToTime(uptime)}
Hostname: ${hostName}
OS Type: ${osType}\`\`\``
    } catch (err) {
        console.log(err);
    }
}

module.exports = Logger;