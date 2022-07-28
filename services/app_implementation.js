const {
  getAllRegions,
  getPropertiesByRegion,
  getInvestableRegions,
} = require('./api.js');

/**
 * Do not modify this signature.
 * @param {string} top_level_region - The region that we want to view investable properties for.
 * @returns {Promise<{properties: Property[]}>}
 */
async function getInvestableProperties(top_level_region) {  
  const all_regions = await getAllRegions();
  const investable_regions = await getInvestableRegions();
  const regions_to_find = [];

  const top_level_region_hashmap = convertToHashmap(all_regions.regions, top_level_region, true);

  investable_regions.regions.forEach(investable_region => {
    let found_node = findChildNodeInHashmap(top_level_region_hashmap, investable_region);
    
    if (!found_node) {
      const investable_region_hashmap = convertToHashmap(all_regions.regions, investable_region, true);
      found_node = findChildNodeInHashmap(investable_region_hashmap, top_level_region);
    }

    if (found_node) {
      regions_to_find.push(found_node.key);
      loadAllChildrenNodeNames(found_node.value, regions_to_find);
    }
  });
  
  const regions_to_find_joined = regions_to_find.join(',');
  const properties = await getPropertiesByRegion(regions_to_find_joined);

  return properties;
}

function convertToHashmap(regions, parent, isRoot) {
  let hashmap = new Map();  

  const children = regions.filter(item => item.parent == parent);

  let childrenHashmap = new Map();
  children.forEach(item => {
    childrenHashmap.set(item.name, convertToHashmap(regions, item.name, false));
  });

  if (isRoot) {
    hashmap.set(parent, childrenHashmap);
  } else {
    hashmap = childrenHashmap;
  }

  return hashmap;
}

function findChildNodeInHashmap(hashmap, key) {
  const value = hashmap.get(key);
  if (value) {
    return { key: key, value: value };
  }

  const hashmapValues = hashmap.values();
  let result = null;  

  for (let item of hashmapValues) {
    result = findChildNodeInHashmap(item, key);

    if (result) {
      return result;
    }
  }

  return result;
}

function loadAllChildrenNodeNames(hashmap, nodeNames) {
  hashmap.forEach((value, key) => {
    nodeNames.push(key);

    loadAllChildrenNodeNames(value, nodeNames);
  });
}

module.exports = {
  getInvestableProperties
};
