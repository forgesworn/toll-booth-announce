import { announceService } from '402-announce'
import type { Announcement, TollBoothAnnounceOptions } from './types.js'
import { mapBoothConfig, type BoothConfigLike } from './mapper.js'

/**
 * Announce a toll-booth service on Nostr for decentralised paid API discovery.
 *
 * Reads pricing and service name from the booth config, combines with
 * user-provided Nostr options, and publishes a kind 31402 event.
 */
export async function announce(
  boothConfig: BoothConfigLike,
  options: TollBoothAnnounceOptions,
): Promise<Announcement> {
  const config = mapBoothConfig(boothConfig, options)
  return announceService(config)
}
