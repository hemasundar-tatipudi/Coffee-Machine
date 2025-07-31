const stock = {
  water: 400,
  milk: 540,
  beans: 120,
  cups: 9,
  sugar: 50,            // tablespoons
  syrupVanilla: 10,     // shots
  syrupCaramel: 10,     // shots
  money: 550
};

const recipes = {
  espresso:   { water: 250, milk:   0, beans: 16, cost: 4 },
  latte:      { water: 350, milk:  75, beans: 20, cost: 7 },
  cappuccino: { water: 200, milk: 100, beans: 12, cost: 6 }
};

const sizes = { small: 1, medium: 1.5, large: 2 };

document.addEventListener('DOMContentLoaded', updateState);

function updateState() {
  document.getElementById('water').textContent         = stock.water;
  document.getElementById('milk').textContent          = stock.milk;
  document.getElementById('beans').textContent         = stock.beans;
  document.getElementById('cups').textContent          = stock.cups;
  document.getElementById('sugar').textContent         = stock.sugar;
  document.getElementById('syrup-vanilla').textContent = stock.syrupVanilla;
  document.getElementById('syrup-caramel').textContent = stock.syrupCaramel;
  document.getElementById('money').textContent         = stock.money;
}

// Helper to append a heading
function addHeading(area, text, level = 'h3') {
  const el = document.createElement(level);
  el.textContent = text;
  area.append(el);
}

function showAction(action) {
  const area = document.getElementById('action-area');
  area.innerHTML = '';

  if (action === 'buy') {
    addHeading(area, 'Buy Coffee', 'h3');
    addHeading(area, 'Type:', 'h4');

    // Coffee type radios
    const form = document.createElement('form');
    form.id = 'coffeeForm';
    Object.keys(recipes).forEach(type => {
      const label = document.createElement('label');
      label.style.display = 'block';
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'coffee';
      radio.value = type;
      label.append(radio, ` ${type}`);
      form.append(label);
    });
    area.append(form);

    // Size radios with extra top padding
    const sizeDiv = document.createElement('div');
    sizeDiv.style.margin = '16px 0 8px';
    sizeDiv.append('Size: ');
    Object.keys(sizes).forEach(sz => {
      const lbl = document.createElement('label');
      lbl.style.marginRight = '10px';
      const r = document.createElement('input');
      r.type = 'radio';
      r.name = 'size';
      r.value = sz;
      if (sz === 'small') r.checked = true;
      lbl.append(r, ` ${sz}`);
      sizeDiv.append(lbl);
    });
    area.append(sizeDiv);

    // Sugar input
    const sugarLabel = document.createElement('label');
    sugarLabel.textContent = 'Sugar (tbsp): ';
    const sugarIn = document.createElement('input');
    sugarIn.type = 'number';
    sugarIn.id = 'sugarIn';
    sugarIn.min = '0';
    sugarIn.value = '0';
    sugarIn.style.width = '60px';
    sugarLabel.append(sugarIn);
    area.append(sugarLabel, document.createElement('br'));

    // Syrup radios
    const syrupDiv = document.createElement('div');
    syrupDiv.style.margin = '8px 0';
    syrupDiv.append('Syrup: ');
    ['none', 'vanilla', 'caramel'].forEach(flavor => {
      const lbl = document.createElement('label');
      lbl.style.marginRight = '10px';
      const r = document.createElement('input');
      r.type = 'radio';
      r.name = 'syrup';
      r.value = flavor;
      if (flavor === 'none') r.checked = true;
      lbl.append(r, ` ${flavor}`);
      syrupDiv.append(lbl);
    });
    area.append(syrupDiv);

    // Price display & Purchase button
    const priceDisplay = document.createElement('div');
    priceDisplay.id = 'priceDisplay';
    priceDisplay.style.margin = '8px 0';
    const btn = document.createElement('button');
    btn.textContent = 'Purchase';
    btn.disabled = true;
    area.append(priceDisplay, btn);

    // Recalculate price on any change
    function updatePrice() {
      const type = form.coffee.value;
      const size = document.querySelector('input[name="size"]:checked').value;
      if (!type) {
        priceDisplay.textContent = '';
        btn.disabled = true;
        return;
      }
      const sugarTbsp = parseInt(sugarIn.value, 10) || 0;
      const syrupFlavor = document.querySelector('input[name="syrup"]:checked').value;
      const syrupCost = syrupFlavor === 'none' ? 0 : 1;
      const price = recipes[type].cost * sizes[size] + sugarTbsp * 0.10 + syrupCost;
      priceDisplay.textContent = `Price: $${price.toFixed(2)}`;
      btn.disabled = false;
    }

    form.addEventListener('change', updatePrice);
    sizeDiv.addEventListener('change', updatePrice);
    sugarIn.addEventListener('input', updatePrice);
    syrupDiv.addEventListener('change', updatePrice);

    btn.addEventListener('click', e => {
      e.preventDefault();
      buy(
        form.coffee.value,
        document.querySelector('input[name="size"]:checked').value,
        parseInt(sugarIn.value, 10) || 0,
        document.querySelector('input[name="syrup"]:checked').value
      );
    });

  } else if (action === 'fill') {
    addHeading(area, 'Refill Supplies', 'h3');

    // Grid container for fields only
    const container = document.createElement('div');
    container.className = 'refill-container';

    const refillItems = [
      { key: 'water', label: 'Water (ml)' },
      { key: 'milk', label: 'Milk (ml)' },
      { key: 'beans', label: 'Beans (g)' },
      { key: 'cups', label: 'Cups (qty)' },
      { key: 'sugar', label: 'Sugar (tbsp)' },
      { key: 'syrupVanilla', label: 'Vanilla Syrup (shots)' },
      { key: 'syrupCaramel', label: 'Caramel Syrup (shots)' }
    ];

    refillItems.forEach(item => {
      const cell = document.createElement('div');
      const lbl = document.createElement('label');
      lbl.textContent = `Add ${item.label}:`;
      const inp = document.createElement('input');
      inp.type = 'number';
      inp.id = item.key + 'In';
      inp.min = '0';
      inp.value = '0';
      cell.append(lbl, inp);
      container.append(cell);
    });

    area.append(container);

    const btn = document.createElement('button');
    btn.textContent = 'Add Supplies';
    btn.style.marginTop = '12px';
    btn.onclick = fill;
    area.append(btn);
  }
}

