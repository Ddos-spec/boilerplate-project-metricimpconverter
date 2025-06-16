/*
*
*
* Complete the API routing logic below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      
      // Panggil method dari controller untuk mem-parsing input
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);

      // Cek apakah ada input yang tidak valid
      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        res.json({ error: 'invalid number and unit' });
        return;
      }
      if (initNum === 'invalid number') {
        res.json({ error: 'invalid number' });
        return;
      }
      if (initUnit === 'invalid unit') {
        res.json({ error: 'invalid unit' });
        return;
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
