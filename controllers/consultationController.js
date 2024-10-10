const Consultation = require('../models/consultationModel');
const moment = require('moment');
require('moment-lunar');

function convertToLunarYear(date) {
    const d = new Date(date);
    const lunarDate = moment(d).lunar();
    
    return lunarDate.year();
}

exports.getConsultationByElement = async (req, res) => {
  try {
    const { date } = req.params;
    const lunarData = convertToLunarYear(date);
    const modYear = lunarData % 10;
    console.log(modYear);
    let elementResult = '';
    switch (modYear) {
      case 0:
        elementResult = "Metal";
        break;
      case 1:
        elementResult = "Metal";
        break;
      case 2:
        elementResult = "Wood";
        break;
      case 3:
        elementResult = "Wood";
        break;
      case 4:
        elementResult = "Water";
        break;
      case 5:
        elementResult = "Water";
        break;
      case 6:
        elementResult = "Fire";
        break;
      case 7:
        elementResult = "Fire";
        break;
      case 8:
        elementResult = "Earth";
        break;
      case 9:
        elementResult = "Earth";
        break;
      default:
        return res.status(404).json({ message: 'Consultation not found' });
    }
    const consultation = await Consultation.findOne({ element: elementResult });

    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    res.status(200).json(consultation);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving consultation', error: err });
  }
};