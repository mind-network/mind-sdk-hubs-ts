import { JsonRpcProvider, Network } from 'ethers'

/**
 * SdkContextManager module for the SDK
 * Handles initialization and retrieval of core SDK configuration and runtime context
 */
export const CoreContextManager = {
    /**
     * Private variable to store the SDK configuration
     * This should only be modified during initialization
     */
    _sdkConfig: null as Readonly<CoreConfig> | null,

    /**
     * Private variable to store the runtime context, including providers and utilities
     * This is populated during initialization
     */
    _sdkContext: null as Readonly<CoreContext> | null,

    /**
     * Initializes the SDK configuration
     * This must be called before accessing the configuration or context
     * 
     * @param config - The CoreConfig object containing necessary configuration parameters
     * @throws {Error} If any required configuration parameter is missing
     */
    initialize(config: CoreConfig): void {
        if (!config.fheKeyRegistryAddress) {
            throw new Error('fheKeyRegistryAddress is required')
        }
        if (!config.memberPoolAddress) {
            throw new Error('memberPoolAddress is required')
        }
        if (!config.rpc) {
            throw new Error('rpc is required')
        }
        if (!config.chainID) {
            throw new Error('chainID is required')
        }

        this._sdkConfig = config
        this._sdkContext = {
            jsonRpcProvider: new JsonRpcProvider(config.rpc, config.chainID, { staticNetwork: Network.from(config.chainID) })
        }
    },

    /**
     * Retrieves the current SDK configuration
     * Ensures the configuration has been initialized before access
     * 
     * @returns A readonly CoreConfig object
     * @throws {Error} If the configuration has not been initialized
     */
    getConfiguration(): Readonly<CoreConfig> {
        if (!this._sdkConfig) {
            throw new Error('Configuration has not been initialized. Call initialize() first.')
        }
        return this._sdkConfig
    },

    /**
     * Retrieves the current runtime context for the SDK
     * 
     * @returns The CoreContext object containing utilities such as the JsonRpcProvider
     * @throws {Error} If the context has not been initialized
     */
    getContext(): Readonly<CoreContext> {
        if (!this._sdkContext) {
            throw new Error('Configuration has not been initialized. Call initialize() first.')
        }
        return this._sdkContext
    }
}

/**
 * CoreConfig defines the required configuration structure for the SDK
 */
export type CoreConfig = {
    /**
     * Address of the Key Registry contract
     * This is a central registry that stores key information, allowing hubs to refer to keys using an ID to save gas
     */
    fheKeyRegistryAddress: string

    /**
     * Address of the Member Pool contract
     * This contract manages rewards and delegation to all hubs
     */
    memberPoolAddress: string

    /**
     * RPC endpoint for interacting with the blockchain network
     */
    rpc: string

    /**
     * Chain ID for the blockchain network
     */
    chainID: number
}

/**
 * SdkContext represents utilities and providers available after initialization
 */
export type CoreContext = {
    /**
     * JsonRpcProvider instance for interacting with the blockchain
     */
    jsonRpcProvider: JsonRpcProvider
}
