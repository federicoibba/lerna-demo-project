const Core = require("@monorepo/core");

function runClient() {
  const clientId = Core.connect();
  const currentDate = Core.getCurrentDate(clientId);

  console.log("The date of today is:", currentDate)

  Core.disconnect(clientId)
}

runClient()