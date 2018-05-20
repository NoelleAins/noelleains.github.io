var WeatherFinder = {

getWeather(timeMillis, zone) {
   return this.weatherChances[zone](this.calculateForecastTarget(timeMillis));
},

calculateForecastTarget: function(timeMillis) { 
    // Thanks to Rogueadyn's SaintCoinach library for this calculation.
    // lDate is the current local time.

    var unixSeconds = parseInt(timeMillis / 1000);
    // Get Eorzea hour for weather start
    var bell = unixSeconds / 175;

    // Do the magic 'cause for calculations 16:00 is 0, 00:00 is 8 and 08:00 is 16
    var increment = (bell + 8 - (bell % 8)) % 24;

    // Take Eorzea days since unix epoch
    var totalDays = unixSeconds / 4200;
    totalDays = (totalDays << 32) >>> 0; // Convert to uint

    // 0x64 = 100
    var calcBase = totalDays * 100 + increment;

    // 0xB = 11
    var step1 = ((calcBase << 11) ^ calcBase) >>> 0;
    var step2 = ((step1 >>> 8) ^ step1) >>> 0;

    // 0x64 = 100
    return step2 % 100;
},

getEorzeaHour: function(timeMillis) {
    var unixSeconds = parseInt(timeMillis / 1000);
    // Get Eorzea hour
    var bell = (unixSeconds / 175) % 24;
    return Math.floor(bell);
},

getWeatherTimeFloor: function(date) {
    var unixSeconds = parseInt(date.getTime() / 1000);
    // Get Eorzea hour for weather start
    var bell = (unixSeconds / 175) % 24;
    var startBell = bell - (bell % 8);
    var startUnixSeconds = unixSeconds - (175 * (bell - startBell));
    return new Date(startUnixSeconds * 1000);
},

weatherChances: {
"Limsa Lominsa": function(chance) { if (chance < 20) { return "曇り"; } else if (chance < 50) { return "快晴"; } else if (chance < 80) { return "晴れ"; } else if (chance < 90) { return "霧"; } else { return "雨"; } },
"Middle La Noscea": function(chance) { if (chance < 20) { return "曇り"; } else if (chance < 50) { return "快晴"; } else if (chance < 70) { return "晴れ"; } else if (chance < 80) { return "風"; } else if (chance < 90) { return "霧"; } else { return "雨"; } },
"Lower La Noscea": function(chance) { if (chance < 20) { return "曇り"; } else if (chance < 50) { return "快晴"; } else if (chance < 70) { return "晴れ"; } else if (chance < 80) { return "風"; } else if (chance < 90) { return "霧"; } else { return "雨"; } },
"Eastern La Noscea": function(chance) { if (chance < 5) { return "霧"; } else if (chance < 50) { return "快晴"; } else if (chance < 80) { return "晴れ"; } else if (chance < 90) { return "曇り"; } else if (chance < 95) { return "雨"; } else { return "暴雨"; } },
"Western La Noscea": function(chance) { if (chance < 10) { return "霧"; } else if (chance < 40) { return "快晴"; } else if (chance < 60) { return "晴れ"; } else if (chance < 80) { return "曇り"; } else if (chance < 90) { return "風"; } else { return "暴風"; } },
"Upper La Noscea": function(chance) { if (chance < 30) { return "快晴"; } else if (chance < 50) { return "晴れ"; } else if (chance < 70) { return "曇り"; } else if (chance < 80) { return "霧"; } else if (chance < 90) { return "雷"; } else { return "雷雨"; } },
"Outer La Noscea": function(chance) { if (chance < 30) { return "快晴"; } else if (chance < 50) { return "晴れ"; } else if (chance < 70) { return "曇り"; } else if (chance < 85) { return "霧"; } else { return "雨"; } },
"Mist": function(chance) { if (chance < 20) { return "曇り"; } else if (chance < 50) { return "快晴"; } else if (chance < 70) { return "晴れ"; } else if (chance < 80) { return "晴れ"; } else if (chance < 90) { return "霧"; } else { return "雨"; } },
"Gridania": function(chance) { if (chance < 5) { return "雨"; } else if (chance < 20) { return "雨"; } else if (chance < 30) { return "霧"; } else if (chance < 40) { return "曇り"; } else if (chance < 55) { return "晴れ"; } else if (chance < 85) { return "快晴"; } else { return "晴れ"; } },
"Central Shroud": function(chance) { if (chance < 5) { return "雷"; } else if (chance < 20) { return "雨"; } else if (chance < 30) { return "霧"; } else if (chance < 40) { return "曇り"; } else if (chance < 55) { return "晴れ"; } else if (chance < 85) { return "快晴"; } else { return "晴れ"; } },
"East Shroud": function(chance) { if (chance < 5) { return "雷"; } else if (chance < 20) { return "雨"; } else if (chance < 30) { return "霧"; } else if (chance < 40) { return "曇り"; } else if (chance < 55) { return "晴れ"; } else if (chance < 85) { return "快晴"; } else { return "晴れ"; } },
"South Shroud": function(chance) { if (chance < 5) { return "霧"; } else if (chance < 10) { return "雷雨"; } else if (chance < 25) { return "雷"; } else if (chance < 30) { return "霧"; } else if (chance < 40) { return "曇り"; } else if (chance < 70) { return "晴れ"; } else { return "快晴"; } },
"North Shroud": function(chance) { if (chance < 5) { return "霧"; } else if (chance < 10) { return "暴雨"; } else if (chance < 25) { return "雨"; } else if (chance < 30) { return "霧"; } else if (chance < 40) { return "曇り"; } else if (chance < 70) { return "晴れ"; } else { return "快晴"; } },
"The Lavender Beds": function(chance) { if (chance < 5) { return "曇り"; } else if (chance < 20) { return "雨"; } else if (chance < 30) { return "霧"; } else if (chance < 40) { return "曇り"; } else if (chance < 55) { return "晴れ"; } else if (chance < 85) { return "快晴"; } else { return "晴れ"; } },
"Ul'dah": function(chance) { if (chance < 40) { return "快晴"; } else if (chance < 60) { return "晴れ"; } else if (chance < 85) { return "曇り"; } else if (chance < 95) { return "霧"; } else { return "雨"; } },
"Western Thanalan": function(chance) { if (chance < 40) { return "快晴"; } else if (chance < 60) { return "晴れ"; } else if (chance < 85) { return "曇り"; } else if (chance < 95) { return "霧"; } else { return "雨"; } },
"Central Thanalan": function(chance) { if (chance < 15) { return "砂塵"; } else if (chance < 55) { return "快晴"; } else if (chance < 75) { return "晴れ"; } else if (chance < 85) { return "曇り"; } else if (chance < 95) { return "霧"; } else { return "雨"; } },
"Eastern Thanalan": function(chance) { if (chance < 40) { return "快晴"; } else if (chance < 60) { return "晴れ"; } else if (chance < 70) { return "曇り"; } else if (chance < 80) { return "霧"; } else if (chance < 85) { return "雨"; } else { return "暴雨"; } },
"Southern Thanalan": function(chance) { if (chance < 20) { return "灼熱波"; } else if (chance < 60) { return "快晴"; } else if (chance < 80) { return "晴れ"; } else if (chance < 90) { return "曇り"; } else { return "霧"; } },
"Northern Thanalan": function(chance) { if (chance < 5) { return "快晴"; } else if (chance < 20) { return "晴れ"; } else if (chance < 50) { return "曇り"; } else { return "霧"; } },
"The Goblet": function(chance) { if (chance < 40) { return "快晴"; } else if (chance < 60) { return "晴れ"; } else if (chance < 85) { return "曇り"; } else if (chance < 95) { return "霧"; } else { return "雨"; } },
"Mor Dhona": function(chance) {if (chance < 15) {return "曇り";}  else if (chance < 30) {return "霧";}  else if (chance < 60) {return "妖霧";}  else if (chance < 75) {return "快晴";}  else {return "晴れ";}},
"Ishgard": function(chance) {if (chance < 60) {return "雪";}  else if (chance < 70) {return "晴れ";}  else if (chance < 75) {return "快晴";}  else if (chance < 90) {return "曇り";}  else {return "霧";}},
"Coerthas Central Highlands": function(chance) {if (chance < 20) {return "吹雪";}  else if (chance < 60) {return "雪";}  else if (chance < 70) {return "晴れ";}  else if (chance < 75) {return "快晴";}  else if (chance < 90) {return "曇り";}  else {return "霧";}},
"Coerthas Western Highlands": function(chance) {if (chance < 20) {return "吹雪";}  else if (chance < 60) {return "雪";}  else if (chance < 70) {return "晴れ";}  else if (chance < 75) {return "快晴";}  else if (chance < 90) {return "曇り";}  else {return "霧";}},
"The Sea of Clouds": function(chance) {if (chance < 30) {return "快晴";}  else if (chance < 60) {return "晴れ";}  else if (chance < 70) {return "曇り";}  else if (chance < 80) {return "霧";}  else if (chance < 90) {return "風";}  else {return "霊風";}},
"Azys Lla": function(chance) {if (chance < 35) {return "晴れ";}  else if (chance < 70) {return "曇り";}  else {return "雷";}},
"The Dravanian Forelands": function(chance) {if (chance < 10) {return "曇り";}  else if (chance < 20) {return "霧";}  else if (chance < 30) {return "雷";}  else if (chance < 40) {return "砂塵";}  else if (chance < 70) {return "快晴";}  else {return "晴れ";}},
"The Dravanian Hinterlands": function(chance) {if (chance < 10) {return "曇り";}  else if (chance < 20) {return "霧";}  else if (chance < 30) {return "雨";}  else if (chance < 40) {return "暴雨";}  else if (chance < 70) {return "快晴";}  else {return "晴れ";}},
"The Churning Mists": function(chance) {if (chance < 10) {return "曇り";}  else if (chance < 20) {return "暴風";}  else if (chance < 40) {return "放電";}  else if (chance < 70) {return "快晴";}  else {return "晴れ";}},
"Idyllshire": function(chance) {if (chance < 10) {return "曇り";}  else if (chance < 20) {return "霧";}  else if (chance < 30) {return "雨";}  else if (chance < 40) {return "暴雨";}  else if (chance < 70) {return "快晴";}  else {return "晴れ";}},
// Data format changed from aggregate to marginal breakpoints
"Rhalgr's Reach": function(chance) { if ((chance -= 15) < 0) { return "快晴"; } else if ((chance -= 45) < 0) { return "晴れ"; } else if ((chance -= 20) < 0) { return "曇り"; } else if ((chance -= 10) < 0) { return "霧"; } else { return "雷"; } },
"The Fringes": function(chance) { if ((chance -= 15) < 0) { return "快晴"; } else if ((chance -= 45) < 0) { return "晴れ"; } else if ((chance -= 20) < 0) { return "曇り"; } else if ((chance -= 10) < 0) { return "霧"; } else { return "雷"; } },
"The Peaks": function(chance) { if ((chance -= 10) < 0) { return "快晴"; } else if ((chance -= 50) < 0) { return "晴れ"; } else if ((chance -= 15) < 0) { return "曇り"; } else if ((chance -= 10) < 0) { return "霧"; } else if ((chance -= 10) < 0) { return "風"; } else { return "砂塵"; } },
"The Lochs": function(chance) { if ((chance -= 20) < 0) { return "快晴"; } else if ((chance -= 40) < 0) { return "晴れ"; } else if ((chance -= 20) < 0) { return "曇り"; } else if ((chance -= 10) < 0) { return "霧"; } else { return "雷雨"; } },
"Kugane": function(chance) { if ((chance -= 10) < 0) { return "雨"; } else if ((chance -= 10) < 0) { return "霧"; } else if ((chance -= 20) < 0) { return "曇り"; } else if ((chance -= 40) < 0) { return "晴れ"; } else { return "快晴"; } },
"The Ruby Sea": function(chance) { if ((chance -= 10) < 0) { return "雷"; } else if ((chance -= 10) < 0) { return "風"; } else if ((chance -= 15) < 0) { return "曇り"; } else if ((chance -= 40) < 0) { return "晴れ"; } else { return "快晴"; } },
"Yanxia": function(chance) { if ((chance -= 5) < 0) { return "暴雨"; } else if ((chance -= 10) < 0) { return "雨"; } else if ((chance -= 10) < 0) { return "霧"; } else if ((chance -= 15) < 0) { return "曇り"; } else if ((chance -= 40) < 0) { return "晴れ"; } else { return "快晴"; } },
"The Azim Steppe": function(chance) { if ((chance -= 5) < 0) { return "暴風"; } else if ((chance -= 5) < 0) { return "風"; } else if ((chance -= 7) < 0) { return "雨"; } else if ((chance -= 8) < 0) { return "霧"; } else if ((chance -= 10) < 0) { return "曇り"; } else if ((chance -= 40) < 0) { return "晴れ"; } else { return "快晴"; } },
"Eureka": function(chance) { if ((chance -= 30) < 0) { return "晴れ"; } else if ((chance -= 30) < 0) { return "暴風"; } else if ((chance -= 30) < 0) { return "暴雨"; } else { return "雪"; } }
},

weatherLists: {
"Limsa Lominsa": ["曇り","快晴","晴れ","霧","雨"],
"Middle La Noscea": ["曇り","快晴","晴れ","風","霧","雨"],
"Lower La Noscea": ["曇り","快晴","晴れ","風","霧","雨"],
"Eastern La Noscea": ["霧","快晴","晴れ","曇り","雨","暴雨"],
"Western La Noscea": ["霧","快晴","晴れ","曇り","風","暴風"],
"Upper La Noscea": ["快晴","晴れ","曇り","霧","雷","雷雨"],
"Outer La Noscea": ["快晴","晴れ","曇り","霧","雨" ],
"Mist": ["曇り","快晴","晴れ","霧","雨" ],
"Gridania": ["雨","霧","曇り","晴れ","快晴"],
"Central Shroud": ["雷","雨","霧","曇り","晴れ","快晴"],
"East Shroud": ["雷","雨","霧","曇り","晴れ","快晴"],
"South Shroud": ["霧","雷雨","雷","曇り","晴れ","快晴"],
"North Shroud": ["霧","暴雨","雨","曇り","晴れ","快晴"],
"The Lavender Beds": ["曇り","雨","霧","晴れ","快晴"],
"Ul'dah": ["快晴","晴れ","曇り","霧","雨"],
"Western Thanalan": ["快晴","晴れ","曇り","霧","雨"],
"Central Thanalan": ["砂塵","快晴","晴れ","曇り","霧","雨"],
"Eastern Thanalan": ["快晴","晴れ","曇り","霧","雨","暴雨"],
"Southern Thanalan": ["灼熱波","快晴","晴れ","曇り","霧"],
"Northern Thanalan": ["快晴","晴れ","曇り","霧"],
"The Goblet": ["快晴","晴れ","曇り","霧","雨"],
"Mor Dhona": ["曇り", "霧", "妖霧", "快晴", "晴れ"],
"Ishgard": ["雪", "晴れ", "快晴", "曇り", "霧"],
"Coerthas Central Highlands": ["吹雪", "雪", "晴れ", "快晴", "曇り", "霧"],
"Coerthas Western Highlands": ["吹雪", "雪", "晴れ", "快晴", "曇り", "霧"],
"The Sea of Clouds": ["快晴", "晴れ", "曇り", "霧", "風", "霊風"],
"Azys Lla": ["晴れ", "曇り", "雷"],
"The Dravanian Forelands": ["曇り", "霧", "雷", "砂塵", "快晴", "晴れ"],
"The Dravanian Hinterlands": ["曇り", "霧", "雨", "暴雨", "快晴", "晴れ"],
"The Churning Mists": ["曇り", "暴風", "放電", "快晴", "晴れ"],
"Idyllshire": ["曇り", "霧", "雨", "暴雨", "快晴", "晴れ"],
"Rhalgr's Reach": ["快晴","晴れ","曇り","霧","雷"],
"The Fringes": ["快晴","晴れ","曇り","霧","雷"],
"The Peaks": ["快晴","晴れ","曇り","霧","風","砂塵"],
"The Lochs": ["快晴","晴れ","曇り","霧","雷雨"],
"Kugane": ["雨","霧","曇り","晴れ","快晴"],
"The Ruby Sea": ["雷","風","曇り","晴れ","快晴"],
"Yanxia": ["暴雨","雨","霧","曇り","晴れ","快晴"],
"The Azim Steppe": ["暴風","風","雨","霧","曇り","晴れ","快晴"],
"Eureka": ["晴れ", "暴風", "暴雨", "雪"]
}
};
