import * as prismic from '@prismicio/client'

export const repositoryName = 'niblr'

// export const client = prismic.createClient(repositoryName, {
//   accessToken: 'MC5aZzFIQXhBQUFDUUF5RFRK.77-977-977-9We-_vQrvv73vv73vv71377-977-9AX_vv73vv70nUu-_ve-_ve-_vRnvv73vv71VEO-_vUR8Vk3vv70'
// })

//const testVariable = process.env.TEST;

export const client = (repositoryName, accessToken) => {
  return prismic.createClient(repositoryName, {
    accessToken: accessToken,
  });
};