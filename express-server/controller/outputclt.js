import record from '../model/input.js';

export const getAllrecords = async (req, res) => {
  try {
    const records = await record.findAll();
    res.json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Error fetching records' });
  }
};

export const getRecordById = async (req, res) => {
  try {
    const id = req.params.id;
    const fetchedRecord = await record.findByPk(id);
    if (fetchedRecord) {
      res.json(fetchedRecord);
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    console.error('Error fetching record:', error);
    res.status(500).json({ error: 'Error fetching record' });
  }
}