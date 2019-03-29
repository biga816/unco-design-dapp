export const WEB3 = {
  DEFAULT: 'https://mainnet.infura.io/v3/e057d93273374902ae044401f8099775',
  INFURA: {
    1: 'https://mainnet.infura.io/v3/e057d93273374902ae044401f8099775',
    3: 'https://ropsten.infura.io/v3/e057d93273374902ae044401f8099775',
    4: 'https://rinkeby.infura.io/v3/e057d93273374902ae044401f8099775',
    42: 'https://kovan.infura.io/v3/e057d93273374902ae044401f8099775'
  }
}

export const IPFS = {
  PROTOCOL: process.env.NUXT_ENV_ENDPOINT_IPFS_PROTOCOL,
  HOST: process.env.NUXT_ENV_ENDPOINT_IPFS_HOST,
  PORT: {
    API: process.env.NUXT_ENV_ENDPOINT_IPFS_API_PORT
  },
  GATEWAY: process.env.NUXT_ENV_ENDPOINT_IPFS_GATEWAY,
  API: {
    OBJECT: {
      GET: 'object/get'
    }
  }
}
