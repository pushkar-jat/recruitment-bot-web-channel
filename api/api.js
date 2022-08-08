const axios = require("axios");
const NodeCache = require("node-cache");
const myCache = new NodeCache();
const logger = require("winston");

const token =
  "ne4X45IZhcRxv7oYu_XmKwTCScWjllgWQK2sCt2w9j5kS-nT99_WJNqbGhvvGCtDT0E";

module.exports.getCountryList = async function () {
  try {
    var countryList = myCache.get("countryList");
    if (countryList == undefined) {
      var response = await getAuthToken();
      const URL = "https://www.universal-tutorial.com/api/countries/";
      let config = {
        headers: {
          Authorization: `Bearer ${response.data.auth_token}`,
          Accept: "application/json",
        },
      };
      const res = await axios.get(URL, config);
      const countryNames = res.data.map((country) => country.country_name);
      myCache.set("countryList", countryNames);
      countryList = countryNames;
    }
    return countryList;
  } catch (err) {
    logger.error(`get country list api failed due to error:${err}`);
  }
};

module.exports.getStateList = async function (countryName) {
  try {
    var stateList = myCache.get("stateList" + countryName);
    if (stateList == undefined) {
      var response = await getAuthToken();
      const URL = `https://www.universal-tutorial.com/api/states/${countryName}`;
      let config = {
        headers: {
          Authorization: `Bearer ${response.data.auth_token}`,
          Accept: "application/json",
        },
      };
      const res = await axios.get(URL, config);
      const stateNames = res.data.map((state) => state.state_name);
      myCache.set("stateList" + countryName, stateNames);
      stateList = stateNames;
    }
    return stateList;
  } catch (err) {
    logger.error(`get state list api failed due to error:${err}`);
  }
};

module.exports.getCityList = async function (stateName) {
  try {
    var cityList = myCache.get("cityList" + stateName);
    if (cityList == undefined) {
      var response = await getAuthToken();
      const URL = `https://www.universal-tutorial.com/api/cities/${stateName}`;
      let config = {
        headers: {
          Authorization: `Bearer ${response.data.auth_token}`,
          Accept: "application/json",
        },
      };
      const res = await axios.get(URL, config);
      const cityNames = res.data.map((city) => city.city_name);
      myCache.set("cityList" + stateName, cityNames);
      cityList = cityNames;
    }
    return cityList;
  } catch (err) {
    logger.error(`get city list api failed due to error:${err}`);
  }
};

async function getAuthToken() {
  try {
    var config = {
      headers: {
        Accept: "application/json",
        "api-token": token,
        "user-email": "dev.pushkarjat@gmail.com",
      },
    };
    const URL = "https://www.universal-tutorial.com/api/getaccesstoken";
    const res = await axios.get(URL, config);
    return res;
  } catch (err) {
    logger.error(`get auth token api failed due to error:${err}`);
  }
}
