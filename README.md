# Coffee Machine

A browser-based coffee machine simulator built with plain HTML, CSS & JavaScript.  
Serve espresso, latte, and cappuccino in different sizes, with sugar and syrup add-ons. Refill your supplies, collect cash, and watch inventory update live.

---

## 📖 Project Summary

This project simulates a real coffee kiosk interface. Users can:

- **Buy** different coffee drinks—choose type, size, sugar and syrup.  
- **Refill** all machine supplies (water, milk, beans, cups, sugar, syrup).  
- **Collect cash** accumulated from sales.  
- **Monitor** inventory and cash in real time.

It’s designed as a single-page app with no external dependencies—just drop the files in a folder and open in any modern browser.

---

## 🛠️ Tech Stack

- **HTML5** – semantic layout  
- **CSS3** – kiosk-style grid & flex layouts  
- **Vanilla JavaScript** – DOM manipulation & event handling  

No frameworks or build steps required.

---

## ⚙️ How It Works

1. **Inventory Dashboard**  
   On page load, the app reads an in-memory `stock` object and populates the “Inventory” panel with current values.

2. **Buy Coffee**  
   - Click **Buy Coffee** → shows “Type” and “Size” radio options, plus sugar (tbsp) input and syrup choices.  
   - As you select options, a live **Price: $X.XX** updates.  
   - Click **Purchase** → checks if enough ingredients remain.  
     - If not, alerts “Not enough _water_. Need 50 more.”  
     - If yes, deducts ingredients, adds cash, and alerts “Made a large latte with 2 tbsp sugar + vanilla syrup for $12.20.”  

3. **Refill Supplies**  
   - Click **Refill Supplies** → shows a grid of input fields for each resource (Water ml, Milk ml, Beans g, Cups, Sugar tbsp, Syrup units).  
   - Enter amounts and click **Add Supplies** → adds to the `stock` and updates the dashboard.

4. **Collect Cash**  
   - Click **Collect Cash** → alerts “I gave you $XXX” and resets the cash balance to $0.

All state lives in the JavaScript `stock` object and updates the DOM on every action.

---

## 🎬 Example Interaction

1. **Initial Inventory**  
```
Water: 400 ml
Milk: 540 ml
Beans: 120 g
Cups: 9
Sugar: 50 tbsp
Vanilla Syrup: 10
Caramel Syrup: 10
Money: $550
````

2. **Buy a large latte with 2 tbsp sugar + vanilla syrup**  
- Price: (7 × 1.5) + (2 × 0.10) + 1 = **$12.20**  
- Alerts: “Made a large latte with 2 tbsp sugar + vanilla syrup for $12.20.”  
- Inventory updates accordingly.

3. **Refill**  
- Add 1000 ml Water, 200 ml Milk, 20 g Beans, 5 Cups, 10 tbsp Sugar, 2 Vanilla Syrup, 2 Caramel Syrup.  
- Inventory reflects new totals.

4. **Collect Cash**  
- Alerts “I gave you $562.20.”  
- Money resets to $0.

---

## ✨ Features

- **Multiple Drink Types**: Espresso, Latte, Cappuccino  
- **Size Variations**: Small, Medium, Large (automatic scaling)  
- **Custom Add-Ons**: Sugar (+0.10\$ per tbsp), Syrup (+1\$ per shot)  
- **Live Price Preview**  
- **Resource Checks** with “Need X more” alerts  
- **Refill Grid**: multi-column input for all supplies  
- **Cash Collection** resets balance  

---

## 🚀 Getting Started

1. **Clone or download** this repo  
```bash
git clone https://github.com/your-username/coffee-machine.git
cd coffee-machine
````

2. **Open** `coffeeMachine.html` in any browser - no installations require.

---

## 📂 Project Structure

```
Coffee Machine/
├ README.md
└ src/
    ├ coffeeMachine.html
    ├ coffeeMachine.css
    ├ coffeeMachine.js
    └ vercel.json
```

---

## 💡 Future Ideas

* **Loyalty Program**: e.g. every 10th coffee free
* **Sales Dashboard**: track sales per type/size
* **Animated UI**: spinners for “Grinding…” or progress bars
* **Persistent Storage**: save state in `localStorage` or a backend
* **Database Integration**: store orders, inventory changes, and sales history in a database (e.g., SQLite, Firebase, MongoDB) for analytics and persistence
* **Mobile-Friendly Layout**: adapt grid for narrow viewports
* **API & Microservices**: expose endpoints for remote ordering or integrate with payment gateways

---

*Enjoy brewing ☕️ with code!*