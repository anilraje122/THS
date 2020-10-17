# Implement Express HTTPS Server

1. Create a Google Cloud Virtual Machine and connect VM Instance IP with any of your domains.

2. Make Sure Only 80,443 ports are enabled for that instance.

3. Implement Express Server within VM at 80 port which logs the IP Address of every incoming request into a text file. All Incoming Traffic Logs should be appended to a text file.
    * Create a new log file every time log file size reaches a
    maximum of 2KB.
    * The Log File Name should be the server timestamp at the
    time of file creation.

4. Generate an SSL certificate at https://www.sslforfree.com/ for the above connected domain name. Verify the domain name using http method as shown in their dashboard. Use HTTP Verification method only*
    * After domain verification, Download the certificate files. (You will get a zip file)
    * Note : Strictly domain verification should be done using Express HTTP Server Only**

5. Implement encrypted HTTPS Express Server using the above generated certificate files.

6. Redirect all http(80 port) traffic automatically to https(443)
