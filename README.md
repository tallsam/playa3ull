# Dev Test

### Installing

Assuming docker is installed, run:

`docker compose up -d`

- Endpoint is at `http://localhost:3000/api/event/collect`.

### Endpoints available

- `POST /api/event/collect` - Ingest data.

Body format:

```json
[
  {
    "eventType": "MATCH_START",
    "playerId": "player_123",
    "gameId": "fortnite_br",
    "sessionId": "session_456",
    "serverId": "eu-west-1",
    "matchId": "match_789",
    "position": {
      "x": 100.5,
      "y": 0.0,
      "z": -50.2
    },
    "metadata": {
      "gameMode": "battle_royale",
      "mapName": "olympus",
      "teamSize": 3
    }
  }
]
```
