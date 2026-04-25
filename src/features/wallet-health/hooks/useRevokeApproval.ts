import { useState, useCallback } from 'react'
import { useSendTransaction, usePublicClient } from 'wagmi'
import type { Approval } from '../types/approval.types'
import { fetchRevokeInstructions, logRevokeEvent } from '../api/approvalsApi'

export type RevokeStatus =
  | 'idle'
  | 'preparing' // Fetching txInstructions from BE
  | 'awaiting-wallet' // Waiting for user to sign in wallet
  | 'mining' // Tx submitted, waiting for on-chain confirmation
  | 'logging' // Logging revoke event to BE
  | 'success'
  | 'error'

export interface UseRevokeApprovalResult {
  status: RevokeStatus
  txHash: `0x${string}` | undefined
  error: string | null
  revoke: () => Promise<void>
  reset: () => void
}

export function useRevokeApproval(
  approval: Approval,
  ownerAddress: string | undefined,
  gasEstimate: { ethCost: string; usdCost: string } | null,
  onSuccess?: () => void,
): UseRevokeApprovalResult {
  const [status, setStatus] = useState<RevokeStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const { data: txHash, sendTransactionAsync, reset: resetTx } = useSendTransaction()

  const publicClient = usePublicClient()

  const revoke = useCallback(async () => {
    if (!ownerAddress) {
      setError('Wallet not connected')
      setStatus('error')
      return
    }

    try {
      // Step 1: Fetch unsigned tx instructions from BE
      setStatus('preparing')
      setError(null)

      const { txInstructions } = await fetchRevokeInstructions({
        owner: ownerAddress,
        spender: approval.spender,
        asset: approval.asset,
        assetType: approval.assetType,
        chainId: Number(import.meta.env.VITE_CHAIN_ID),
      })

      // Step 2: Send transaction via wallet
      setStatus('awaiting-wallet')

      const hash = await sendTransactionAsync({
        chainId: Number(import.meta.env.VITE_CHAIN_ID),
        to: txInstructions.to as `0x${string}`,
        data: txInstructions.data as `0x${string}`,
        value: BigInt(txInstructions.value),
      })

      // Step 3: Wait for mining (the useWaitForTransactionReceipt hook handles this reactively,
      // but we also poll here for the async flow)
      setStatus('mining')

      // Wait for confirmation using wagmi's publicClient
      if (!publicClient) throw new Error('Public client not found')
      const receipt = await publicClient.waitForTransactionReceipt({ hash })

      if (receipt.status !== 'success') {
        throw new Error('Transaction was reverted on-chain')
      }

      // Step 4: Log to backend
      setStatus('logging')

      await logRevokeEvent({
        walletAddress: ownerAddress,
        chainId: Number(import.meta.env.VITE_CHAIN_ID),
        approval,
        transaction: {
          txHash: hash,
          gasCostEth: gasEstimate?.ethCost,
          gasCostUsd: gasEstimate?.usdCost,
        },
      })

      // Done!
      setStatus('success')
      onSuccess?.()
    } catch (err) {
      // User rejected in wallet or any other error
      const message = err instanceof Error ? err.message : 'Revoke failed'

      // Don't show error for user rejection
      if (message.includes('User rejected') || message.includes('user rejected')) {
        setStatus('idle')
        return
      }

      setError(message)
      setStatus('error')
    }
  }, [ownerAddress, approval, gasEstimate, sendTransactionAsync, onSuccess])

  const reset = useCallback(() => {
    setStatus('idle')
    setError(null)
    resetTx()
  }, [resetTx])

  return { status, txHash, error, revoke, reset }
}
