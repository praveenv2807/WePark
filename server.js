const express = require("express");
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, "db.json");

// --- Supabase Credentials ---
const SUPABASE_URL = "https://lrrcwwyskhaipnsfjtia.supabase.co";
const SUPABASE_SECRET_KEY = "sb_secret_WhvobWfO46aiXs_lcboA0A_LbHYaD-X";

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Local Slots Storage (Fast JSON DB)
const initialSlots = [
  { id: "A-01", status: "available", vehicleNumber: null },
  { id: "A-02", status: "booked", vehicleNumber: "KA-01-MJ-1029" },
  { id: "A-03", status: "available", vehicleNumber: null },
  { id: "B-01", status: "available", vehicleNumber: null },
  { id: "B-02", status: "booked", vehicleNumber: "MH-12-PQ-8842" },
  { id: "B-03", status: "available", vehicleNumber: null },
];

function readSlots() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialSlots, null, 2));
    return initialSlots;
  }
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function writeSlots(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// REST Endpoints
app.get("/api/slots", (req, res) => res.json(readSlots()));

app.post("/api/book", (req, res) => {
  const { slotId, vehicleNumber } = req.body;
  let slots = readSlots();
  const slot = slots.find((s) => s.id === slotId);

  if (!slot || slot.status === "booked") {
    return res
      .status(400)
      .json({ success: false, message: "Slot unavailable" });
  }

  slot.status = "booked";
  slot.vehicleNumber = vehicleNumber;
  writeSlots(slots);
  res.json({ success: true, message: `Slot ${slotId} reserved!` });
});

// Supabase User Sign-In Endpoint
app.post("/api/login", async (req, res) => {
  const { name, vehicleType, email, phone } = req.body;

  if (!name || !vehicleType || !email || !phone) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    // Upsert User Data into Supabase
    const { data, error } = await supabase
      .from("users")
      .upsert([{ name, vehicle_type: vehicleType, email, phone }], {
        onConflict: "email",
      })
      .select();

    if (error) throw error;

    res.json({
      success: true,
      user: { name, vehicleType, email, phone },
    });
  } catch (err) {
    console.error("Supabase Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`WePark Server live at http://localhost:${PORT}`),
);
