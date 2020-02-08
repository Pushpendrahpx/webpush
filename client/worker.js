console.log("Service Worker Loaded in Woker.js")

self.addEventListener('push',e=>{
    const data = e.data.json();

    console.log('push Recieved');

    self.registration.showNotification(data.title,{
        // body:'We are Working on it',
        // icon:'https://github.com/fluidicon.png'

    });
})