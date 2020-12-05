const fs = require("fs");

console.log(String(fs.readFileSync("input.txt"))
    .split(/\n\n/g)
    .map(passport => JSON.parse(`{\"${passport.replace("\n", " ").replace(/ /g, ",").replace(/\n/g, ",").replace(/:/g, "\":\"").replace(/,/g, "\",\"")}\"}`))
    .map(passport => Object.keys(passport).sort((a, b) => a < b)).filter(passport => passport.includes("byr") && passport.includes("iyr") && passport.includes("eyr") && passport.includes("hgt") && passport.includes("hcl") && passport.includes("ecl") && passport.includes("pid"))
    .length
);

console.log(String(fs.readFileSync("input.txt"))
    .split(/\n\n/g)
    .map(passport => JSON.parse(`{\"${passport.replace("\n", " ").replace(/ /g, ",").replace(/\n/g, ",").replace(/:/g, "\":\"").replace(/,/g, "\",\"")}\"}`))
    .filter(passport => Object.keys(passport).includes("byr") && passport["byr"].length >= 4 && Number(passport["byr"]) >= 1920 && Number(passport["byr"]) <= 2002 && Object.keys(passport).includes("iyr") && passport["iyr"].length >= 4 && Number(passport["iyr"]) >= 2010 && Number(passport["iyr"]) <= 2020 && Object.keys(passport).includes("eyr") && passport["eyr"].length >= 4 && Number(passport["eyr"]) >= 2020 && Number(passport["eyr"]) <= 2030 && Object.keys(passport).includes("hgt") && ((passport["hgt"].includes("in") && Number(passport["hgt"].split("").filter(x => Number(x)).join("")) >= 59 && Number(passport["hgt"].split("").filter(x => Number(x)).join("")) <= 76) || (passport["hgt"].includes("cm") && Number(passport["hgt"].split("").filter(x => Number(x)).join("")) >= 150 && Number(passport["hgt"].split("").filter(x => Number(x)).join("")) <= 193))  && Object.keys(passport).includes("hcl") && passport["hcl"].length == 7 && passport["hcl"][0] === '#' && Object.keys(passport).includes("ecl") && ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(passport["ecl"]) && Object.keys(passport).includes("pid") && passport["pid"].length == 9)
    .length
);
