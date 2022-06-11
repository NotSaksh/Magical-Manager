const Discord = require("discord.js");
const colors = require(`colors`);
const client = require(`../index.js`)
const serverID = "980440124552773663";
const role = "985115223155429376";
const status = ".gg/notsaksh";




    client.on("presenceUpdate", async (oP, nP) => {
        let guild = client.guilds.cache.get(serverID)
        if (!guild) return;
        if (nP) {

            var user = guild.members.cache.get(nP.userId);

            if (!user || !user.roles) user = await guild.members.fetch(nP.userId).catch(() => {}) || false;

            if (!user) return;

            if (nP.activities.some(({
                    state
                }) => state?.includes(status))) {
                if (!user.roles.cache.has(role)) {
                  
                    user.roles.add(role).catch(() => {});
                  
                }
            } else {
                if (user.roles.cache.has(role)) {
                  
                    user.roles.remove(role).catch(() => {});
                  
                }
            }
        }
    })
    

    client.on("ready", async () => {

        let guild = client.guilds.cache.get(serverID)
        if (!guild) return;


        let fm = await guild.members.fetch().catch(() => {})

        let haveStatus = [...fm.filter(user =>
            !user.user.bot && !user.roles.cache.has(role) &&
            user.presence && user.presence.activities.some(({
                state
            }) => state?.includes(status))
        ).values()];

        let noStatus = [...fm.filter(user =>
            !user.user.bot && !user.roles.cache.has(role) &&
            (!user.presence || !user.presence.activities.some(({
                state
            }) => state?.includes(status)))
        ).values()];

        for (const user of haveStatus) {
          
            await user.roles.add(role).catch(() => {});
          
            await delay(350);
        }

        for (const user of noStatus) {
          
            
                    user.roles.remove(role).catch(() => {});
                  
            await delay(350);
        }
    })

    function delay(delayInms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(2);
              
            }, delayInms);
        });
    }