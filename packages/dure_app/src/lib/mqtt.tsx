import mqtt from "mqtt";
import { createSignal } from "solid-js";

export const [messages, setMessages] = createSignal("");

export const addmsg = (newmsg: string) => {
  setMessages(messages() + "\n<br/>" + newmsg);
};

// https://www.hivemq.com/mqtt/public-mqtt-broker/
export const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt", {
  queueQoSZero: false,
});

client.on("connect", () => {
  addmsg("connected to wss://broker.hivemq.com:8884/mqtt");
  client.subscribe("presence", (err) => {
    if (!err) {
      addmsg("subscribed to topic presence");
      client.publish("presence", "Hello mqtt", (err) => {
        if (!err) {
          addmsg("published to topic presence, Hello mqtt");
        }
      });
    }
  });
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(message.toString());
  addmsg("[" + topic.toString() + "] : " + message.toString());
  client.end();
});
