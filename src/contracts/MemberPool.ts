import { Contract } from 'ethers'
import { CoreContextManager } from '../context'
import abi from '../abi/MemberPool.json'
import { MemberPool } from '../typechain/MemberPool'
import logger from '../logger'

/**
 * A singleton instance of the MemberPool contract.
 * It will be initialized lazily upon the first access.
 */
let memberPoolContract: MemberPool | null = null

/**
 * Ensures that the MemberPool contract is initialized
 * This must be called after the CoreContextManager has been initialized
 * 
 * @returns The initialized MemberPool contract instance
 */
function ensureMemberPoolContract(): MemberPool {
    if (!memberPoolContract) {
        const config = CoreContextManager.getConfiguration()
        const context = CoreContextManager.getContext()

        memberPoolContract = new Contract(
            config.memberPoolAddress,
            abi,
            context.jsonRpcProvider
        ) as unknown as MemberPool

        logger.info({
            msg: 'MemberPool contract initialized',
            address: config.memberPoolAddress
        })
    }

    return memberPoolContract
}

/**
 * Fetches the voting reward for a given cold wallet address
 * 
 * @param coldWalletAddress - The address of the cold wallet
 * @param hubId - The ID of the hub
 * @returns A promise resolving to the reward earned as a bigint
 * @throws {Error} If there is an issue fetching the voting reward
 */
export async function getVotingReward(coldWalletAddress: string, hubId: number): Promise<bigint> {
    try {
        const contract = ensureMemberPoolContract()
        const reward = await contract.voterRewardEarned(coldWalletAddress, hubId)
        logger.info({
            msg: 'Fetched voting reward successfully',
            coldWalletAddress,
            hubId,
            reward
        })
        return reward
    } catch (error) {
        logger.error({
            msg: 'Error fetching voting reward',
            coldWalletAddress,
            error
        })
        throw new Error(`Failed to fetch voting reward for address ${coldWalletAddress}`)
    }
}
