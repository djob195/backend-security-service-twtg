echo "$SSH_PRIVATE" >> /root/.ssh/id_rsa
echo "$SSH_PUBLIC" >> /root/.ssh/id_rsa.pub
echo "$SSH_KNOWN_HOSTS" >> /root/.ssh/known_hosts
chmod 600 /root/.ssh/id_rsa
chmod 600 /root/.ssh/id_rsa.pub
npm install
sh -c "/wait" 
node index.js