function buy(type, size, sugarTbsp, syrupFlavor) {
  const recipe = recipes[type];
  const mult = sizes[size];
  const neededWater = Math.ceil(recipe.water * mult);
  const neededMilk  = Math.ceil(recipe.milk  * mult);
  const neededBeans = Math.ceil(recipe.beans * mult);

  const missing = ['water','milk','beans','cups','sugar',`syrup${capitalize(syrupFlavor)}`]
    .find(key => {
      if (key === 'water') return stock.water < neededWater;
      if (key === 'milk')  return stock.milk  < neededMilk;
      if (key === 'beans') return stock.beans < neededBeans;
      if (key === 'cups')  return stock.cups  < 1;
      if (key === 'sugar') return stock.sugar < sugarTbsp;
      if (key.startsWith('syrup') && syrupFlavor !== 'none') return stock[key] < 1;
      return false;
    });

  if (missing) {
    let needed;
    if (missing === 'water') needed = neededWater - stock.water;
    else if (missing === 'milk') needed = neededMilk - stock.milk;
    else if (missing === 'beans') needed = neededBeans - stock.beans;
    else if (missing === 'cups') needed = 1 - stock.cups;
    else if (missing === 'sugar') needed = sugarTbsp - stock.sugar;
    else needed = 1;
    alert(`Not enough ${formatKey(missing)}. Need ${needed} more.`);
    return;
  }

  stock.water -= neededWater;
  stock.milk  -= neededMilk;
  stock.beans -= neededBeans;
  stock.cups  -= 1;
  stock.sugar -= sugarTbsp;
  if (syrupFlavor !== 'none') stock[`syrup${capitalize(syrupFlavor)}`]--;

  const syrupCost = syrupFlavor === 'none' ? 0 : 1;
  const price = recipes[type].cost * sizes[size] + sugarTbsp * 0.10 + syrupCost;
  stock.money += price;

  alert(
    `Made a ${size} ${type} with ${sugarTbsp} tbsp sugar` +
    `${syrupFlavor!=='none'?` + ${syrupFlavor} syrup`:''}` +
    ` for $${price.toFixed(2)}`
  );
  updateState();
}

function fill() {
  ['water','milk','beans','cups','sugar'].forEach(r => {
    const v = parseInt(document.getElementById(r + 'In').value, 10) || 0;
    stock[r] += v;
  });
  ['syrupVanilla','syrupCaramel'].forEach(key => {
    const v = parseInt(document.getElementById(key + 'In').value, 10) || 0;
    stock[key] += v;
  });
  alert('Supplies added');
  updateState();
}

function take() {
  alert(`I gave you $${stock.money}`);
  stock.money = 0;
  updateState();
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function formatKey(k) {
  if (['water','milk','beans','cups','sugar'].includes(k)) return k;
  if (k.startsWith('syrup')) return k.replace('syrup','').toLowerCase() + ' syrup';
  return k;
}
