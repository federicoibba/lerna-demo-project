const crypto = require('crypto');
const clients = new Set();

const connect = () => {
  if (clients.size > 3) {
    throw new Error("Cannot support more than 3 connections at time.")
  }

  const clientId = crypto.randomBytes(20).toString("hex")
  clients.add(clientId)

  return clientId;
} 

const getCurrentDate = (clientId) => {
  if (!clients.has(clientId)) {
    throw new Error(`Cannot process the request - There is no client registered with ID ${clientId}`)
  }

  return new Date().toISOString()
}

const disconnect = (id) => {
  const isClientRemoved = clients.delete(id);

  if (!isClientRemoved) {
    throw new Error(`Error during disconnection - Cannot find a client with ID ${id}`)
  }
}

module.exports = {
  connect, 
  disconnect,
  getCurrentDate,
}