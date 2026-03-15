# toll-booth-announce

Announce your [toll-booth](https://github.com/TheCryptoDonkey/toll-booth) service on Nostr for decentralised paid API discovery.

Publishes a [kind 31402](https://github.com/TheCryptoDonkey/402-announce) event so AI agents and clients can find your API without a centralised registry.

## Install

```bash
npm install toll-booth-announce 402-announce
```

## Usage

```typescript
import { Booth } from '@thecryptodonkey/toll-booth'
import { announce } from 'toll-booth-announce'

// Your existing toll-booth config
const config = {
  serviceName: 'Valhalla Routing',
  pricing: { '/route': 2, '/isochrone': 5, '/matrix': 10 },
  upstream: 'http://localhost:4444',
  backend: phoenixdBackend({ /* ... */ }),
}

const booth = new Booth(config)

// Announce on Nostr — pricing and name derived from config
const announcement = await announce(config, {
  secretKey: process.env.NOSTR_SK,
  relays: ['wss://relay.damus.io', 'wss://relay.primal.net'],
  url: 'https://routing.trotters.cc',
  about: 'Production routing engine for the UK',
  paymentMethods: ['bitcoin-lightning-bolt11'],
  topics: ['routing', 'geospatial', 'navigation'],
})

console.log(`Announced as ${announcement.pubkey} (event ${announcement.eventId})`)

// On shutdown
announcement.close()
```

## What gets announced

The bridge reads your toll-booth config and publishes a Nostr event with:

| Field | Source |
|-------|--------|
| Service name | `config.serviceName` (defaults to `"toll-booth"`) |
| Pricing | `config.pricing` table — flat or tiered (uses default/lowest tier) |
| Identifier | Slugified service name (overridable) |

You provide the fields toll-booth can't know: your public URL, description, Nostr key, relays, and payment methods.

## Part of the 402-announce ecosystem

This is one of several bridges that publish kind 31402 events for paid API discovery:

- **toll-booth-announce** — for toll-booth services (TypeScript)
- **aperture-announce** — for Lightning Labs Aperture proxies (Go)

Any client querying Nostr for kind 31402 events can discover your service. See [402-mcp](https://github.com/TheCryptoDonkey/402-mcp) for an AI agent that does this automatically.

## Licence

MIT
