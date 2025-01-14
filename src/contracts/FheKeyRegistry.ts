import { Contract } from 'ethers'
import { CoreContextManager } from '../context'
import abi from '../abi/FheKeyRegistry.json'
import { FheKeyRegistry } from '../typechain/FheKeyRegistry'
import logger from '../logger'

/**
 * A singleton instance of the FheKeyRegistry contract.
 * It will be initialized lazily upon the first access.
 */
let fheKeyRegistryContract: FheKeyRegistry | null = null

/**
 * Ensures that the FheKeyRegistry contract is initialized
 * This must be called after the CoreContextManager has been initialized
 * 
 * @returns The initialized FheKeyRegistry contract instance
 */
function ensureFheKeyRegistryContract(): FheKeyRegistry {
    if (!fheKeyRegistryContract) {
        const config = CoreContextManager.getConfiguration()
        const context = CoreContextManager.getContext()

        fheKeyRegistryContract = new Contract(
            config.fheKeyRegistryAddress,
            abi,
            context.jsonRpcProvider
        ) as unknown as FheKeyRegistry

        logger.info({
            msg: 'FheKeyRegistry contract initialized',
            address: config.fheKeyRegistryAddress
        })
    }

    return fheKeyRegistryContract
}

/**
 * Fetches the FHE key set from the FheKeyRegistry contract
 * 
 * @param keyId - The unique identifier of the FHE key set
 * @returns A promise resolving to the FHE key set associated with the provided keyId
 * @throws {Error} If there is an issue fetching the key set
 */
export async function fetchFheKeySet(keyId: bigint): Promise<any> {
    try {
        const contract = ensureFheKeyRegistryContract()
        const result = await contract.fheKeySets(keyId)

        logger.info({
            msg: 'Fetched FHE key set successfully',
            keyId: keyId.toString()
        })

        return result
    } catch (error) {
        logger.error({
            msg: 'Error fetching FHE key set',
            keyId: keyId.toString(),
            error
        })
        throw new Error(`Failed to fetch FHE key set for keyId ${keyId}`)
    }
}
