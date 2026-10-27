import * as signalR from '@microsoft/signalr';
const connection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5139/notificationHub')
    .withAutomaticReconnect()
    .build();
connection.start().catch(err => console.error(err));
export default connection;