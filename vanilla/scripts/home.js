const iconPath = './images/icons/icon/';
async function getRates(tokens){
    const rates = await Promise.all(tokens.map((token) => getPairRate({ base: token, quote: "USD" }).then(r => r))).then((data) => {
        const newRates = {}
        const givenRates = data;
        givenRates.forEach((r, i) => {
          newRates[r[0].id] = r[r.length - 1]
        })
        return newRates;
    })

    return rates;
}
document.addEventListener("DOMContentLoaded", async () => {
    const preferedTokens = ["ETH", "BNB", "MATIC", "WBTC", "UNI", "SUSHI", "ZRX"];
    const icons = {
      "ETH": "eth.png",
      "BNB": "bnb.png",
      "MATIC": "matic.png",
      "WBTC": "wbtc.png",
      "UNI": "uni.png",
      "SUSHI": "sushi.png",
      "ZRX": "zrx.png"
    };
  
    const colors = {
      "ETH": "blue",
      "BNB": "yellow",
      "MATIC": "purple",
      "WBTC": "black",
      "UNI": "pink",
      "SUSHI": "pink",
      "ZRX": "black"
    };
      
    const rates = await getRates(preferedTokens)
  
    const homeTokens = preferedTokens.map(token => {
        return {
          id: token,
          icon: icons[token],
          color: colors[token]
        };
      });
  
      const tokenGrid = document.getElementById("tokenGrid");
  
      homeTokens.forEach(token => {
        const card = document.createElement("a");
        card.classList.add("card", token.color, "p-4", "pt-0");
        card.setAttribute("href",`/trade/${token.id}-USD`);
  
        const title = document.createElement("h2");
        title.classList.add("text-2xl", "self-start", "font-bold", "uppercase");
        title.textContent = token.id;
  
        const subtitle = document.createElement("h2");
        subtitle.classList.add("text-sm", "font-bold", "self-start");
        subtitle.textContent = Intl.NumberFormat("US-en", { currency: "USD", style: "currency" }).format(rates[token.id].rate_close);
  
        const circleDiv = document.createElement("div");
        circleDiv.classList.add("circle", "mb-4");
        const img = document.createElement("img");
        img.src = `${iconPath}${token.icon}`;
        img.setAttribute("width", "64px");
        img.setAttribute("height", "72px");
        circleDiv.appendChild(img);

        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        const percentage = document.createElement("h2");
        percentage.textContent = `${((rates[token.id].rate_close - rates[token.id].rate_open) / rates[token.id].rate_close * 100).toFixed(2)}%`
  
        card.appendChild(title);
        card.appendChild(subtitle);
        card.appendChild(overlay);
        card.appendChild(circleDiv);
        card.appendChild(percentage);
  
        tokenGrid.appendChild(card);
      });
  });
  