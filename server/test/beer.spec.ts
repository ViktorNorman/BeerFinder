var expect = require("chai").expect;
var rewire = require("rewire");
import { promises as fs } from "fs";
import { Beer } from "../app/models/beer";

//Rewire needed to access non exported (internal) functions
var beerFunctions = rewire("../app/beer/functions.ts");
var buildBeerNameParam = beerFunctions.__get__("buildBeerNameParam");
var mapBeerData = beerFunctions.__get__("mapBeerData");

describe("getBeers()", () => {
  describe("buildBeerNameParam() handles args correctly and build correct params", () => {
    it("should return '&beer_name=punk' when given searchTerm 'punk'", () => {
      const args = { searchTerm: "punk" };
      const expected = "&beer_name=punk";

      const res = buildBeerNameParam(args);
      expect(res).to.equal(expected);
    });

    it("should return '' when given searchTerm null", () => {
      const args = { searchTerm: null };
      const expected = "";

      const res = buildBeerNameParam(args);
      expect(res).to.equal(expected);
    });

    it("should return '&beer_name=punk_ipa' when given searchTerm 'punk ipa'", () => {
      const args = { searchTerm: "punk ipa" };
      const expected = "&beer_name=punk_ipa";

      const res = buildBeerNameParam(args);
      expect(res).to.equal(expected);
    });
  });

  describe("mapBeerData()", () => {
    const id121 = {
      id: 121,
      name: "Punk Monk",
      image_url: "https://images.punkapi.com/v2/keg.png",
      description:
        "Old world meets new in this trans-atlantic mash up of brewing ingredients. Belgian funk incorporates itself into the pithy, resin and grapefruit, with pineapple and banana rounding out a rambunctious avalanche of fruity hops.",
      food_pairing: ["Moules frites", "Thai green curry", "Lemon posset"],
    };

    const id192 = {
      id: 192,
      name: "Punk IPA 2007 - 2010",
      image_url: "https://images.punkapi.com/v2/192.png",
      description:
        "Our flagship beer that kick started the craft beer revolution. This is James and Martin's original take on an American IPA, subverted with punchy New Zealand hops. Layered with new world hops to create an all-out riot of grapefruit, pineapple and lychee before a spiky, mouth-puckering bitter finish.",
      food_pairing: [
        "Spicy carne asada with a pico de gallo sauce",
        "Shredded chicken tacos with a mango chilli lime salsa",
        "Cheesecake with a passion fruit swirl sauce",
      ],
    };

    it("should map correct given happy mock", async () => {
      const mockData = await readJson("./test/beer.happy.mock.json");
      const res = mapBeerData(mockData);
      const expected = [id121, id192];

      expect(res).to.have.deep.members(expected);
    });

    it("should map OK given sad mock", async () => {
      const mockData = await readJson("./test/beer.sad.mock.json");
      const res = mapBeerData(mockData);
      const expected = [id192];

      expect(res).to.have.deep.members(expected);
    });
    it("should map OK given empty mock", async () => {
      const mockData: Beer[] = [];
      const res = mapBeerData(mockData);
      const expected: Beer[] = [];

      expect(res).to.have.deep.members(expected);
    });
  });
});

// Function needed to read json in test file
export const readJson = async (path: string) => {
  const data = await fs.readFile(path, "binary");
  return JSON.parse(data);
};
