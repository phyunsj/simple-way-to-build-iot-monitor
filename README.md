
<p align="center">
<img src="https://github.com/phyunsj/simple-way-to-build-iot-monitor/blob/master/images/zapier.glide.png" width="300px"/>
</p>

# A Simple Way to Build IoT Monitor

The short instructions to create end-to-end IoT monitoring system.

## Google Sheet

The central place to store time-series data (sensor data = timestamp, temperature, humidity, uv index). `Details` worksheet will be filled up with the sensor data. 3 charts are published as images to be displayed.

 `onChange` script will be triggered whenever new row is created. `Temperature`,`Humidity` and `UV Index` worksheet will be updated based on new sensor data.
 
<p align="center">
<img src="https://github.com/phyunsj/simple-way-to-build-iot-monitor/blob/master/images/google_sheet_details.png" width="600px"/>
</p>

#### onChange Trigger

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

#### Edit Template : `Details` Worksheet

<p align="center">
<img src="https://github.com/phyunsj/simple-way-to-build-iot-monitor/blob/master/images/zapier_edit_google_sheet.png" width="500px"/>
</p>

## Glide

Please watch [tutorials](https://www.youtube.com/channel/UCoPJeYPmYF_5CX9gbPHAG3Q/videos) to learn about [`Glide`](https://www.glideapps.com/).

Only `Temperature`, `Humidiy` & `UV Index` worksheets are appeared. `Details` worksheet are for tiem-series data storage.

<p align="center">
<img src="https://github.com/phyunsj/simple-way-to-build-iot-monitor/blob/master/images/monitor%40home.gif" width="300px"/>
</p>

## IoT Sensor

Simulate (every 5 mins) the sensor data with Node-RED.  URL for HTTP request node can be found from Zapier Catch Hook > View WebHook.  

<p align="center">
<img src="https://github.com/phyunsj/simple-way-to-build-iot-monitor/blob/master/images/node-red-simulator.png" width="600px"/>
</p>

### Related Posts

- [Glide](https://www.glideapps.com/)
- [Zapier](https://zapier.com/) 
