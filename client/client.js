
const publicVapidKey = 'BJR5CeAlxqrGFHvtfAZ0LRz7iZyLFQmARPA7w5Ma_MXHCN7gOAh9D26dKLJsQXDAzjSVxMnDq1RSOm8mb46buAA';



// Register the Service Worker, PUsh API, Send Push




// Just Conversion
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }


  if('serviceWorker' in navigator){
    send().catch(err=>alert(err));
}

async function send(){
    console.log("Registering SW");
    const register = await navigator.serviceWorker.register("./worker.js",{
        scope:'/'
    });

    console.log(" SW Registered");

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:urlBase64ToUint8Array(publicVapidKey),


    })
    console.log("PUsh Registered ...")
    
    console.log("Sending Push Notificatoin");

    await fetch('http://192.168.43.180:5003/subscribe',{
        method:"POST",
        body:JSON.stringify(subscription),
        headers:{
            'Content-Type':'application/json'
        }
    })

    console.log('Push Sent');


}