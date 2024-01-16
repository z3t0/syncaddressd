import { app } from "./server";

// Config
const PORT: number = Number(process.env.PORT) || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});