const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let error = false;
  let bigNum;
  let smallNum;
  let msgError = false;
  res.render("index", {
    title: "Roman numerals",
    smallNum,
    bigNum,
    error,
    msgError,
  });
});
// ========/test ===========
router.get("/test", function (req, res, next) {
  let numbSent = Number(req.query.number);
  let error;
  let response;
  let msgError;

  function romanNumeral(number) {
    const romanNb = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };

    let smallNb = "";
    let bigNb = "";

    if (number > 3999 && number <= 1000000) {
      for (const letterB in romanNb) {
        while (number >= romanNb[letterB] * 1000) {
          bigNb += letterB;
          number -= romanNb[letterB] * 1000;
        }
      }
    }
    if (number <= 3999) {
      for (const letter in romanNb) {
        while (number >= romanNb[letter]) {
          smallNb += letter;
          number -= romanNb[letter];
        }
      }
    }

    let resp = { smallNb, bigNb };
    return resp;
  }
  if (numbSent < 1 || numbSent > 1000000) {
    msgError = "Le nombre doit être entre 1 et 1000000";
    response = { smallNb: "", bigNb: "" };
    error = true;
  } else {
    response = romanNumeral(numbSent);
  }

  res.render("index", {
    title: "Roman numerals",
    smallNum: response.smallNb,
    bigNum: response.bigNb,
    error: error,
    msgError: msgError,
  });
});
module.exports = router;
