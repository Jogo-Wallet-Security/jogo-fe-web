import { useEffect } from 'react'
import { useAccount } from 'wagmi'

/**
 * Syncs the connected wallet address to the Jogo browser extension
 * via window.postMessage. The extension's content script listens for
 * messages with type 'JOGO_WALLET_SYNC' and persists the address
 * to chrome.storage.local.
 *
 * Place this hook once in the app root (e.g. App.tsx).
 */
export function useExtensionWalletSync() {
  const { address, isConnected } = useAccount()

  useEffect(() => {
    const walletAddress = isConnected && address ? address : null

    window.postMessage({ type: 'JOGO_WALLET_SYNC', walletAddress }, window.location.origin)
  }, [address, isConnected])
}
