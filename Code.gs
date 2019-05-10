function onChange(e) {
 
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Details");
  var sheetT = ss.getSheetByName("Temperature"); // sheetT, sheetH, sheetU are used by glide tab
  var sheetH = ss.getSheetByName("Humidity");
  var sheetU = ss.getSheetByName("UV Index");
  
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
  var randomId  = new Date(rowRange[0]).toISOString(); // (1) use timestamp instead. convert it to ISO format.
  // or (2) random string + number
  //var randomId  = Math.random().toString(36).substr(2, 5) + Math.floor(Math.random() * 1000000 );
  
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
  var valuesH = [[
    lastUpdated,
    currHumidity,
    "https://docs.google.com/spreadsheets/d/e/ABCDEFGHIJKLMNOPQRSTUVWXYZ?oid=123567890&format=image&update="+randomId
    
  ]];
  var range = sheetH.getRange("A2:C2");
  range.setValues(valuesH);
  
  // 4.3 UV Index Sheet
  var currUvMessage = "Extreme "
  var currUvWarningNote = "Try to avoid sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses."
  switch( currUvIndex ) {
    case 0:
    case 1:
    case 2: currUvMessage = "Low "; currUvWarningNote = "Wear sunglasses on bright days.If you burn easily, cover up and use broad spectrum SPF 30+ sunscreen.";break;
    case 3:
    case 4:
    case 5: currUvMessage = "Moderate "; currUvWarningNote = "Stay in shade near midday when the sun is strongest.If outdoors, wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses.";break;
    case 6:
    case 7: currUvMessage = "High "; currUvWarningNote = "Reduce time in the sun between 10 a.m. and 4 p.m. If outdoors, seek shade and wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses.";break;
    case 8: 
    case 9:
    case 10: currUvMessage = "Very High "; currUvWarningNote = "Minimize sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses."; break;
    default: currUvMessage = "Extreme"; break;
      
  }
  var valuesU = [[
    lastUpdated,
    currUvMessage + '('+currUvIndex+')',
    "https://docs.google.com/spreadsheets/d/e/2ABCDEFGHIJKLMNOPQRSTUVWXYZ?oid=123567890&format=image&update="+randomId,
    currUvWarningNote
  ]];
  var range = sheetU.getRange("A2:D2");
  range.setValues(valuesU);
  
  // TODO : High-Water Mark Treatment
  var colA = sheet.getRange("A1:A").getValues();
  var colAlast = colA.filter(String).length; // non-empty row
  
  Logger.log(colAlast); 
  // if ( colAlast >= highwaterMark ) delete oldest X rows
}
