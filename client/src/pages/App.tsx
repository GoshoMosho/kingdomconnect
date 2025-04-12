import React, { useState } from "react";

const App = () => {
  const [player, setPlayer] = useState({
    name: "",
    power: "",
    role: "",
    kingdom: "",
  });

  const [result, setResult] = useState("");

  const handleMatch = () => {
    const power = parseInt(player.power);
    const role = player.role.toLowerCase();

    if (power >= 100_000_000 && role === "rally lead") {
      setResult("🔥 Top-tier match! Kingdoms will love you.");
    } else if (
      power >= 50_000_000 &&
      ["filler", "open field"].includes(role)
    ) {
      setResult("✅ Mid-tier match. You're valuable!");
    } else {
      setResult("🚫 Not match-ready yet. Keep building.");
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>🏰 BannerMatch MVP</h1>

      <input
        type="text"
        placeholder="Name"
        value={player.name}
        onChange={(e) => setPlayer({ ...player, name: e.target.value })}
      />
      <br />

      <input
        type="text"
        placeholder="Power (e.g. 75000000)"
        value={player.power}
        onChange={(e) => setPlayer({ ...player, power: e.target.value })}
      />
      <br />

      <input
        type="text"
        placeholder="Role (e.g. filler, rally lead, open field)"
        value={player.role}
        onChange={(e) => setPlayer({ ...player, role: e.target.value })}
      />
      <br />

      <input
        type="text"
        placeholder="Kingdom (e.g. 2581)"
        value={player.kingdom}
        onChange={(e) => setPlayer({ ...player, kingdom: e.target.value })}
      />
      <br />

      <button onClick={handleMatch} style={{ marginTop: "1rem" }}>
        Find Match
      </button>

      <div style={{ marginTop: "1rem", fontWeight: "bold" }}>{result}</div>
    </div>
  );
};

export default App;
