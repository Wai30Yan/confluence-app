import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

resolver.define('getText', (req) => {
  // console.log(req);

  return 'Hello, world!';
});

resolver.define('getPages', async (req) => {
  console.log(req)
  const response = await api.asApp().requestConfluence(route`/wiki/rest/api/content`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  
  console.log(`Response: ${response.status} ${response.statusText}`);
  const data = await response.json()
  const { results } = data

  return results
})


resolver.define('deletePage', async (req) => {
  const response = await api.asApp().requestConfluence(route`/wiki/rest/api/content/${id}`, {
    method: 'DELETE'
  });
  
  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.text());
})

export const handler = resolver.getDefinitions();