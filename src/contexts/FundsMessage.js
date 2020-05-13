import React, { createContext, useContext, useReducer, useMemo, useCallback, useState, useEffect } from 'react'
import { ethers } from 'ethers'

const ZERO = ethers.utils.bigNumberify(0)

const FundsMessageContext = createContext()

export function useFundsMessageContext() {
  return useContext(FundsMessageContext)
}
export const fundsMessagesEnum = {
  LOADING: 'loading',
  SHOW_REQUEST: 'show_request',
  SHOW_RECEIVED: 'show_received',
  SHOW_NONE: 'show_none'
}

const arbTokenAddress = "0x716f0d674efeeca329f141d0ca0d97a98057bdbf"
function needsFunds(balances) {
  return ( 
    balances.eth.arbChainBalance.eq(0) || 
    !balances.erc20[arbTokenAddress] ||
    balances.erc20[arbTokenAddress].arbChainBalance.eq(0)
  )
}

export function useUpdateFundsMessage(bridge, balances) {
  const { vmId, walletAddress, eth } = bridge
  const [state, update] = useFundsMessageContext()

  useEffect(() => {
    if (!bridge.vmId || !bridge.walletAddress) return
    switch (state) {
      case fundsMessagesEnum.LOADING: {
        if (!needsFunds(balances)) {
          update(fundsMessagesEnum.SHOW_NONE)
        } else {
          // if init balance is zero, request directly to determine funds at initial load
          balances.update().then( ([eth, {erc20}]) => {
            if (!needsFunds({eth, erc20})) {
              update(fundsMessagesEnum.SHOW_NONE)
            } else {
              update(fundsMessagesEnum.SHOW_REQUEST)
            }
          })
        }
        break
      }
      case fundsMessagesEnum.SHOW_REQUEST: {
        if (!needsFunds(balances)) {
          update(fundsMessagesEnum.SHOW_RECEIVED)
        }
        break
      }
      default:
        break
    }
  }, [balances.eth.balance, bridge.eth, bridge.vmId, bridge.walletAddress, state, update])
}

export default function Provider({ children }) {
  const [state, update] = useState(fundsMessagesEnum.LOADING)
  return <FundsMessageContext.Provider value={[state, update]}>{children}</FundsMessageContext.Provider>
}