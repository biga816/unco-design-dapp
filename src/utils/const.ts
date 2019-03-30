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

export const SUZURI = {
  ITEMS: [
    {
      name: 'Sticker',
      productId: '2696333',
      itemVariantId: '606',
      url: 'https://suzuri.jp/biga816/1269329/sticker/m/white',
      image:
        'https://d1q9av5b648rmv.cloudfront.net/v3/323x323/sticker/m/white/1269329/1534340804-385x460.png.jpg' +
        '?h=4049bd5583bc6404aa62ce9690531fc01f140ab9',
      price: 486
    },
    {
      name: 'Badge',
      productId: '2696291',
      itemVariantId: '851',
      url: 'https://suzuri.jp/biga816/1270922/can-badge/75mm/white',
      image:
        'https://d1q9av5b648rmv.cloudfront.net/v3/323x323/can-badge/75mm/white/1270922/1534426662-920x1100.png.jpg' +
        '?h=669850d952e465f13a0240df05ffdb95c7f5733b',
      price: 970
    },
    {
      name: 'T-shirt',
      productId: '2696276',
      itemVariantId: '1',
      url: 'https://suzuri.jp/biga816/1270900/t-shirt/s/white',
      image:
        'https://d1q9av5b648rmv.cloudfront.net/v3/323x323/t-shirt/s/white/1270900/1534425977-1923x2300.png.jpg' +
        '?h=50c656ed547865facd3db48c9ecdfca81c5cb52a',
      price: 3080
    },
    {
      name: 'Bag',
      productId: '2696292',
      itemVariantId: '81',
      url: 'https://suzuri.jp/biga816/1270922/tote-bag/m/natural',
      image:
        'https://d1q9av5b648rmv.cloudfront.net/v3/323x323/tote-bag/m/natural/1270922/1534426662-920x1100.png.jpg' +
        '?h=669850d952e465f13a0240df05ffdb95c7f5733b',
      price: 2030
    },
    {
      name: 'Note',
      productId: '2696293',
      itemVariantId: '601',
      url: 'https://suzuri.jp/biga816/1270922/note/m/white',
      image:
        'https://d1q9av5b648rmv.cloudfront.net/v3/323x323/note/m/white/1270922/1534426662-920x1100.png.jpg' +
        '?h=669850d952e465f13a0240df05ffdb95c7f5733b',
      price: 1375
    },
    {
      name: 'Towel',
      productId: '2696290',
      itemVariantId: '613',
      url: 'https://suzuri.jp/biga816/1270922/towel-handkerchief/l/white',
      image:
        'https://d1q9av5b648rmv.cloudfront.net/v3/323x323/towel-handkerchief/l/white/1270922/' +
        '1534426662-920x1100.png.jpg?h=669850d952e465f13a0240df05ffdb95c7f5733b',
      price: 1754
    }
  ]
}
