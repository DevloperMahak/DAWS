export function createA2AMessage(sender, receiver, type, payload) {
  return {
    sender,
    receiver,
    type,
    payload,
    timestamp: Date.now(),
  };
}
