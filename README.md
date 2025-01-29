# Dev Test

### Installing

Assuming docker is installed, run:

`docker compose up -d`

### Endpoints available

- `POST http://localhost:3000/api/events/collect` - Collect game events.

Body format:

```json
{
  "events": [
    {
      "id": 123,
      "createdAt": "2025-01-29T01:37:05.102Z",
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
}
```
