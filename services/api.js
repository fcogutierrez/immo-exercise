/* ************************************************************************
 * AVAILABLE API FUNCTIONS -- DO NOT MODIFY THIS FILE                     *
 * ************************************************************************ */

/**
 * Dummy function to mock a delay in API requests.
 * @param {number} milliseconds
 * @returns {Promise<void>}
 */
function waitFor(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

/**
 * @typedef {Object} Region
 * @property {string} parent - A parent region name
 * @property {string} name - The name of the region
 */

/**
 * @typedef {object} Property
 * @property {string} address - The full address for a property
 * @property {string} region - The region this property belongs to
 */

/**
 * Returns a promise that returns an array of region objects, containing a parent region (or "" at the top level),
 * creating a hierarchical tree of data.
 * Responses can take anywhere up to 1.5s to return. This example uses a tree 4 levels deep, but your submission will
 * be tested against a dataset that contains an unknown number of layers (so don't solve for this particular data).
 *
 * @returns {Promise<{regions: Region[]}>}
 */
async function getAllRegions() {
  const regions = {
    regions: [
      { name: 'blackrod', parent: 'bolton' },
      { name: 'bolton', parent: 'manchester' },
      { name: 'bury', parent: 'manchester' },
      { name: 'camden', parent: 'central london' },
      { name: 'camden town', parent: 'camden' },
      { name: 'central london', parent: 'london' },
      { name: 'covent garden', parent: 'westminster' },
      { name: 'croydon', parent: 'south-west london' },
      { name: 'east london', parent: 'london' },
      { name: 'farnworth', parent: 'bolton' },
      { name: 'hatton garden', parent: 'camden' },
      { name: 'heywood', parent: 'rochdale' },
      { name: 'holborn', parent: 'camden' },
      { name: 'kensington and chelsea', parent: 'london' },
      { name: 'kew', parent: 'richmond upon thames' },
      { name: 'kingston upon thames', parent: 'south-west london' },
      { name: 'london', parent: '' },
      { name: 'manchester', parent: '' },
      { name: 'middleton', parent: 'rochdale' },
      { name: 'north london', parent: 'london' },
      { name: 'oldham', parent: 'manchester' },
      { name: 'richmond upon thames', parent: 'south-west london' },
      { name: 'rochdale', parent: 'manchester' },
      { name: 'south london', parent: 'london' },
      { name: 'south-west london', parent: 'london' },
      { name: 'twickenham', parent: 'richmond upon thames' },
      { name: 'west london', parent: 'london' },
      { name: 'westminster', parent: 'central london' },
      { name: 'wimbledon', parent: 'south-west london' },
    ],
  };

  await waitFor(Math.random() * 1500);

  return regions;
}

/**
 * Takes a CSV of permissible regions and returns a promise containing all properties that directly
 * match any of the regions provided in the comma separated string.
 * Assume that there are some regions that might cause unexpected errors - there are tickets in the bug tracker to
 * deal with these at a later date. As a result, some requests may be rejected with an error object.

 * @param {string} regions - CSV list of regions to request properties for
 * @returns {Promise<{properties: Property[]}>}
 */
async function getPropertiesByRegion(regions) {
  const properties = {
    properties: [
      { address: 'Whitton Rd, Twickenham TW2 7BA', region: 'twickenham' },
      { address: 'Royal Botanic Gardens, Kew, Richmond, Surrey, TW9 3AE', region: 'kew' },
      { address: 'Plough Ln, London SW17 0BL', region: 'wimbledon' },
      { address: 'Stables Market, Chalk Farm Road, London NW1', region: 'camden town' },
      { address: 'Westminster, London SW1A 0AA', region: 'westminster' },
      { address: 'The Esplanade, Rochdale OL16 1AQ', region: 'rochdale' },
      { address: 'The Old Town Hall, Parliament Square, Greaves Street, Oldham, OL1 1QN', region: 'oldham' },
      { address: 'Castle House, Castle Rd, Bury BL9 8QT', region: 'bury' },
    ],
  };

  const properties_to_return = {
    properties: [],
  };

  const array_of_regions = regions.split(',');
  const number_of_regions_requested = (array_of_regions.length || 1);

  for (const desired_region of array_of_regions) {
    const matching_properties = properties.properties.filter(record => record.region === desired_region);
    properties_to_return.properties.push(...matching_properties);
  }

  await waitFor(Math.random() * 1000 * number_of_regions_requested);

  return properties_to_return;
}

/**
 * Returns a collection of regions, or region-descendents, that are currently being invested in.
 *
 * @returns {Promise<{regions: string[]}>}
 */
async function getInvestableRegions() {
  const investable_regions = {
    regions: [ 'camden', 'kew', 'rochdale' ],
  };

  await waitFor(Math.random() * 3000);

  return investable_regions;
}

/**
 * Simple function to display your results.
 * @param {any} data
 */
function displayResults(data) {
  console.log(data);
}

module.exports = {
  getAllRegions,
  getPropertiesByRegion,
  getInvestableRegions,
  displayResults,
};