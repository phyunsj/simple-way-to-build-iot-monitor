
<p align="center">
<img src="https://github.com/phyunsj/simple-way-to-build-iot-monitor/blob/master/images/zapier_glide.png" width="300px"/>
</p>

# A Simple Way to Build IoT Monitor

TBD

## Google Sheet

The central place to store time-series data (sensor data - timestamp, temperature, humidity, uv index). `Details` worksheet will be filled up with the sensor data. 3 charts are published as images. 

 `onChange` script will be triggered whenever new row is created. `Temperature`,`Humidity` and `UV Index` worksheet will be updated based on new sensor data.
 
<p align="center">
<img src="https://github.com/phyunsj/simple-way-to-build-iot-monitor/blob/master/images/google_sheet_details.png" width="600px"/>
</p>

<p align="center">
<img src="https://github.com/phyunsj/simple-way-to-build-iot-monitor/blob/master/images/onchange_trigger.png" width="600px"/>
</p>

## Zapier Workflow


1. Create a Zappier Zap with a Catch Hook (WebHook).  
2. Add one action using the data retrieved from the webhook. 
3. Set **Create Spreadsheet Row** to store the sensor data. 
4. Edit Template to map Google Spreadsheet/Worksheet with the sensor data (JSON Keys). 

<p align="center">
<img src="https://github.com/phyunsj/simple-way-to-build-iot-monitor/blob/master/images/zapier_webhook_flow.png" width="300px"/>
</p>

<p align="center">
<img src="https://github.com/phyunsj/simple-way-to-build-iot-monitor/blob/master/images/zapier_edit_google_sheet.png" width="500px"/>
</p>

## Glide

<p align="center">
<img src="https://github.com/phyunsj/simple-way-to-build-iot-monitor/blob/master/images/monitor%40home.gif" width="300px"/>
</p>

## Node-RED

<p align="center">
<img src="https://github.com/phyunsj/simple-way-to-build-iot-monitor/blob/master/images/node-red-simulator.png" width="600px"/>
</p>
