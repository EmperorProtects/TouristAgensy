const express = require('express')
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("run")
});


app.post('/items', (req, res) => {
  res.json({ message: 'Thank you for your submission!' });
  console.log("bebra")
});


