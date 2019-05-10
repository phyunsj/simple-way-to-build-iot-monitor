
<p align="center">
<img src="https://github.com/phyunsj/simple-way-to-build-iot-monitor/blob/master/images/zapier.glide.png" width="300px"/>
</p>

# A Simple Way to Build IoT Monitor

The short instructions to create end-to-end IoT monitoring system.

## Google Sheet

The central place to store time-series data (sensor data = timestamp, temperature, humidity, uv index). `Details` worksheet will be filled up with the sensor data. 

 `onChange` script will be triggered whenever new row is created. `Temperature`,`Humidity` and `UV Index` worksheet will be updated based on new sensor data. 3 charts are also re-published whenever `onChange` is triggered.
 
<p align="center">
<img src="https://github.com/phyunsj/simple-way-to-build-iot-monitor/blob/master/images/google_sheet_details.png" width="600px"/>
</p>

#### [`onChange`](https://github.com/phyunsj/simple-way-to-build-iot-monitor/blob/master/Code.gs) Trigger

```
function onChange(e) {
 
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Details");
  var sheetT = ss.getSheetByName("Temperature"); // sheetT, sheetH, sheetU are used by glide tab
  ...
  
  // 1. Sort descending by column A. New entry will be moved to the top (Row2). 3 charts will be re-generated with Row2-Row9.
  var range = sheet.getRange("A2:E");
  range.sort({column: 1, ascending:false});

  // 2. extract the latest values 
  // getRange(row, column, optNumRows, optNumColumns)
  var rowRange = sheet.getRange(2, 1, 1, 5).getValues()[0];
  var lastUpdated = new Date(rowRange[0]).toLocaleString(); // timestamp -> date/time
  var currTemperature = rowRange[2];
  var currHumidity = rowRange[3];
  var currUvIndex = rowRange[4];
  
  // 3. ranndom string for images
  var randomId  = new Date(rowRange[0]).toISOString(); //  use timestamp instead. convert it to ISO format.
 
  // 4. update 'Temperature', 'Humidity` and 'UV index' worksheets
  
  // 4.1 Temperature Sheet
  // example : Single cell editing
  /*
  var cell = sheet.getRange("C2"); 
  cell.setValue(currTemperature+5);
  */
  var valuesT = [[
    lastUpdated,
    currTemperature,
    "https://docs.google.com/spreadsheets/d/e/ABCDEFGHIJKLMNOPQRSTUVWXYZ?oid=123567890&format=image&update="+randomId
  ]];
  
  var range = sheetT.getRange("A2:C2");
  range.setValues(valuesT);

  // 4.2 Humidity Sheet

  ...
  
  // 4.3 UV Index Sheet
  
  ...
  
  // TODO : High-Water Mark Treatment
  var colA = sheet.getRange("A1:A").getValues();
  var colAlast = colA.filter(String).length; // non-empty row
  
  Logger.log(colAlast); 
  // if ( colAlast >= highwaterMark ) delete oldest X rows
}
```

From `Script Editor`, select `Edit` menu and go to `Current project's triggers` to add **onChange** trigger.

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

Only `Temperature`, `Humidiy` & `UV Index` worksheets are appeared. `Details` worksheet are for time-series data storage.

<p align="center">
<img src="https://github.com/phyunsj/simple-way-to-build-iot-monitor/blob/master/images/monitor%40home.gif" width="300px"/>
</p>

## IoT Sensor

URL for HTTP request node can be found from Zapier `Catch Hook` > `View WebHook`. Simulate (every 5 mins) the sensor data with Node-RED for this example. Alternatively create MQTT subscriber (+ rules) and post meaningful data over Zapier Webhook.

<p align="center">
<img src="https://github.com/phyunsj/simple-way-to-build-iot-monitor/blob/master/images/node-red-simulator.png" width="600px"/>
</p>

### Related Posts

- [Glide : Create a mobile app from a Google Sheet](https://www.glideapps.com/)
- [Zapier : Connect Your Apps and Automate Workflows](https://zapier.com/) 
