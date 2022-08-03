## Investable Properties
### How to run
Please use the commands `npm install` to install all the dependencies and `npm run start` to  run the server, which will be listening in **port 3000**.

Once the server is running, you can perform a GET operation from the browser or any other HTTP client:
`http://localhost:3000/getInvestableProperties/{top_level_region}`

Example:
`http://localhost:3000/getInvestableProperties/london`

### Remarks
This solution has been developed using a hash map approach.
The following logic has been implemented:
- It creates a tree with the `top_level_region` as root
- It starts to iterate between all the investable regions.
  - If the investable region is a child, then we add the investable region name and all it's children to the `regions_to_find` array.
  - If the investable region is a parent, then we add the `top_level_region` and all it's children to the `regions_to_find` array.
  - At any other case, we ignore it.
- Once the iteration ends, the `regions_to_find` array (once it's joined with comma as separator) it's used to call the `getPropertiesByRegion` method.
- Result is returned to client.
