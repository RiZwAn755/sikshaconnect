// for app.listen
import './config/db.js'
import cluster from 'cluster';
import os from 'os';
import app from './server.js';

const numcpus = os.cpus().length;
console.log(numcpus);

if(cluster.isPrimary){ // primary node serves as load balancer

    for(let i = 0;  i < numcpus; i++){
        cluster.fork();
    }
}else{
app.listen(3000, () => {
    console.log(`Server running on port 3000 with process id ${process.pid}`);
});
}
