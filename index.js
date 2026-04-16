require('dotenv').config();
const server = require('./server');
const { sequelize } = require('./models');
const PORT = process.env.PORT || 3300;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();