export const WEB3 = {
  DEFAULT: 'https://mainnet.infura.io/1jyxaSVQd74TDQH6IHbe',
  INFURA: {
    1: 'https://mainnet.infura.io/1jyxaSVQd74TDQH6IHbe',
    3: 'https://ropsten.infura.io/1jyxaSVQd74TDQH6IHbe',
    4: 'https://rinkeby.infura.io/1jyxaSVQd74TDQH6IHbe',
    42: 'https://kovan.infura.io/1jyxaSVQd74TDQH6IHbe'
  }
}

export const IPFS = {
  PROTOCOL: process.env.NUXT_ENV_ENDPOINT_IPFS_PROTOCOL,
  HOST: process.env.NUXT_ENV_ENDPOINT_IPFS_HOST,
  PORT: {
    API: process.env.NUXT_ENV_ENDPOINT_IPFS_API_PORT,
    GATEWAY: process.env.NUXT_ENV_ENDPOINT_IPFS_GATEWAY_PORT
  },
  API: {
    OBJECT: {
      GET: 'object/get'
    }
  }
}
