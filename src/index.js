import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

resolver.define('getText', (req) => {
  // console.log(req);

  return 'Hello, world!';
});

resolver.define('getCurrentUser', async (req) => {
  const response = await api.asApp().requestConfluence(route`/wiki/rest/api/user/current`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  const user = await response.json();
  return user
})

resolver.define('createPage', async (req) => {
  console.log(req.payload)
  const { pageTitle, spaceKey } = req.payload.newPage

  const response = await api.asApp().requestConfluence(route`/wiki/rest/api/space/${spaceKey}`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  
  const spaceObject = await response.json()
  const bodyData = {
    title: pageTitle,
    type: 'page',
    status: 'current',
    space: spaceObject
  }
  const res = await api.asApp().requestConfluence(route`/wiki/rest/api/content`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyData)
  });
  const data = res.json()
  console.log(data)
})

resolver.define('getPages', async (req) => {
  const response = await api.asApp().requestConfluence(route`/wiki/rest/api/content`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  
  const data = await response.json()
  const { results } = data

  return results
})

resolver.define('getSpaces', async (req) => {
  const response = await api.asApp().requestConfluence(route`/wiki/rest/api/space`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  
  const { results } = await response.json()
  console.log(results)
  return results
})

// resolver.define('getSpace', async (req) => {
//   const response = await api.asApp().requestConfluence(route`/wiki/rest/api/space/${key}`, {
//     headers: {
//       'Accept': 'application/json'
//     }
//   });
  
//   const space = await response.json()
//   console.log(space)
//   return space
// })

resolver.define('getChildren', async (req) => {
  const { pageID } = req.payload
  const response = await api.asApp().requestConfluence(route`/wiki/rest/api/content/${pageID}/child?expand=page`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  const { page } = await response.json()
  const { results } = page
  console.log(results);
  return results
})

resolver.define('getChildrenOfAllPages', async (req) => {
  const { pageIDs } = req.payload
  const map = new Map()
  for (let i of pageIDs) {
    const response = await api.asApp().requestConfluence(route`/wiki/rest/api/content/${i}/child?expand=page`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    const { page } = await response.json()
    const { results } = page
    if (results.length > 0) {
      map.set(i, results)
    } else {
      map.set(i, 'this page have no child')
    }
  }
  
  // for (let i of pageIDs) {
  //   console.log(i, map.get(i))
  // }
  return { map }
})


resolver.define('deletePage', async (req) => {
  const { pageID } = req.payload
  console.log(req)
  const response = await api.asApp().requestConfluence(route`/wiki/rest/api/content/${pageID}`, {
    method: 'DELETE'
  });
  
  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.text());
})

export const handler = resolver.getDefinitions();