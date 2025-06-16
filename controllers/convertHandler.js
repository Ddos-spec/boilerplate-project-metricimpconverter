/*
*
*
* Complete the handler logic below
* *
*/

function ConvertHandler() {
  
  // Fungsi untuk mengambil bagian ANGKA dari input
  this.getNum = function(input) {
    // Cari indeks huruf pertama untuk memisahkan angka dan unit
    let firstCharIndex = input.search(/[a-zA-Z]/);
    let numStr = (firstCharIndex === -1) ? input : input.slice(0, firstCharIndex);

    // Jika tidak ada angka (misal: "kg"), default ke 1
    if (numStr === "") {
      return 1;
    }

    // Cek apakah ada pecahan (tanda '/')
    if (numStr.includes('/')) {
      let parts = numStr.split('/');
      // Jika ada lebih dari satu '/', itu double-fraction (tidak valid)
      if (parts.length > 2) {
        return 'invalid number';
      }
      // Hitung nilai pecahannya
      let result = parseFloat(parts[0]) / parseFloat(parts[1]);
      return isNaN(result) ? 'invalid number' : result;
    }

    // Jika bukan pecahan, langsung konversi ke angka
    let result = parseFloat(numStr);
    return isNaN(result) ? 'invalid number' : result;
  };
  
  // Fungsi untuk mengambil bagian UNIT dari input
  this.getUnit = function(input) {
    let firstCharIndex = input.search(/[a-zA-Z]/);
    
    // Jika tidak ada huruf, unit tidak valid
    if (firstCharIndex === -1) {
      return 'invalid unit';
    }

    let unitStr = input.slice(firstCharIndex).toLowerCase();
    const validUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
    
    // Khusus untuk 'L', tes freeCodeCamp maunya 'L' besar
    if (unitStr === 'l') {
        return 'L';
    }

    if (validUnits.includes(unitStr)) {
      return unitStr;
    } else {
      return 'invalid unit';
    }
  };
  
  // Fungsi untuk mendapatkan UNIT KEMBALIAN
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'l': 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'mi': 'km',
      'km': 'mi'
    };
    // Normalisasi input ke lowercase untuk mencocokkan map, kecuali 'L' besar
    let lowerInitUnit = initUnit.toLowerCase();
    return unitMap[lowerInitUnit];
  };

  // Fungsi untuk MENGEJA NAMA LENGKAP unit
  this.spellOutUnit = function(unit) {
    const spellMap = {
      'gal': 'gallons',
      'l': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    };
    let lowerUnit = unit.toLowerCase();
    return spellMap[lowerUnit];
  };
  
  // Fungsi untuk melakukan KONVERSI
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    // Normalisasi unit ke lowercase untuk switch case
    let lowerInitUnit = initUnit.toLowerCase();

    switch (lowerInitUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        // Seharusnya tidak akan pernah terjadi jika validasi unit benar
        result = undefined;
    }
    
    // Bulatkan hasil ke 5 angka di belakang koma
    return parseFloat(result.toFixed(5));
  };
  
  // Fungsi untuk merangkai semua hasil menjadi STRING JAWABAN
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;