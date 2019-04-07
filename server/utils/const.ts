export const NODE = {
  ERC20: {
    ABI: [
      {
        constant: true,
        inputs: [
          {
            name: 'tokenId',
            type: 'uint256'
          }
        ],
        name: 'tokenURI',
        outputs: [
          {
            name: '',
            type: 'string'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0xc87b56dd'
      }
    ]
  }
}
