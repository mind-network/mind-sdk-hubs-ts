# Mind Network SDK For Hub Framework

The Mind Network SDK is a powerful TypeScript library designed to streamline interactions with the Mind Network Hub Framework contracts. It provides essential tools to work with core functionalities such as the FHE Key Registry and Member Pool.

---

## Installation

Install the SDK using npm or yarn:

```bash
npm install mind-hubs-sdk
```

---

## Usage

### 1. Initialize the SDK

Before using the SDK, initialize it with the required configuration:

```typescript
import { CoreContextManager } from 'mind-hubs-sdk'

CoreContextManager.initialize({
    fheKeyRegistryAddress: '0xFheKeyRegistryAddress', // Address of the FHE Key Registry contract
    memberPoolAddress: '0xMemberPoolAddress',         // Address of the Member Pool contract
    rpc: 'https://rpc.endpoint',                      // RPC URL for the Mind network
    chainID: 228                                      // Chain ID of the Mind network
})
```

### 2. Fetch an FHE Key Set

Use `fetchFheKeySet` to retrieve a key set by its `keyId`:

```typescript
import { fetchFheKeySet } from 'mind-hubs-sdk'

const keyId = BigInt(12345) // Replace with your desired keyId
const keySet = await fetchFheKeySet(keyId)

console.log('FHE Key Set:', keySet)
```

### 3. Get Voting Reward

Use `getVotingReward` to retrieve the voting reward for a specific wallet:

```typescript
import { getVotingReward } from 'mind-hubs-sdk'

const coldWalletAddress = '0xColdWalletAddress' // Replace with your wallet address
const reward = await getVotingReward(coldWalletAddress)

console.log('Voting Reward:', reward)
```

---

## Configuration Options

| Option                  | Type   | Description                              |
| ----------------------- | ------ | ---------------------------------------- |
| `fheKeyRegistryAddress` | string | Address of the FHE Key Registry contract |
| `memberPoolAddress`     | string | Address of the Member Pool contract      |
| `rpc`                   | string | RPC endpoint for the Mind network        |
| `chainID`               | number | Chain ID of the Mind network             |

---

## API Reference

### `initialize(config: CoreConfig): void`

Initializes the SDK with the given configuration.

- **`config`**: An object containing the following properties:
  - `fheKeyRegistryAddress` (string, required)
  - `memberPoolAddress` (string, required)
  - `rpc` (string, required)
  - `chainID` (number, required)

---

### `fetchFheKeySet(keyId: bigint): Promise<any>`

Fetches the FHE key set associated with the given `keyId`.

- **`keyId`**: The unique identifier of the key set (type `bigint`).

---

### `getVotingReward(coldWalletAddress: string): Promise<bigint>`

Fetches the voting reward for the given cold wallet address.

- **`coldWalletAddress`**: The wallet address (type `string`).

---

## License

MIT License
