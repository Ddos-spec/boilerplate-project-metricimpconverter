/*
*
*
* Complete the API routing logic below
*
*
*/

'use strict';

var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      
      // Panggil method dari controller untuk mem-parsing input
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);

      // Cek apakah ada input yang tidak valid dan kirim error dalam format JSON
      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        return res.json({ error: 'invalid number and unit' });
      }
      if (initNum === 'invalid number') {
        return res.json({ error: 'invalid number' });
      }
      if (initUnit === 'invalid unit') {
        return res.json({ error: 'invalid unit' });
      }
      
      // Jika input valid, lanjutkan proses konversi
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      // Kirim hasil konversi dalam format JSON
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: toString
      });
    });
    
};
